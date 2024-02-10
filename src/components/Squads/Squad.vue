<template>
  <div>
    <div
      v-if="!loading_squad"
    >
      <div v-if="squad === null">
        <div v-if="!create_squad_var">
          <button class="create-squad-button" @click="change_Create"> Create Squad </button>
        </div>
        <div v-else>
          <SquadCreation
            v-if="squad === null"
            @create="create_squad"
            @notification="notification"
          />
        </div>
      </div>

      <div v-if="squad!=null">
        <center>
          <h1> YOUR SQUAD </h1>
        </center>
      </div>


      <div  v-if="squad!=null" class="border-container">

        <div v-if="squad!=null" class="squad-info">
          
          <div class="squad-image-placeholder">
            <img
              class="squad-image"
              :src="jeec_brain_url + squad.image"
              alt="squad-image"
            />
          </div>
          <div class="squad-texts">
              <p class="squad-name"> {{ squad.name }} </p>
              <p class="squad-motto">  {{ squad.cry }} </p>
          </div>
        </div>
      
        <div v-if="squad!=null || invites.length > 0">
          <div v-if="squad!=null">

            <h1>Members ({{squad.members.data.length}}/4)</h1>

            <div v-if="add_members_dialog" class="dialog-overlay" @keydown.esc="closeDialog">
              <div class="squad-dialog" :style="{ width: (width > 1100 ? '50vw' : '') }" ref="dialog">
                <p class="dialog-title">Add Squadmates</p>
                <input
                  v-model="search"
                  type="text"
                  placeholder="Search username..."
                  class="search-input"
                  @input="filterStudents"
                />
                <div class="chips-container">
                  <div v-for="(squadmate, index) in squadmates" :key="index" class="chip">
                    <!-- Add a conditional check for squadmate -->
                    <span v-if="squadmate">{{ squadmate }}</span>
                    <span class="close-icon" @click="remove(squadmate, $event)">×</span>
                  </div>
                </div>
                <div class="autocomplete">
                  <div v-if="Array.isArray(this.students) && this.students.length > 0">
                    <ul>
                      <li v-for="student in this.students" :key="student.username" @click="addSquadmate(student)">
                        <img :src="student.photo" alt="Student Photo" class="avatar" />
                        {{ student.username }}
                      </li>
                    </ul>
                  </div>
                </div>
                <center>
                  <button @click.stop="invite" class="invite">Invite</button>
                </center>
              </div>
            </div>
          </div>  
          
          <div v-if="squad!=null" >
            <Member
              v-for="member in squad.members.data"
              :key="member.username"
              :member="member"
              :captain_ist_id="squad.captain_ist_id"
              @kick="kick_member"
            />
          </div>

          <button class="plus-symbol none_back" @click.stop="add_members_dialog = true"
            v-if="squad.members.data.length < 4 && !loading_add">
            <img :src=plus_squad_button alt="Plus Squad Icon" class="button-plus-icon"/>  Add Members
          </button>

          <div class="button-container">
            <button v-if="!loading_delete" @click.stop="leave_squad" class="leave_style">
              <img :src=leave_squad_button alt="Leave Squad Icon" class="button-icon"/>
            </button>
          </div> 
        </div>
      </div>

      <Invite
        @accept="accept_invite"
        @reject="reject_invite"
        v-for="invite in invites"
        :key="invite.sender_username"
        :invite="invite"
      />

    </div>

    
    <div v-else class="loading">
      <v-progress-circular
        indeterminate
        color="#27ade4"
        :size="100"
        :width="10"
        class="loading-bar"
      ></v-progress-circular>
    </div>
  </div>

</template>

<script>
import Invite from "@/components/Squads/Invite.vue";
import UserService from "../../services/user.service";
import SquadCreation from "@/components/Squads/SquadCreation.vue";
import Member from "@/components/Squads/Member.vue";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia';

export default {
  username: "Squad",
  components: {
    Invite,
    SquadCreation,
    Member
  },
  data: function () {
    return {
      button: "my squad",
      squad: null,
      invites: [],
      invites_sent: [],
      loading_squad: true,
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      daily_max_points:0,
      weekly_max_points:0,
      squadmates: [],
      add_members_dialog: false,
      students: [],
      search: null,
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
      create_squad_var: false,
      leave_squad_button: require("../../assets/leave_squad.png"),
      plus_squad_button: require("../../assets/plus_sign.png")
    };
  },
  methods: {

    change_Create() {
      this.create_squad_var = !this.create_squad_var;
    },

    filterStudents() {
      console.log("aquiii");
      console.log(this.search);
      UserService.getStudents(this.search).then(
        (response) => {
          var students = response.data.data;
          if (!Array.isArray(students)) students = [students];
          
          var squad_members = this.squad.members.data.map((item) => item.username);
          var invites_sent = this.invites_sent.map((item) => item.username);
        
          this.students = students.filter(
            (item) => (!squad_members.includes(item.username) && !invites_sent.includes(item.username))
          );
        },
        (error) => {
          console.log(error);
        }
      );
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
      this.$emit("notification", message, type);
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
          this.$emit(
            "notification",
            "Squad is full",
            "success"
          );
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
            console.log('convite enviado 1');
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
            this.$emit("notification", "Failed to send invitation", "error");

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
          for(let j = 0; j < this.invited_members.length; j++) {
            
            if(j == (this.invited_members.length - 1)) {
              string_notification_invites = string_notification_invites + " " + this.invited_members[j] 
              string_notification_invites = string_notification_invites + " \n"
            } else if(this.invited_members.length >= 2 && j == (this.invited_members.length - 2) ){
              string_notification_invites = string_notification_invites + " " + this.invited_members[j] + " and"
            } else {
              string_notification_invites = string_notification_invites + " " + this.invited_members[j] + ","
            }
          } 
        }
        if (this.members_with_squad.length == 1) {
          if (this.invited_members.length >= 1) {
            string_notification_squads = string_notification_squads +  " but member "
          } else {
            string_notification_squads = string_notification_squads +  "Member "
          }
        } else if (this.members_with_squad.length > 1) {
          if (this.invited_members.length >= 1) {
            string_notification_squads = string_notification_squads +  "but members "
          } else {
            string_notification_squads = string_notification_squads +  "Members "
          }
          
        }
        for(let i = 0; i < this.members_with_squad.length; i++) {
          if(i == (this.members_with_squad.length - 1)) {
            string_notification_squads = string_notification_squads + " " + this.members_with_squad[i]
            if(this.members_with_squad.length == 1) {
              string_notification_squads = string_notification_squads + " already has a squad"
            } else {
              string_notification_squads = string_notification_squads + " already have a squad"
            }
          } else if(this.members_with_squad.length >= 2 && i == (this.members_with_squad.length - 2) ){
            string_notification_squads = string_notification_squads + " " + this.members_with_squad[i] + " and"
          } else {
            string_notification_squads = string_notification_squads + " " + this.members_with_squad[i] + ","
          }
        }
        this.$emit(
          "notification",
          string_notification_invites + "\n" + string_notification_squads,
          "success"
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
      this.$router.go()
    },
    leave_squad() {
      if (!confirm("Are you sure you want to proceed?")) {
        return;
      }
      this.loading_delete = true;
      UserService.leaveSquad().then(
        (response) => {
          this.$emit("delete", response.data.data);
          this.loading_delete = false;
          this.$router.go()
        },
        (error) => {
          console.log(error);
          this.loading_delete = false;
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
        this.squad = response.data.data;
        var squad = this.squad;

        squad.members.data.forEach(function (item, i) {
          if (item.name === squad.captain_ist_id) {
            squad.members.data.splice(i, 1);
            squad.members.data.unshift(item);
          }
        });

        this.loading_squad = false;
      },
      (error) => {
        console.log('olaaaaa');
        console.log(error);
        this.loading_squad = false;
      }
    );
    
    UserService.getSquadInvitationsReceived().then(
      (response) => {
        this.invites = response.data.data;
        console.log(this.invites)
      },
      (error) => {
        console.log(error);
      }
    );

    await UserService.getSquadsLength().then((response) => {
      const data = response.data; this.length = data.length; 
      }
    );
    
    
    
    if(this.squad != null) {
      
      UserService.getStudents('').then(
        (response) => {
          var students = response.data.data;
          this.students = [students];

          var squad_members = this.squad.members.data.map((item) => item.username);
          var invites_sent = this.invites_sent.map((item) => item.username);

          this.students = this.students.filter(
            (item) => (!squad_members.includes(item.username) && !invites_sent.includes(item.username))
          );
          console.log("students");
          console.log(students);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    
  },

  watch: {
    search(val) {
      console.log("aquiii");
      console.log(val);
      UserService.getStudents(val).then(
        (response) => {
          var students = response.data.data;
          if (!Array.isArray(students)) students = [students];
          
          var squad_members = this.squad.members.data.map((item) => item.username);
          var invites_sent = this.invites_sent.map((item) => item.username);

          this.students = students.filter(
            (item) => (!squad_members.includes(item.username) && !invites_sent.includes(item.username))
          );
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>


.squad-rank{
  margin-top:5vh;
  margin-bottom:5vh;
  width:50vw;
  text-align:center;
  display:block;
  margin-left:auto;
  margin-right:auto;
}

.squad-rank h1{
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 600;
  color:white;
}

.squad-rank h2{
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 600;
}

.squad {
  background-color: none;
  height:auto;
}

.loading {
  text-align: center;
  margin-top: 35vh;
}

.squad-text{
  font-family: Montserrat;
  font-size: 40px;
  font-weight: 600;
  margin-bottom:0;
}

.plus-symbol{
  background: none;
  color: blueviolet;
  font-weight:10;
  font-size:40px;
}

.minus-symbol{
  background: none;
  color:  #D93046;
  font-weight:10;
  font-size:60px;
}

.squad-dialog{
  text-align: center;
  background-color: #1F2A47;
  font-family: Montserrat;
  font-size: 32px;
  font-weight: 600;
  border: 3px solid #03618C;
}

.hover {
  color: red; 
}

.hover-effect {
  transition: all 0.3s ease; 
  cursor: pointer; 
}

.hover-effect:hover {
  transform: scale(1.2);
  color: red; 
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.squad-dialog {

  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
}

.chips-container {
  background: none;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.chip {
  background-color: #8A9BAE;
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
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
}

.autocomplete li {
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

button.create-squad-button {
  display: flex;
  height: 50px;
  border: none;
  background: none;
  width: 220px;
  background: rgb(35, 49, 54);
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  padding: 0 2ch;
  gap: 1ch;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px; 
  font-weight: bold; 
  transition: background-color 0.3s ease;
  margin: 20px auto;
}

button.create-squad-button:hover {
  background-color: #3e5f67; 
}

button.create-squad-button img {
  height: 80%; 
}

button.create-squad-button p {
  flex-grow: 1;
  text-align: left;
  margin-left: 1ch; 
}

.squad-info {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  background-color: none;
  border-radius: 10px;
  padding: 10px;
  color: #C6C6C6;
  font-family: 'Montserrat', sans-serif; 
}

.squad-image-placeholder {
  position: relative; 
  width: 30vh;
  height: 30vh;
  border-radius: 50%;
  background-color: #1F2A47; 
  display: flex;
  justify-content: center;
  align-items: center;
  order: 2; 
  margin-right: 500px;
}

.squad-texts {
  display: flex;
  flex-direction: column;
  order: 1; 
  margin-left: 500px;
}

.squad-name {
  font-size: 60px;
  font-weight: bold;
  color: #FFFFFF; 
  margin-bottom: 4px; 
}

.squad-motto {
  font-size: 48px; 
  font-weight: normal; 
  color: #8A9BAE; 
}

.squad-image{
  height: 30vh;
  width: 30vh;
  border-radius: 50%;
  border: 3px solid #03618C;
  margin-left:10vw;
}

.none_back{
  cursor: pointer;
  background: none;
  border: none; 
  outline: none; 
}

button.invite {

  background: none;
  border: none;
  color: inherit; 
  font-family: inherit; 
  font-size: inherit;
  padding: 0;
  margin: 0; 
  width: auto; 
  height: auto;
  cursor: pointer; 
  text-align: center; 
  display: inline-block; 
  line-height: normal; 
  vertical-align: middle; 
  transition: none; 
}

button.invite{
  padding: 5px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  background-color: #03618C;
  color: #C6C6C6;
}

.border-container {
  background-color: #34495e;
  border: 1px solid #ffffff;
  border-radius: 10px; 
  padding: 20px; 
}

.button-plus-icon {
  background: none;
  width: 30px;
  height: 30px; 
}

button.minus-symbol .button-icon {
  background: none;
  vertical-align: right; 
  margin-top: 500px;
  width: 20px;
  height: 20px; 
}

.leave_style {
  background: none;
  cursor: pointer;
  border: none; 
  outline: none; 
}
.button-container {
  text-align: right; 
}

</style>