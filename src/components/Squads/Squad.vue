<template>
  <div class="squad-section">
    <div class="squad-container radient-border-passthrough">
      <div class="squad-header">
        <div class="squad-texts">
          <p class="squad-name"> {{ squad.name }} </p>
          <div class="squad-motto radient-border-passthrough">
            <p> {{ squad.cry }} </p>
          </div>
        </div>
        <div class="squad-image radient-border-passthrough">
          <img :src="jeec_brain_url + squad.image" alt="squad-image" />
        </div>
      </div>

      <div class="squad-members">
        <h3 class="squad-sub-title">Members</h3>
        <!-- <Member v-for="member in orderedMembers" :key="member.username" :member="member"
          :captain_ist_id="squad.captain_ist_id" @kick="kick_member" /> -->

        <Member v-for="member in squad.members" :key="member.id" :member="member"/>

        <!-- <button v-if="squad.members.data.length < 4 && !loading_add" @click.stop="add_members_dialog = true" -->
         <button
          class="squad-add_members">
          <div class="plus-symbol">
            <p>&plus;</p>
          </div>
          <p>Add Members</p>
        </button>
      </div>

      <button @click.stop="leave_squad" class="squad-leave radient-border-passthrough">
        <img :src=leave_squad_button alt="Leave Squad Icon" />
      </button>
    </div>
  </div>

  <div class="dialog-overlay" v-if="add_members_dialog" @keydown.esc="closeDialog">
    <div class="squad-dialog-backdrop" @click="closeDialog"></div>
    <div class="squad-dialog radient-border-passthrough" ref="dialog">
      <p class="dialog-title">Add Members</p>
      <input v-model="search" type="text" placeholder="Search username..." class="search-input"
        @input="filterStudents" />
      <div class="chips-container">
        <button v-for="(squadmate, index) in squadmates" :key="index" class="chip" @click="remove(squadmate, $event)">
          <p v-if="squadmate">{{ squadmate }} <span class="close-icon">×</span> </p>
        </button>
      </div>
      <div class="autocomplete">
        <div v-if="Array.isArray(this.students2) && this.students2.length > 0">
          <ul>
            <li v-for="student in this.students3" :key="student.username" @click="addSquadmate(student)">
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
    <ToastNotification :message="toastMessage" :type="toastType" :visible="showToast" @close="showToast = false">
    </ToastNotification>
  </div>
</template>

<script>
import Invite from "@/components/Squads/Invite.vue";
import SquadCreation from "@/components/Squads/SquadCreation.vue";
import Member from "@/components/Squads/Member.vue";

import ToastNotification from "@/components/Squads/ToastNotification.vue";

import UserService from "../../services/user.service";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia';

export default {
  username: "Squad",
  components: {
    Invite,
    SquadCreation,
    Member,
    ToastNotification
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
      toastMessage: '',
      toastType: 'success',
      students2: [],
      photos: []
    };
  },
  methods: {

    showNotification(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
    },

    filterStudents() {
      if (this.search.trim() === '') {
        this.students3 = [];
      } else {
        this.students3 = this.students2.filter(student =>
          student.username.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },
    closeDialog(event) {
      if (event.key === 'Escape') {
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
        console.log((this.squadmates.length + this.squad.members.data.length));
        if ((this.squadmates.length + this.squad.members.data.length) < 4 && !this.squadmates.includes(username)) {
          this.squadmates.push(username);
          this.search = ''; // Clear the search input after adding a squadmate
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
          console.log(error)
        }
      );
      this.$router.go();
    },
    limitStudents() {
      if (
        this.squad.members.data.length >= 4
      ) {
        this.squadmates.pop();
      }

      this.search = "";
    },
    remove(item, event) {
      console.log('remover');
      event.stopPropagation();
      const index = this.squadmates.findIndex(squadmate => squadmate.username === item.username);
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
            this.members_with_squad = data.members_with_squad
            this.invited_members = data.invited_members

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

        let string_notification_invites = ""
        let string_notification_squads = ""

        if (this.invited_members.length >= 1) {
          string_notification_invites = "Invitation sent successfully to "
          for (let j = 0; j < this.invited_members.length; j++) {

            if (j == (this.invited_members.length - 1)) {
              string_notification_invites = string_notification_invites + " " + this.invited_members[j]
              string_notification_invites = string_notification_invites + " \n"
            } else if (this.invited_members.length >= 2 && j == (this.invited_members.length - 2)) {
              string_notification_invites = string_notification_invites + " " + this.invited_members[j] + " and"
            } else {
              string_notification_invites = string_notification_invites + " " + this.invited_members[j] + ","
            }
          }
        }
        if (this.members_with_squad.length == 1) {
          if (this.invited_members.length >= 1) {
            string_notification_squads = string_notification_squads + " but member "
          } else {
            string_notification_squads = string_notification_squads + "Member "
          }
        } else if (this.members_with_squad.length > 1) {
          if (this.invited_members.length >= 1) {
            string_notification_squads = string_notification_squads + "but members "
          } else {
            string_notification_squads = string_notification_squads + "Members "
          }

        }
        for (let i = 0; i < this.members_with_squad.length; i++) {
          if (i == (this.members_with_squad.length - 1)) {
            string_notification_squads = string_notification_squads + " " + this.members_with_squad[i]
            if (this.members_with_squad.length == 1) {
              string_notification_squads = string_notification_squads + " already has a squad"
            } else {
              string_notification_squads = string_notification_squads + " already have a squad"
            }
          } else if (this.members_with_squad.length >= 2 && i == (this.members_with_squad.length - 2)) {
            string_notification_squads = string_notification_squads + " " + this.members_with_squad[i] + " and"
          } else {
            string_notification_squads = string_notification_squads + " " + this.members_with_squad[i] + ","
          }
        }
        this.showNotification(string_notification_invites + "\n" + string_notification_squads, "points");

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
      this.$router.go()
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
          this.$router.go()
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
    ...mapState(useUserStore, ['user']),
    orderedMembers() {
      let members = [...this.squad.members.data];
      let captainIndex = members.findIndex(member => member.is_captain);
      if (captainIndex > 0) {
        let [captain] = members.splice(captainIndex, 1);
        members.unshift(captain);
      }
      console.log(members);
      return members;
    },
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
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
          console.log(this.squad)

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

.squad-section h2 {
  text-align: center;
  font-family: "Lexend Exa";
  font-size: 2rem;
  letter-spacing: 3px;
  margin-top: 3rem;
  color: #4CC9F0;
  margin-bottom: 2rem;
  text-shadow: 0px 0px 4px #4cc9f0;
}

.squad-container {
  padding: 1rem 2rem;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  --border-radius: 45px;
}

.squad-container::before {
  content: "";
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

.squad-texts>p {
  font-family: "Lexend Exa";
  letter-spacing: 3px;
  font-weight: 600;
  font-size: 2rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
}

.squad-motto {
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.3rem 25px;

  --border-radius: 25px;
  --border-width: 1.5px;
  --background: radial-gradient(ellipse 250% 200% at 0% 0%, rgba(114, 9, 183, 0.14), rgba(114, 9, 183, 0.08) 60%, rgba(114, 9, 183, 0));
  --border-background: linear-gradient(165deg, #7209B7, #A414A4 40%, #7209B7);
}

.squad-motto::before {
  content: "";
}

.squad-motto p {
  font-size: 1.1rem;
}

.squad-image {
  width: 50%;
  max-width: 120px;
  aspect-ratio: 1;
  flex-shrink: 0.3;

  --border-radius: 50%;
}

.squad-image::before {
  content: "";
}

.squad-image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.squad-sub-title {
  font-family: "Lexend Exa";
  letter-spacing: 4px;
  font-size: 1.3rem;
  font-weight: 400;
}

.squad-rankings {
  display: flex;
  gap: 2rem;
}

.squad-ranking {
  display: flex;
  align-items: center;
  gap: 2ch;
  padding-top: 0.4rem;
  padding-left: 0.4rem;
}

.squad-ranking p {
  overflow-wrap: normal;
}

.squad-position {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  font-size: 0.6rem;
  font-weight: 800;
  border-radius: 100%;
  border: #39250E 2px solid;
  background-color: #6D3F0B;
}

.squad-position.pos-1 {
  background-color: #C1A875;
  border: #ddc695 2px solid;
}

.squad-position.pos-2 {
  background-color: #a8a8a8;
  border: #c4c2c2 2px solid;
}

.squad-position.pos-3 {
  background-color: #C9705C;
  border: #e18a77 2px solid;
}

.squad-add_members {
  display: flex;
  background: none;
  border: none;
  align-items: center;
  padding-top: 0.6rem;
  padding-left: 10%;
  gap: 1rem;
  cursor: pointer;
}

.squad-add_members .plus-symbol {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  flex-shrink: 0;
  aspect-ratio: 1;
  font-size: 2.4rem;
  border: #1A9CD8 2px solid;
  background: linear-gradient(45deg, #1A9CD8, #60cdff);
}

.squad-add_members .plus-symbol p {
  position: relative;
  top: -3px;
  line-height: 1;
}

.squad-add_members>p {
  font-size: 1.2rem;
  font-family: "Lexend Exa";
  text-transform: uppercase;
  color: #1A9CD8;
  text-align: start;
}

.squad-leave {
  align-self: flex-end;
  border: none;
  padding: 2rem;
  cursor: pointer;
  margin-top: -1.5rem;
}

.squad-leave::before {
  content: "";
}

.squad-leave:hover {
  scale: 1.1;
} 

.squad-leave img {
  position: absolute;
  top: 50%;
  left: 53%;
  translate: -50% -50%;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.squad-dialog-backdrop {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.squad-dialog {
  width: 90%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  --border-width: 2px;
  --border-radius: 8px;
}

.squad-dialog::before {
  content: "";
}

.dialog-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: "Lexend Deca";
}

.chips-container {
  background: none;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.chip {
  background-color: rgba(0, 0, 0, 0.4);
  border: none;
  border: 1px solid black;
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.close-icon {
  margin-left: 5px;
  cursor: pointer;
}

.autocomplete {
  max-height: 200px;
  overflow-y: auto;
}

.autocomplete ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid black;
}

.autocomplete li {
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid black;
  font-family: "Lexend Deca";
}

.autocomplete li:last-child {
  border-bottom: none;
}

.squad-dialog .invite {
  background: linear-gradient(165deg, #605ED0 -100%, #4CC9F0 20%, #7209B7 130%);
  padding: 0.4rem 1.5ch;
  font-size: 1rem;
  margin-top: 0.8rem;
  border-radius: 40px;
  border: none;
  align-self: flex-end;
  cursor: pointer;
}
</style>