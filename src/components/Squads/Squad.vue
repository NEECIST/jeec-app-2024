<template>
  <section class="squad-section">
    <h2 v-if="squad != null">YOUR SQUAD</h2>
    <h2 v-else>SQUAD</h2>

    <template v-if="!loading_squad">
      <div v-if="squad === null">
        <SquadCreation @create="create_squad" @notification="notification" />

        <Invite @accept="accept_invite" @reject="reject_invite" v-for="invite in invites" :key="invite.sender_username"
          :invite="invite" />

      </div>

      <div v-else-if="squad != null" class="squad-container">
        <div class="squad-header">
          <img :src="jeec_brain_url + squad.image" alt="squad-image" />
          <div class="squad-texts">
            <p class="squad-name"> {{ squad.name }} </p>
            <p class="squad-motto"> {{ squad.cry }} </p>
          </div>
        </div>
        <div class="squad-points">
          <p> Daily points: {{ squad.daily_points }} </p>
          <p> Total points: {{ squad.total_points }} </p>
        </div>

        <div class="squad-members">
          <h1>Members ({{ squad.members.data.length }}/4)</h1>
          <Member v-for="member in squad.members.data" :key="member.username" :member="member"
            :captain_ist_id="squad.captain_ist_id" @kick="kick_member" />
          <button class="plus-symbol none_back" @click.stop="add_members_dialog = true"
            v-if="squad.members.data.length < 4 && !loading_add">
            <img :src=plus_squad_button alt="Plus Squad Icon" class="button-plus-icon" /> Add Members
          </button>
        </div>

        <div class="squad-leave">
          <button @click.stop="leave_squad" class="leave_style">
            <img :src=leave_squad_button alt="Leave Squad Icon" class="button-icon" />
          </button>
        </div>
      </div>

      <div v-if="add_members_dialog" class="dialog-overlay" @keydown.esc="closeDialog">
        <div class="squad-dialog" :style="{ width: (width > 1100 ? '50vw' : '') }" ref="dialog">
          <p class="dialog-title">Add Squadmates</p>
          <input v-model="search" type="text" placeholder="Search username..." class="search-input"
            @input="filterStudents" />
          <div class="chips-container">
            <div v-for="(squadmate, index) in squadmates" :key="index" class="chip">
              <!-- Add a conditional check for squadmate -->
              <span v-if="squadmate">{{ squadmate }}</span>
              <span class="close-icon" @click="remove(squadmate, $event)">×</span>
            </div>
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
          <div class="center-container">
            <button @click.stop="invite" class="invite">Invite</button>
          </div>
        </div>
      </div>
    </template>
  </section>

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
  data: function () {
    return {
      button: "my squad",
      squad: null,
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
      leave_squad_button: require("../../assets/leave_squad.png"),
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
        if (this.squadmates.length < 4 && !this.squadmates.includes(username)) {
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
        this.showNotification(string_notification_invites + "\n" + string_notification_squads, "success");

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

    UserService.getStudentsAll().then(
      (response) => {
        this.students2 = response.data.students;
      },
      (error) => {
        console.log(error);
      }
    );

    await UserService.getSquadsLength().then((response) => {
      const data = response.data; this.length = data.length;
    }
    );

  },
};
</script>

<style scoped>
.squad-section {
  padding-bottom: 120px;
}
.squad-section h2 {
  text-align: center;
  font-family: "Lexend Exa";
  font-size: 2rem;
  letter-spacing: 3px;
  margin-top: 3rem;
  color: #4CC9F0;
}
</style>