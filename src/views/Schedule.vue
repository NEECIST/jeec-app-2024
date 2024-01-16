<template>
  <div class="schedule">
  <v-carousel class="carrousel"
            style="height: auto;"
            hide-delimiter-background
            hide-delimiters
            v-model="model"
        >
        <template v-slot:prev="{ on, attrs }">
          <v-btn
            depressed
            v-bind="attrs"
            v-on="on"
            @click="prevDay"
            style="background-color: #FFFCF8"
            ><v-icon class="arrow" color="blue" id="arrow-left" 
              >mdi-chevron-left</v-icon
            ></v-btn
          >
        </template>
        <template v-slot:next="{ on, attrs }">
          <v-btn
            depressed
            v-bind="attrs"
            v-on="on"
            @click="nextDay"
            style="right: 0vw; background-color: #FFFCF8"
            ><v-icon class="arrow" color="blue" id="arrow-right"
              >mdi-chevron-right</v-icon
            ></v-btn
          >
        </template>
        <!-- <v-carousel-item>
          <v-sheet color="#FFFCF8" tile>
            <v-row class="day-wrapper" justify="center">
              <p class="prize-type">Roadmap</p>
              <PersonalRewards
                style="margin-top: 15vh"
                :levels="levels"
                :user_points="currentUser.total_points"
                :user_level="currentUser.level.data.value"
              />
            </v-row>
          </v-sheet>
        </v-carousel-item>
        <v-carousel-item>
          <v-sheet color="#FFFCF8" tile>
            <v-row class="day-wrapper" justify="center">
              <p class="prize-type">Daily Squad</p>
              <SquadRewards
                style="margin-top: 15vh"
                :squads_rewards="squads_rewards"
                :squad_points="squad ? squad.daily_points : 0"
              />
            </v-row>
          </v-sheet>
        </v-carousel-item> -->
        <v-carousel-item>
          <h1 class="weekday-text">MONDAY</h1>
          
        </v-carousel-item>
        <v-carousel-item>
          <h1 class="weekday-text">TUESDAY</h1>
          
        </v-carousel-item>
        <v-carousel-item>
          <h1 class="weekday-text">WEDNESDAY</h1>
          
        </v-carousel-item>
        <v-carousel-item>
          <h1 class="weekday-text">THURSDAY</h1>
          
        </v-carousel-item>
        <v-carousel-item>
          <h1 class="weekday-text">FRIDAY</h1>
          
        </v-carousel-item>
       </v-carousel>
       <div class="buttons-container">
       <div v-show="list">
       <button class="left-btn all-btn" :class="{active: all}" @click="All">All</button>
       <button class="right-btn my-interests-btn" :class="{active: my_interests}" @click="MyInterests">My interests</button>
      </div>
      <!-- <div>
       <button class="left-btn list-btn" :class="{active: list}" @click="List">List</button>
       <button class="right-btn schedule-btn" :class="{active: schedule}" @click="Schedule">Schedule</button>
      </div> -->
    </div>
       <div class="schedule" v-if="schedule">
        <Calendar :day="day" :key="day"></Calendar>
        </div>
        <div class="activities" v-else>

    <div style="margin-top: 8vh" v-if="!loading_activities">
       
        <div class="activities-wrapper">
          
          <Activity
            v-for="(activity,index) in next_activities[day]"
            :key="activity.name + activity.type + Math.floor(Math.random() * 10000)"
            v-show="show_activity(activity)"
            :activity="activity"
            :past="!past"
            :has_first="day==0||past_activities[day]||(!next_activities[day-1])"
            :index = index
          />
          <Activity
            v-for="activity in past_activities[day]"
            :key="activity.name + activity.type + Math.floor(Math.random() * 10000)"
            v-show="show_activity(activity)"
            :activity="activity"
            :past="past"
          />
          <div class="mobile" style="height: 10vh"></div>
        </div>

        <div class="no-activities-warning" style="display: none">
          <span class="warning-msg">Go to your</span>
          <span class="warning-msg profile"> Profile </span>
          <span class="warning-msg">to add Interests!</span>
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
      </div>
  </template>
  
  <script>
import Calendar from "../components/Calendar.vue";
import Activity from "@/components/Activity.vue";
import UserService from "../services/user.service";
//import Activity from "@/components/Activity.vue";
//import UserService from "../services/user.service";

  
  export default {
    name: "Schedule",
    components: {
    Calendar,
    Activity,
    //Activity,
},
 
    data: function () {
      return {
        eventss:{},
        error:'',
        past:true,
        day:0,
        all:true,
        list:true,
        my_interests:false,
        schedule:false,
        button: "all",
      model: 0,
      event_days: [],
      event_dates: [],
      activities: [],
      weekdays: [
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
      ],
      loading_activities: true,
      past_activities:[],
      next_activities:[],
      };
    },
    methods: {
      getEventDates(start_date, end_date) {
      var startDate = new Date(start_date.substring(0, 11));
      var endDate = new Date(end_date.substring(0, 11));
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        this.event_days.push(new Date(d));
      }
    },
    show_activity(activity) {
      return (
        (this.all ||
          (this.my_interests && activity.interest))
      );
    },
    click(name) {
      if (name !== this.button) {
        this.button = name;
      }
    },
      All(){
        this.all=true
        this.my_interests=false
      },
      MyInterests(){
        this.all=false
        this.my_interests=true
      },
      List(){
        this.list=true
        this.schedule=false
      },
      Schedule(){
        this.list=false
        this.schedule=true
      },
      prevDay(){
        this.day--
        if(this.day==-1){
          this.day=4
        }
      },
      nextDay(){
        this.day++
        if(this.day==5){
          this.day=0
        }
      }
      
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
    },
    mounted() {
      
    },
    async created() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    await UserService.getEventDates().then(
      (response) => {
        this.event_dates = response.data;
  
      },
      (error) => {
        console.log(error);
      }
    )
    for(let i=0;i<5;i++){
      this.next_activities.concat({})
      this.past_activities.concat({})
    }
    await UserService.getActivities(
        this.event_dates[0]
      ).then(
        (response) => {
          this.next_activities[0] =response.data.data;
        },
        (error) => {
          console.log(error);
        }
      )
      await UserService.getPastActivities(
        this.event_dates[0]
      ).then(
        (response) => {
          this.past_activities[0] = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      )
    await UserService.getActivities(
        this.event_dates[1]
      ).then(
        (response) => {
          this.next_activities[1] = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      )
      await UserService.getPastActivities(
        this.event_dates[1]
      ).then(
        (response) => {
          this.past_activities[1] = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      )
    await UserService.getActivities(
        this.event_dates[2]
      ).then(
        (response) => {
          this.next_activities[2] = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      )
      await UserService.getPastActivities(
        this.event_dates[2]
      ).then(
        (response) => {
          this.past_activities[2] = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      )
    await UserService.getActivities(
        this.event_dates[3]
      ).then(
        (response) => {
          this.next_activities[3] = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      )
      await UserService.getPastActivities(
        this.event_dates[3]
      ).then(
        (response) => {
          this.past_activities[3] = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      )
    await UserService.getActivities(
        this.event_dates[4]
      ).then(
        (response) => {
          this.next_activities[4] = response.data.data;
        },
        (error) => {
          console.log(error);
        }
      )
      await UserService.getPastActivities(
        this.event_dates[4]
      ).then(
        (response) => {
          this.past_activities[4] = response.data.data;
          this.loading_activities = false;
        },
        (error) => {
          console.log(error);
          this.loading_activities = false;
        }
      )
  },
  };
  </script>

<style scoped>

.schedule{
  background-color: #FFFCF8;
}
.weekday-text{
  text-align:center;
  margin-left:auto;
  margin-right:auto;
  color: black;
  font-size:50px;
}

.buttons-container{
  display:flex;
  justify-content: space-around;
  margin-top:6vh;
}
.left-btn{
  background-color:#5B97B2;
  color:white;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 25px;
  margin-right:5px;
  width:20vw;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.right-btn{
  background-color:#5B97B2;
  color:white;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 25px;
  width:20vw;
  min-width:130px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.all-btn{
  width:20vw
}

.my-interests-btn{
  width:40vw; 
  min-width:160px
}

.list-btn{
  width:15vw
}

#arrow-left{
  font-size:70px;
  position:relative;
}

#arrow-right{
  font-size:70px;
  position:relative;
}

.active{
  background-color:#03618C;
}

@media screen and (max-width: 450px) {
  .left-btn{
  color:white;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  margin-right:5px;
  width:20vw;
  height:30px;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
}
.right-btn{
  color:white;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  width:20vw;
  min-width:130px;
  height:30px;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}
.all-btn{
  width:30px;
}

.my-interests-btn{
  width:80px;
  min-width: 0;
}

.list-btn{
  width:40px;
}

.schedule-btn{
  width:60px;
  min-width:0
}
@media screen and (max-width: 360px) {
  #arrow-left{
    left:-30px;
    font-size:40px;
  }
  #arrow-right{
    right:-30px;
    font-size:40px;
  }
  .weekday-text{
  font-size:20px;
}
}
}
@media screen and (max-width: 700px) and (min-width: 360px){
  .weekday-text{
    font-size:20px !important; 
}
#arrow-left{
    left:-30px;
    font-size:45px;
  }
  #arrow-right{
    right:-30px;
    font-size:45px;
  }
}

.loading-bar{
  display:block;
  margin-left:auto;
  margin-right:auto;
  margin-top:10vh;
}

</style>
  