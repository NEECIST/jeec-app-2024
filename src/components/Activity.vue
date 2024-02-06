<template>
  <div
  class="activity"
    :class="{
      participated: activity.participated,
      quest: !activity.participated && activity.quest,
      past: past,
      first: has_first && index==0
    }"
  >
    
  
      <div class="activity-text">
        <p class="type">{{ activity.name }}</p>
        <p v-if="activity.name" class="name">{{ activity.type }}</p>
        <p v-if="companies" class="companies">by {{ companies }}</p>
        <p v-if="speakers" class="speakers">{{ speakers }}</p>
        <p class="inner-description">{{ activity.description }}</p>
      </div>


        <div class="right-side" v-if="!past">
          <button class="schedule-btn" v-show="activity.registration_open"
          >
          <a :href="activity.registration_link"> 
            <div class="schedule-whitespace"><img class="schedule-icon" src="../assets/icons/add_to_schedule_icon.svg"></div>
          </a>
          </button>

          <br>
          <br>

          <p class="hours mobile">{{ activity.time }}-{{ activity.end_time }}</p>
          <!-- <button v-if="activity.zoom_url"><a :href="zoom()">Add to Calendar</a></button> -->
          <button
            @click.stop="
              $refs.calendar.click();
              click_add_to_calendar();
            "
            
          >
        
            <a ref="calendar" :href="calendar()" target="_blank" class="add-to-calendar-btn">
            <p class="calendar-txt" :class="{whitetext: has_first && index==0}">Add to Calendar</p>
            <div style="height:9vw">
              <div class="top-btn">

              </div>
              <div class="bottom-btn">
                <p class="btn-text">+</p>
              </div>
                
            </div>
          </a>
     
          
          </button>
          <p class="xp-text">{{ activity.points }}xp</p>
        </div>




    <!-- <p v-if="currentPage !== 'Quests'" class="description">
      {{ activity.description }}
    </p> -->


    <v-dialog
      v-model="dialog"
      style="overflow-x: visible !important"
      :width="width > 1100 ? '70vw' : ''"
    >
      <v-card>
        <v-icon @click.stop="dialog = false" class="close-dialog"
          >mdi-close</v-icon
        >
        <div class="dialog-wrapper">
          <div>
            <center
              class="dialog-companies mobile"
              v-if="activity.companies.data.length > 0"
            >
              <div
                class="dialog-company-img"
                :style="
                  'background-image:' +
                  'url(' +
                  jeec_brain_url +
                  company.logo +
                  ')'
                "
                v-for="company in activity.companies.data"
                :key="company.name"
              ></div>
            </center>
            <p class="dialog-type">{{ activity.type }}</p>
            <p v-if="activity.name" class="dialog-name">{{ activity.name }}</p>
            <p v-if="activity.companies.data.length > 0" class="dialog-by">
              by {{ companies }}
            </p>
            <p class="dialog-description">{{ activity.description }}</p>
            <p v-if="activity.reward.name" class="dialog-raffle">
              Raffle: {{ activity.reward.name }}
            </p>
            <!-- <p class="dialog-warning" v-if="activity.type === '15/15'">
              This activity is held in the company's Job Fair booth
            </p> -->
            <p
              class="dialog-warning"
              v-if="
                activity.type === 'Discussion Panel' ||
                activity.type === 'Speaker'
              "
            >
              This activity is held in the Job Fair's auditorium
            </p>

            <div class="dialog-time browser">
              <p class="dialog-day">
                <v-icon>mdi-calendar-arrow-right</v-icon> {{ activity.day }}
              </p>
              <p class="dialog-hours">
                <v-icon>mdi-clock-time-four-outline</v-icon>
                {{ activity.time }} -
                {{ activity.end_time }}
              </p>
            </div>
          </div>
          <div class="rect browser"></div>
          <div>
            <center
              class="dialog-companies browser"
              v-if="activity.companies.data.length > 0"
            >
              <div
                class="dialog-company-img"
                :style="
                  'background-image:' +
                  'url(' +
                  jeec_brain_url +
                  company.logo +
                  ')'
                "
                v-for="company in activity.companies.data"
                :key="company.name"
              ></div>
            </center>
            <center
              v-if="activity.speakers.data.length > 0"
              class="dialog-speakers"
            >
              <figure
                class="dialog-speaker"
                v-for="speaker in normal_speakers"
                :key="speaker.name"
              >
                <img
                  class="dialog-speaker-img"
                  :src="jeec_brain_url + speaker.image"
                />
                <figcaption class="dialog-speaker-caption">
                  <p>{{ speaker.name }}</p>
                  <p>
                    {{ speaker.position
                    }}{{ speaker.company ? " @ " + speaker.company : "" }}
                  </p>
                </figcaption>
              </figure>
            </center>

            <center class="moderator" v-if="moderator">
              <figure class="dialog-speaker">
                <img
                  class="dialog-speaker-img moderator"
                  :src="jeec_brain_url + moderator.image"
                />
                <figcaption class="dialog-speaker-caption">
                  <p>{{ moderator.name }}</p>
                  <p>
                    {{ moderator.position
                    }}{{ moderator.company ? " @ " + moderator.company : "" }}
                  </p>
                </figcaption>
              </figure>
            </center>

            <center
              class="dialog-speakers-companies"
              v-if="activity.type !== 'Discussion Panel' && speakers_companies"
            >
              <img
                v-for="company in speakers_companies"
                :key="company"
                :src="jeec_brain_url + company"
              />
            </center>

            <div class="dialog-buttons">
              <button
                v-if="activity.zoom_url"
                style="background-color: #27ade4"
                @click.stop="$refs.zoom.click()"
              >
                <a
                  ref="zoom"
                  :href="activity.zoom_url"
                  target="_blank"
                  @click.stop="click_zoom()"
                  >Zoom Link</a
                >
              </button>
              <button
                v-if="activity.registration_open && activity.registration_link"
                style="background-color: #e42741"
                @click.stop="$refs.registration.click()"
              >
                <a
                  ref="registration"
                  :href="activity.registration_link"
                  target="_blank"
                  @click.stop="click_registration()"
                  >Registration</a
                >
              </button>
              <button
                style="background-color: #27ade4"
                @click.stop="$refs.calendar.click()"
              >
                Add to Calendar
              </button>
              <button v-show="!inSchedule"
                style="background-color: #27ade4"
                @click.stop="click_add_to_schedule(activity)"
              >
                Add to Schedule
              </button>
              <button v-show="inSchedule"
                style="background-color: #27ade4"
                @click.stop="click_delete_to_schedule(activity)"
              >
                Delete From Schedule
              </button>
            </div>
          </div>
          <div class="dialog-time mobile">
            <p class="dialog-day">
              <v-icon>mdi-calendar-arrow-right</v-icon> {{ activity.day }}
            </p>
            <p class="dialog-hours">
              <v-icon>mdi-clock-time-four-outline</v-icon> {{ activity.time }} -
              {{ activity.end_time }}
            </p>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia'
import LogService from "../services/log.service";
import axios from 'axios';

export default {
  name: "Activity",
  data: function () {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      currentPage: this.$route.name,
      images: [],
      current_image: 0,
      dialog: false,

      inSchedule: false,
      add_calendar_img: require("../assets/add_calendar_btn.png")
    };
  },
  props: {
    activity: Object,
    past: Boolean,
    has_first:Boolean,
    index:Number,
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    speakers_companies() {
      var speakers = this.activity.speakers.data.slice(0);
      var companies = [];

      for (var i = 0; i < speakers.length; i++) {
        if (
          speakers[i].company &&
          speakers[i].company_logo &&
          !companies.includes(speakers[i].company_logo)
        ) {
          companies.push(speakers[i].company_logo);
        }
      }

      return companies;
    },
    normal_speakers() {
      var speakers = this.activity.speakers.data.slice(0);

      for (var i = 0; i < speakers.length; i++) {
        if (speakers[i].name === this.activity.moderator) {
          speakers.splice(i, 1);
        }
      }

      return speakers;
    },
    moderator() {
      var speakers = this.activity.speakers.data;

      for (var i = 0; i < speakers.length; i++) {
        if (speakers[i].name === this.activity.moderator) {
          return speakers[i];
        }
      }

      return null;
    },
    companies() {
      var companies = [];

      for (var i = 0; i < this.activity.companies.data.length; i++) {
        companies.push(this.activity.companies.data[i].name);
      }

      return companies.join(", ");
    },
    speakers() {
      var speakers = [];

      for (var i = 0; i < this.activity.speakers.data.length; i++) {
        speakers.push(this.activity.speakers.data[i].name);
      }

      return speakers.join(", ");
    },
  },
  methods: {
    async isInSchedule() {
      await axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/student/is_activity_in_schedule_vue', 
      {student_ist_id: this.user.ist_id, activity_name: this.activity.name})
         .then((response) => {
          const data = response.data; // [{}, {}]
          this.inSchedule = data.inSchedule;
        });       
    },
    async click_see_more() {
      this.dialog = true;
      LogService.postLog("/see_more/" + this.activity.name);
    },
    async click_add_to_schedule(activity) {
      axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/student/add_to_schedule_vue', 
      {student_ist_id: this.user.ist_id, activity_name: activity.name})
         .then((response) => {
          const data = response.data; // [{}, {}]
          this.error = data.error;
          this.inSchedule = true;
        });  
    },
    async click_delete_to_schedule(activity) {
      axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/student/delete_from_schedule_vue', 
      {student_ist_id: this.user.ist_id, activity_name: activity.name})
         .then((response) => {
          const data = response.data; // [{}, {}]
          this.error = data.error;
          this.inSchedule = false;
        });  
    },
    async click_add_to_calendar() {
      LogService.postLog("/add_to_calendar/" + this.activity.name);
    },
    async click_zoom() {
      LogService.postLog("/zoom/" + this.activity.name);
    },
    async click_registration() {
      LogService.postLog("/registrarion/" + this.activity.name);
    },
    updateImages() {
      setInterval(() => {
        this.current_image = this.current_image + 1;
      }, 2500);
    },
    calendar() {
      var url = "https://calendar.google.com/calendar/render?action=TEMPLATE";
      url = url + "&text=" + this.activity.name;
      url = url + "&ctz=" + "Europe/Lisbon";
      url = url + "&location=" + this.activity.location;
      url = url + "&dates=" + this.getDate();
      url =
        url +
        "&sprop=website:" +
        this.activity.registration_link +
        "&sprop=name:" +
        this.activity.name;

      if (this.activity.registration_open) {
        url =
          url +
          "&details=" +
          "<b>Registrations:</b>" +
          "<br>" +
          "<a>" +
          this.activity.registration_link +
          "</a>" +
          "<br>" +
          "<br>" +
          "<b>Zoom:</b>" +
          "<br>" +
          "<a>" +
          this.activity.zoom_url +
          "</a>" +
          "<br>" +
          "<br>" +
          "<b>Description:</b>" +
          "<br>" +
          this.activity.description;
      } else {
        url =
          url +
          "&details=" +
          "<b>Zoom:</b>" +
          "<br>" +
          "<a>" +
          this.activity.zoom_url +
          "</a>" +
          "<br>" +
          "<br>" +
          "<b>Description:</b>" +
          "<br>" +
          this.activity.description;
      }

      var date = new Date();

      if (
        date.getHours().toString() + ":" + date.getMinutes().toString() >
        this.activity.time
      ) {
        url = url + "&crm=" + "BUSY"; //busy
      } else if (!this.activity.registration_open) {
        url = url + "&crm=" + "BLOCKING"; //blocking
      } else {
        url = url + "&crm=" + "AVAILABLE"; //available
      }

      return url;
    },
    getDate() {
      var start_date = new Date(
        this.activity.day.substring(0, 11) + " " + this.activity.time + ":00"
      );
      var end_date = new Date(
        this.activity.day.substring(0, 11) +
        " " +
        this.activity.end_time +
        ":00"
      );

      start_date =
        start_date.getFullYear().toString() +
        (start_date.getDate() < 10
          ? "0" + (start_date.getDate()).toString()
          : (start_date.getDate()).toString()) +
        (start_date.getMonth()+1 < 10
          ? "0" + (start_date.getMonth()+1).toString()
          : (start_date.getMonth()+1).toString()) +
        "T" +
        (start_date.getHours() < 10
          ? "0" + start_date.getHours()
          : start_date.getHours()) +
        (start_date.getMinutes() < 10
          ? "0" + start_date.getMinutes()
          : start_date.getMinutes()) +
        "00";

      end_date =
        end_date.getFullYear().toString() +
        (end_date.getDate() < 10
          ? "0" + (end_date.getDate()).toString()
          : (end_date.getDate()).toString()) +
        (end_date.getMonth()+1 < 10
          ? "0" + (end_date.getMonth()+1).toString()
          : (end_date.getMonth()+1).toString()) +
        "T" +
        (end_date.getHours() < 10
          ? "0" + end_date.getHours()
          : end_date.getHours()) +
        (end_date.getMinutes() < 10
          ? "0" + end_date.getMinutes()
          : end_date.getMinutes()) +
        "00";

      return start_date + "/" + end_date;
    },
  },
  created() {


    for (var i = 0; i < this.activity.companies.data.length; i++) {
      if (this.activity.companies.data[i].logo) {
        this.images.push(
          this.jeec_brain_url + this.activity.companies.data[i].logo
        );
      }
    }

    for (var j = 0; j < this.activity.speakers.data.length; j++) {
      if (this.activity.speakers.data[j].image) {
        this.images.push(
          this.jeec_brain_url + this.activity.speakers.data[j].image
        );
      }
    }

    this.updateImages();
  },
  mounted() {
    this.isInSchedule()
    //console.log(this.inSchedule)
  }
};
</script>

<style scoped>

.activity {
  background-color: #1A9CD826;
  color: #03618C;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 4vw;
  padding-right: 4vw;
  position: relative;
  width: 90vw;
  max-width: 800px;
  border-radius: 30px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  margin-bottom: 10vh;
  justify-content: space-between;
}

.past{
  background-color: #D9D9D9CC;
  color: #888A8C;
}

.first{
  background-color: #1A9CD8;
  color: white;
}

.add-to-calendar-btn{
  display:flex;
  flex-wrap: nowrap;
  width:30vw;
  max-width: 260px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5vh;
}

.whitetext{
  color:white !important;
}


.schedule-icon{
  background-color:white;
  width:5vw;
  position:relative;
  top:1.25vw;
  min-width:20px;
  min-height:20px;
  max-width: 37px;
  max-height: 37px;
}

.schedule-whitespace{
  background-color:white;
  width:7.5vw;
  height:7.5vw;
  border-radius:100%;
  min-width:30px;
  min-height:30px;
  position: relative;
  left: 2.5vw;
  max-width: 50px;
  max-height: 50px;
}

.schedule-btn{
  width:7.5vw;
  height:7.5vw;
  position:absolute;
  right:6vw;
  min-width:30px;
  min-height:30px;
  max-width:60px;
  max-height:60px;
}

.top-btn{
  margin-top:1vw;
  background-color: #D93046;
  height:2vw;
  width:9vw;
  max-width:100px;
  max-height:20px;
  display:block;
  border-top-left-radius: 3vw;
  border-top-right-radius: 3vw;
}

.bottom-btn{
  background-color: #DE5F70;
  height:5vw;
  max-width:100px;
  max-height:54px;
  width:9vw;
  border-bottom-left-radius: 2vw;
  border-bottom-right-radius: 2vw;
}

.btn-text{
  color:white;
  font-size:8vw;
  position:relative;
  top:-3.5vw;
}


.activity-text {
  max-width: 65vw;
}

.hours {
  position: relative;
    right: -2.5vw;
    font-size: 30px;
    font-weight: 800;
    text-align: center;
    margin-top: 5vh;
}

.name {
  font-size: 32px;
    line-height: 3vh;
    font-weight: 700;
    margin-bottom: 2vh;
    text-align: left;
}

.type {
    font-size: 40px;
    font-weight: 600;
    margin-top: 2vh;
    text-align: left;
    margin-bottom:0px;
}

.companies,
.speakers {
  margin: 0;
    margin-bottom: -0.5vh;
    text-align: left;
    font-size: 30px;
    font-weight: 700;
}




.close-dialog {
  position: absolute;
  right: 0;
  top: 0;
}

.dialog-wrapper {
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 3vw;
  padding-right: 3vw;
}

.dialog-companies {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.dialog-company-img {
  position: relative;
  height: 9vh;
  width: 9vh;
  border-radius: 50%;
  border: 0.1vh solid #707070;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 1vh;
  margin-left: 1vw;
  margin-right: 1vw;
}

.dialog-type {
  font-size: 3.5vh;
  font-weight: 600;
  text-align: center;
  margin: 0;
  margin-top: 1vh;
}

.dialog-name {
  font-size: 3vh;
  font-weight: 500;
  line-height: 3vh;
  text-align: center;
  margin: 0;
  margin-bottom: 1vh;
}

.dialog-by {
  text-align: center;
  font-size: 2vh;
  font-weight: 600;
  margin: 0;
}

.dialog-description {
  text-align: justify !important;
  font-size: 2.2vh;
  line-height: 2.5vh;
  font-weight: 500;
  margin: 0;
}

.dialog-raffle {
  font-size: 2vh;
  font-weight: bolder;
  text-align: center;
  margin-top: 1vh;
  margin-bottom: 0;
}

.dialog-buttons {
  margin-top: 2vh;
  display: flex;
  justify-content: space-evenly;
}

.dialog-buttons * {
  color: white;
}

.dialog-buttons > button {
  width: 100%;
  min-height: 6vh;
  border-radius: 2vh;
  margin-left: 1vw;
  margin-right: 1vw;
  font-size: 2.1vh;
  font-weight: 500;
}

.dialog-warning {
  color: #e42741;
  font-size: 2vh;
  font-weight: bolder;
  margin: 0;
  text-align: center;
}

.dialog-speakers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1vh;
}

.dialog-speaker {
  display: flex;
  text-align: center;
  margin-left: 2vw;
  margin-right: 2vw;
  justify-content: center;
  align-self: flex-start;
  margin-bottom: 1vh;
}

.dialog-speaker-img {
  height: 7.5vh;
  width: 7.5vh;
  margin-right: 2vw;
  border-radius: 50%;
}

.moderator img {
  border: 0.4vh solid #27ade4;
  box-shadow: 0 0 1vh 0.2vh #27ade4;
}

.dialog-speaker-caption {
  width: 18vw;
}

.dialog-speaker-caption p:first-of-type {
  font-size: 1.7vh;
  font-weight: 600;
  margin: 0;
  text-align: left;
}

.dialog-speaker-caption p:last-of-type {
  font-size: 1.4vh;
  margin: 0;
  text-align: left;
}

.dialog-speakers-companies {
  margin-top: 1vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.dialog-speakers-companies img {
  max-height: 8vh;
  max-width: 30vw;
}

.dialog-time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1vh;
  text-align: center;
}

.dialog-day,
.dialog-hours {
  margin: 0;
  font-size: 2.2vh;
  font-weight: 800;
}

.xp-text{
  font-size:2.5vw;
  font-weight:600;
  text-align:right;
  position:absolute;
  bottom:0;
  right:5vw;
}



.calendar-txt{
  text-align: center;
    font-size: 25px;
    font-weight: 700;
    margin: 0;
    color: #03618C;
    margin-top: -1vw;
}

.inner-description{
  font-size: 25px;
  font-weight: 600;
  margin-top: 5vh;
}

@media screen and (min-width:1100px){

  .xp-text{
    font-size:26px;
  }
  .btn-text{
  font-size:90px;
  top:-40px;
}
.bottom-btn{
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
}

@media screen and (min-width:700px){
  .schedule-icon{
  top:7px;
}
}

@media screen and (max-width:700px){
  .type{
    font-size: 6vw;
  }
  .name{
    font-size: 5vw;
  }
  .companies, .speakers{
    font-size: 4.5vw; 
  }
  .inner-description{
    font-size:3vw;
  }
  .hours{
    font-size:4.5vw;
  }
  .calendar-txt{
    font-size: 3vw
  }
}


</style>