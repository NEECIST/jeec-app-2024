<template>
  <div class="squad">
    <!-- <Buttons
      @_click="click"
      :usernames="{
        'my squad': button === 'my squad',
        invites: button === 'invites',
      }"
      :n_invites="invites.length"
    /> -->

    <div
      v-if="!loading_squad"
    >

      <SquadCreation
        v-if="squad === null"
        @create="create_squad"
        @notification="notification"
      />

      <div v-else class="squad-info">
      
      <img
          class="squad-image"
          :src="jeec_brain_url + squad.image"
          alt="squad-image"
        />
      <div class="squad-texts">
        <p class="squad-text">
         {{ squad.username }}
        </p>
        <p class="squad-motto">
          {{ squad.cry }}
        </p>
      </div>
      </div>

      <!-- {{ this.students.length > 0 && this.students[0].username ? this.students[0].username : '' }}
      <div v-if="this.students.length > 0">
        <img :src="students[0].photo" alt="Student Photo" class="avatar" />
      </div> -->
      
      <!-- <ul>
        <li
          v-for="student in students"
          :key="student.username"
          v-if="student">
          <img :src="student.photo" alt="Student Photo" class="avatar" />
          {{ student.username }}
        </li>
      </ul> -->

      
      <div v-if="squad!=null && !champion_week" class="squad-rank weekly">
        <h1>
          Weekly rank 
        </h1>
        <h2>
          {{ weekly_max_points - squad.total_points }}xp to first! 
        </h2>
        
      </div>
      <div v-else-if="squad!=null && champion_week" class="squad-rank weekly">
        <h1>
          Weekly rank
        </h1>
        <h2>
          You are currently the week champ!!!
        </h2>
      </div>


      <div v-if="squad!=null && !champion_daily"  class="squad-rank daily">
        <h1>
          Daily rank 
        </h1>
        <h2>
          {{ daily_max_points - squad.daily_points }}xp to first! 
        </h2>
      </div>
      <div v-else-if="squad!=null && champion_daily" class="squad-rank daily">
        <h1>
          Daily rank
        </h1>
        <h2>
          You are currently the daily champ!!!
        </h2>
      </div>

      <div v-if="squad!=null" class="squad-rank total">
        <h1>
          Total Squad Points
        </h1>
        <h2>
          {{ squad.total_points }}
        </h2>
      </div>
      
      <div style="margin-top: 8vh" class="bottom-half" v-if="squad!=null || invites.length > 0">
        <div v-if="squad!=null" class="plus-members">
          <h1>Members ({{squad.members.data.length}}/4)</h1>
          <center class="bottom-buttons">

        <button class="plus-symbol" @click.stop="add_members_dialog = true"
        v-if="squad.members.data.length < 4 && !loading_add">
          ⊕
        </button>

      <button
        v-if="!loading_delete"
        @click.stop="leave_squad"
        class="minus-symbol"
      >
      ⊖
      </button>
      <v-progress-circular
        v-else
        style="margin-left: 12vw; margin-right: 12vw"
        indeterminate
        color="#27ade4"
        :size="60"
        :width="6"
        class="loading-bar"
      ></v-progress-circular>
    </center>

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
    <!-- <v-dialog v-model="add_members_dialog" :width="width > 1100 ? '50vw' : ''">
      <v-card class="squad-dialog">
        <p class="dialog-title">Add Squadmates</p>
        <v-autocomplete 
          v-model="squadmates"
          :items="students"
          outlined
          chips
          label="username"
          item-text="username"
          multiple
          :filter="filterStudents"
          :search-input.sync="search"
          @change="limitStudents"
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.username"
              close
              @click="remove(data.item)"
              @click:close="remove(data.item)"
            >
              <v-avatar left>
                <v-img :src="data.item.photo"></v-img>
              </v-avatar>
              {{ data.item.username }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-avatar>
                <img :src="data.item.photo" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.username"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="data.item.username"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
        <center>
          <button @click.stop="invite" class="invite">Invite</button>
        </center>
      </v-card>
    </v-dialog>  -->
        </div>  
        <div v-if="squad!=null">
          <Member
            v-for="member in squad.members.data"
            :key="member.username"
            :member="member"
            :captain_ist_id="squad.captain_ist_id"
            @kick="kick_member"
          />
        </div>
        
        <h2 v-if="invites.length > 0"> You've been invited to:</h2>
      <Invite
        @accept="accept_invite"
        @reject="reject_invite"
        v-for="invite in invites"
        :key="invite.sender_username"
        :invite="invite"
      />
    </div>
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
import Invite from "@/components/Invite.vue";
import UserService from "../services/user.service";
import SquadCreation from "@/components/SquadCreation.vue";
import Member from "@/components/Member.vue";
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
      default_image: require("../assets/jeec_colour_no_edition_transparent.svg"),
      width: window.innerWidth,
      loading_delete: false,
      loading_add: false,
      squads_aux: null,
      length: 0,
      champion_week: false,
      champion_daily: false,
      hover: false,
      members_with_squad: null,
      invited_members: null
    };
  },
  methods: {
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
    


    // if(this.length > 1) {
    //     await UserService.getDailySquadsRanking().then(
    //       (response) => {
    //         let daily_squads = response.data.data;
    //         if (!Array.isArray(this.daily_squads)) this.daily_squads = [this.daily_squads];
    //         this.loading_daily = false;
    //         this.daily_max_points = daily_squads[0].daily_points
    //         this.weekly_max_points = daily_squads[0].total_points
    //         this.squads_aux = daily_squads[0]
    //       },
    //       (error) => {
    //         console.log(error);
    //         this.loading_daily = false;
    //       }
    //     );
    //     if (this.weekly_max_points == this.squad.total_points) {
    //       this.champion_week = true
    //     }
    //     if (this.daily_max_points == this.squad.daily_points) {
    //       this.champion_daily = true
    //     }
    // } else if (this.length == 1) {
    //   this.champion_week = true
    //   this.champion_daily = true
    // } 

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

.squad-texts{
  margin-left:5vw;
}

.plus-members{
  display:flex;
  justify-content:start;
  align-items: center;
}

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

.weekly h1{
  background-color: #D93046;
}

.weekly h2{
  background-color: #D9304633;
}

.daily h1{
  background-color: #D9D004;

}

.daily h2{
  background-color: #D9D00433;

}

.total h1{
  background-color: #3843A6;

}

.total h2{
  background-color: #CEE5FF;

}

.squad-info{
  display:flex;
  justify-content:start;
  align-items: center;
  width:100vw;
}
.squad {
  background-color: #FFFCF8;
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

.squad-motto{
  font-family: Montserrat;
  font-size: 30px;
  font-weight: 600;
  margin-bottom:0;
}


.bottom-half{
  background-color: #DDEDF3;
  position:relative;
  width:100vw;
  height:auto;
  border-top-right-radius: 10vw;
  border-top-left-radius: 10vw;
  padding-bottom:20vh;
}

.bottom-half h1{
  color: #03618C;
  font-family: Montserrat;
  font-size: 32px;
  font-weight: 600;
  padding-top:5vh;
  padding-left:3vw;
  border-bottom: 3px solid #D9D004;
  margin-right: 5vw;
}

.bottom-half h2{
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 600;
  padding-top:5vh;
  padding-left:3vw;
  border-bottom: 3px solid #D9D004;
  width:310px;
}

.squad-image{
  height: 13vh;
  width: 13vh;
  border-radius: 50%;
  border: 3px solid #03618C;
  margin-left:10vw;
}

.plus-symbol{
  color: #03618C;
  font-weight:10;
  font-size:60px;
  padding-top:6vh;
}

.minus-symbol{
  color:  #D93046;
  font-weight:10;
  font-size:60px;
  padding-top:6vh;
}

.squad-dialog{
  text-align: center;
  background-color: #FFFCF8;
  font-family: Montserrat;
  font-size: 32px;
  font-weight: 600;
  border: 3px solid #03618C;
}

.hover {
  color: red; /* or any other styles you want to apply on hover */
}

.hover-effect {
  transition: all 0.3s ease; /* this makes the change in style smooth */
  cursor: pointer; /* this changes the cursor to a hand when hovering over the text */
}

.hover-effect:hover {
  transform: scale(1.2); /* this enlarges the text, giving it a "pop" effect */
  color: red; /* changes the text color */
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
  background-color: #fff;
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
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.chip {
  background-color: #f0f0f0;
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


</style>