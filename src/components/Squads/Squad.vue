<template>
  <div class="squad-section">
    <div class="squad-container">
      <div class="squad-header">
        <div class="squad-texts">
          <p class="squad-name">{{ squad.name }}</p>
          <div class="squad-motto-wrapper">
            {{ squad.cry }}
          </div>
        </div>
        <div class="squad-image-wrapper">
          <div class="squad-image">
            <img :src="jeec_brain_url + squad.image" alt="squad-image" />
          </div>
        </div>
      </div>

      <div class="squad-members">
        <h3 class="squad-sub-title">Members</h3>
        <!-- <Member v-for="member in orderedMembers" :key="member.username" :member="member"
          :captain_ist_id="squad.captain_ist_id" @kick="kick_member" /> -->

        <Member
          v-for="member in squad.members"
          :key="member.id"
          :member="member"
        />

        <!-- <button v-if="squad.members.data.length < 4 && !loading_add" @click.stop="add_members_dialog = true" -->
        <div class="squad-add-members member">
          <div class="add-members-row" @click.stop="change_add_member_dialog">
            <div class="member-image plus-circle">
              <img
                v-if="!add_members_dialog"
                src="@/assets/add-member-button.png"
                alt="Add Member Icon"
                class="plus-icon-image"
              />
              <img
                v-else
                src="@/assets/minus.png"
                alt="Close Add Member"
                class="minus-icon-image"
              />
            </div>
            <p class="add-members-text">ADD MEMBERS</p>
          </div>

          <div v-if="add_members_dialog" class="squad-add-members-dialog">
            <input
              v-model="search"
              type="text"
              placeholder="Search username..."
              class="search-input"
              @input="filterStudents"
            />
            <div class="join-decline">
              <button class="join" @click="invite">Invite</button>
              <button class="decline" @click.stop="change_add_member_dialog">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <button @click.stop="leave_squad" class="squad-leave">
        <img :src="leave_squad_button" alt="Leave Squad Icon" />
      </button>
    </div>
  </div>

  <div class="dialog-overlay" v-if="false" @keydown.esc="closeDialog">
    <div class="squad-dialog-backdrop" @click="closeDialog"></div>
    <div class="squad-dialog" ref="dialog">
      <p class="dialog-title">Add Members</p>
      <input
        v-model="search"
        type="text"
        placeholder="Search username..."
        class="search-input"
        @input="filterStudents"
      />
      <div class="chips-container">
        <button
          v-for="(squadmate, index) in squadmates"
          :key="index"
          class="chip"
          @click="remove(squadmate, $event)"
        >
          <p v-if="squadmate">
            {{ squadmate }} <span class="close-icon">×</span>
          </p>
        </button>
      </div>
      <div class="autocomplete">
        <div v-if="Array.isArray(this.students2) && this.students2.length > 0">
          <ul>
            <li
              v-for="student in this.students3"
              :key="student.username"
              @click="addSquadmate(student)"
            >
              <!-- <img :src="student.photo" alt="Student Photo" class="avatar" /> -->
              {{ student.username }}
            </li>
          </ul>
        </div>
      </div>
      <button @click.stop="invite" class="invite">Invite</button>
    </div>
  </div>

  <div>
    <ToastNotification
      :message="toastMessage"
      :type="toastType"
      :visible="showToast"
      @close="showToast = false"
    >
    </ToastNotification>
  </div>
</template>

<script>
import Invite from "@/components/Squads/Invite.vue";
import SquadCreation from "@/components/Squads/SquadCreation.vue";
import Member from "@/components/Squads/Member.vue";

import ToastNotification from "@/components/Squads/ToastNotification.vue";

import UserService from "../../services/user.service";
import { useUserStore } from "@/stores/UserStore";
import { mapState } from "pinia";

export default {
  username: "Squad",
  components: {
    Invite,
    SquadCreation,
    Member,
    ToastNotification,
  },
  props: {
    squad: Object,
  },
  data: function () {
    return {
      button: "my squad",
      invites: [],
      invites_sent: [],
      students3: [],
      loading_squad: true,
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      daily_max_points: 0,
      weekly_max_points: 0,
      squadmates: [],
      add_members_dialog: false,
      students: [],
      search: "",
      today_reward: {},
      default_image: require("../../assets/jeec_colour_no_edition_transparent.svg"),
      width: window.innerWidth,
      loading_delete: false,
      loading_add: false,
      squads_aux: null,
      length: 0,
      champion_week: false,
      champion_daily: false,
      hover: false,
      members_with_squad: null,
      invited_members: null,
      leave_squad_button: require("@/assets/squad-leave.svg"),
      plus_squad_button: require("../../assets/plus_sign.png"),
      showToast: false,
      toastMessage: "",
      toastType: "success",
      students2: [],
      photos: [],
    };
  },
  methods: {
    showNotification(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
    },

    filterStudents() {
      if (this.search.trim() === "") {
        this.students3 = [];
      } else {
        this.students3 = this.students2.filter((student) =>
          student.username.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },
    closeDialog(event) {
      if (event.key === "Escape") {
        this.add_members_dialog = false;
      }
    },
    handleClickOutside(event) {
      if (this.$refs.dialog && !this.$refs.dialog.contains(event.target)) {
        this.add_members_dialog = false;
      }
    },
    addSquadmate(student) {
      if (student && student.username) {
        const username = student.username;
        console.log(this.squadmates.length + this.squad.members.data.length);
        if (
          this.squadmates.length + this.squad.members.data.length < 4 &&
          !this.squadmates.includes(username)
        ) {
          this.squadmates.push(username);
          this.search = ""; // Clear the search input after adding a squadmate
        }
      } else {
        console.error("Invalid student object:", student);
      }
    },
    click(username) {
      if (username !== this.button) {
        this.button = username;
      }
    },
    notification(message, type) {
      this.showNotification(message, type);
    },
    create_squad(squad) {
      this.squad = squad;
    },
    async accept_invite(invite_id) {
      await UserService.acceptInvitation(invite_id).then(
        (response) => {
          UserService.getSquadInvitationsReceived().then(
            (response) => {
              this.invites = response.data.data;
            },
            (error) => {
              console.log(error);
            }
          );

          UserService.getUserSquad().then(
            (response) => {
              this.squad = response.data.data;
              this.button = "my squad";
              this.notification("Joined squad " + this.squad.name, "success");
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
          UserService.getSquadInvitationsReceived().then(
            (response) => {
              this.invites = response.data.data;
            },
            (error) => {
              console.log(error);
            }
          );
          this.notification("Failed to join squad", "error");
        },
        (error) => {
          this.showNotification("Squad is full", "success");
          console.log(error);
        }
      );
      this.$router.go();
    },
    limitStudents() {
      if (this.squad.members.data.length >= 4) {
        this.squadmates.pop();
      }

      this.search = "";
    },
    remove(item, event) {
      console.log("remover");
      event.stopPropagation();
      const index = this.squadmates.findIndex(
        (squadmate) => squadmate.username === item.username
      );
      if (index >= 0) this.squadmates.splice(index, 1);
    },

    async invite() {
      if (this.squadmates.length > 0) {
        this.loading_add = true;
        this.add_members_dialog = false;

        await UserService.inviteSquad(this.squadmates).then(
          (response) => {
            this.squadmates = [];
            const data = response.data;
            this.members_with_squad = data.members_with_squad;
            this.invited_members = data.invited_members;

            UserService.getSquadInvitationsSent().then(
              (response) => {
                this.invites_sent = response.data.data;
                this.loading_add = false;
              },
              (error) => {
                console.log(error);
                this.loading_add = false;
              }
            );
          },
          (error) => {
            console.log(error);
            this.showNotification("Failed to send invitation", "error");

            UserService.getSquadInvitationsSent().then(
              (response) => {
                this.invites_sent = response.data.data;
                this.loading_add = false;
              },
              (error) => {
                console.log(error);
                this.loading_add = false;
              }
            );

            this.loading_add = false;
          }
        );

        let string_notification_invites = "";
        let string_notification_squads = "";

        if (this.invited_members.length >= 1) {
          string_notification_invites = "Invitation sent successfully to ";
          for (let j = 0; j < this.invited_members.length; j++) {
            if (j == this.invited_members.length - 1) {
              string_notification_invites =
                string_notification_invites + " " + this.invited_members[j];
              string_notification_invites = string_notification_invites + " \n";
            } else if (
              this.invited_members.length >= 2 &&
              j == this.invited_members.length - 2
            ) {
              string_notification_invites =
                string_notification_invites +
                " " +
                this.invited_members[j] +
                " and";
            } else {
              string_notification_invites =
                string_notification_invites +
                " " +
                this.invited_members[j] +
                ",";
            }
          }
        }
        if (this.members_with_squad.length == 1) {
          if (this.invited_members.length >= 1) {
            string_notification_squads =
              string_notification_squads + " but member ";
          } else {
            string_notification_squads = string_notification_squads + "Member ";
          }
        } else if (this.members_with_squad.length > 1) {
          if (this.invited_members.length >= 1) {
            string_notification_squads =
              string_notification_squads + "but members ";
          } else {
            string_notification_squads =
              string_notification_squads + "Members ";
          }
        }
        for (let i = 0; i < this.members_with_squad.length; i++) {
          if (i == this.members_with_squad.length - 1) {
            string_notification_squads =
              string_notification_squads + " " + this.members_with_squad[i];
            if (this.members_with_squad.length == 1) {
              string_notification_squads =
                string_notification_squads + " already has a squad";
            } else {
              string_notification_squads =
                string_notification_squads + " already have a squad";
            }
          } else if (
            this.members_with_squad.length >= 2 &&
            i == this.members_with_squad.length - 2
          ) {
            string_notification_squads =
              string_notification_squads +
              " " +
              this.members_with_squad[i] +
              " and";
          } else {
            string_notification_squads =
              string_notification_squads +
              " " +
              this.members_with_squad[i] +
              ",";
          }
        }
        this.showNotification(
          string_notification_invites + "\n" + string_notification_squads,
          "points"
        );
      }
    },
    async reject_invite(invite_id) {
      await UserService.rejectInvitation(invite_id).then(
        () => {
          UserService.getSquadInvitationsReceived().then(
            (response) => {
              this.invites = response.data.data;
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
          UserService.getSquadInvitationsReceived().then(
            (response) => {
              this.invites = response.data.data;
            },
            (error) => {
              console.log(error);
            }
          );
        }
      );
      this.$router.go();
    },
    leave_squad() {
      if (!confirm("Are you sure you want to proceed?")) {
        return;
      }
      this.loading_squad = true;
      UserService.leaveSquad().then(
        (response) => {
          this.$emit("delete", response.data.data);
          this.loading_squad = false;
          this.$router.go();
        },
        (error) => {
          console.log(error);
          this.loading_squad = false;
        }
      );
    },
    kick_member(squad) {
      this.squad = squad;
    },
    change_add_member_dialog() {
      this.add_members_dialog = !this.add_members_dialog;
      console.log("add_member_dialog ", this.add_members_dialog);
    },
    cancel_invite() {
      UserService.getSquadInvitationsSent().then(
        (response) => {
          this.invites_sent = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    resize() {
      this.width = window.innerWidth;
    },
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    orderedMembers() {
      let members = [...this.squad.members.data];
      let captainIndex = members.findIndex((member) => member.is_captain);
      if (captainIndex > 0) {
        let [captain] = members.splice(captainIndex, 1);
        members.unshift(captain);
      }
      console.log(members);
      return members;
    },
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  async beforeMount() {
    if (!this.user) {
      this.$router.push("/");
    }

    UserService.getUserSquad().then(
      (response) => {
        if (response.data.error) {
          this.squad = null;
          this.loading_squad = false;
        } else {
          this.squad = response.data.data;
          var squad = this.squad;
          console.log(this.squad);

          squad.members.data.forEach(function (item, i) {
            if (item.name === squad.captain_ist_id) {
              squad.members.data.splice(i, 1);
              squad.members.data.unshift(item);
            }
          });

          this.loading_squad = false;
        }
      },
      (error) => {
        console.log(error);
        this.loading_squad = false;
      }
    );

    UserService.getSquadInvitationsReceived().then(
      (response) => {
        this.invites = response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );

    await UserService.getStudentsAll().then(
      (response) => {
        this.students2 = response.data.students;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style scoped>
.squad-section {
  padding-bottom: 120px;
  overflow: hidden;
}

.squad-container {
  background-color: #199cff1a;
  border: 1.5px solid #199cff;
  border-radius: 20px 60px 20px 20px;
  padding: 1rem 1.5rem;
  width: 90%;
  max-width: 650px;
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
  font-family: "Lexend", sans-serif;
  box-sizing: border-box;
  position: relative;
}

.squad-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.squad-texts {
  flex-grow: 1;
}

.squad-name {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-align: left;
  letter-spacing: 0.1em;
}

.squad-motto-wrapper {
  font-size: 1rem;
  color: white;
  margin-top: 0.4rem;
  padding: 0.3rem 1rem;
  border: 2px solid #199cff;
  border-radius: 15px;
  font-family: "Lexend", sans-serif;
  max-width: fit-content;
  text-align: left;
  align-self: flex-start;
}

.squad-image {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #199cff;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.squad-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.squad-sub-title {
  font-size: 1.05rem;
  font-family: "Lexend Exa", sans-serif;
  font-weight: 500;
  color: white;
  letter-spacing: 0.05em;
  margin: 0.4rem 0 0.3rem 0.1rem;
  text-align: left;
}

.squad-members {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.squad-add-members {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.add-members-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  margin-left: 0.1rem;
}

.plus-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #199cff;
  border: 2px solid #199cff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.plus-icon-image,
.minus-icon-image {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.minus-icon-image {
  filter: invert(1);
}

.add-members-text {
  font-size: 1.05rem;
  font-family: "Lexend Exa", sans-serif;
  color: #199cff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
  font-weight: 600;
}

.squad-add-members-dialog {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 0.6rem;
}

.squad-add-members-dialog .search-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 2px solid #199cff;
  background-color: transparent;
  font-family: "Lexend Exa", sans-serif;
  font-size: 0.95rem;
  color: white;
  outline: none;
  transition: border-color 0.2s ease;
}

.squad-add-members-dialog .search-input::placeholder {
  color: #aaa;
  font-family: "Lexend Exa", sans-serif;
  font-size: 0.9rem;
}

.squad-add-members-dialog .search-input:focus {
  border-color: #1a9cd8;
}

.join-decline {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.join-decline button {
  padding: 0.4rem 0.8rem;
  font-size: 0.95rem;
  border-radius: 50px;
  font-family: "Lexend Exa";
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.join-decline button.join {
  background-color: #199cff;
  color: white;
  border: none;
}

.join-decline button.decline {
  background-color: transparent;
  color: white;
  border: 1.5px solid #199cff;
}

.join-decline button:hover {
  transform: scale(1.03);
}

.plus-icon-image {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.minus-icon-image {
  width: 16px;
  height: 16px;
  object-fit: contain;
  filter: invert(1);
}

.buttons-conteiner {
  display: flex;
  gap: 30px;
  justify-content: center;
}

.buttons-conteiner > button {
  width: 100%;
  max-width: 100px;
  height: 25px;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
}

.buttons-conteiner button.invite {
  background-color: #199cff;
  color: white;
  border: none;
}

.buttons-conteiner button.cancel {
  background-color: transparent;
  color: white;
  border: 1.5px solid #199cff;
}

.squad-add-click {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  margin-top: 1rem;
  cursor: pointer;
}

.squad-add-click:hover {
  scale: 1.02;
}

.plus-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #199cff;
  border: 2px solid #199cff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  flex-shrink: 0;
}

.plus-circle p {
  margin: 0;
  padding: 0;
  line-height: 1;
  transform: translateY(-2px);
}

.add-members-text {
  font-size: 1.05rem;
  font-family: "Lexend Exa", sans-serif;
  color: #199cff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
  font-weight: 600;
}

.squad-leave {
  position: absolute;
  top: 220px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: none;
  border: 2px solid #199cff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.squad-leave:hover {
  transform: scale(1.1);
}

.squad-leave img {
  width: 34px;
  height: 34px;
  filter: invert(57%) sepia(96%) saturate(3276%) hue-rotate(181deg)
    brightness(103%) contrast(103%);
  margin-left: 5px;
}
</style>
