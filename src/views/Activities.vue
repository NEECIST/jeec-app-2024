<style>
.carousel__item {
  min-height: 30px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 14px;
  border-radius: 0px;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}

.carousel__slide {
  padding: 0px;
  align-items: start;
  justify-content: start;
  display: flex;
  flex-direction: column;
}
.carousel__track{
  justify-content:safe center;

}

.carousel__icon{
  fill: none;
}

.carousel__prev svg,
.carousel__next svg{
  box-sizing: content-box;
  border: 5px solid white;
  fill: none;
  width: 200%;
  height: 200%;
  position: absolute;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

/*  */
.weekday{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.schedule{
  opacity: 0;
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
  transition: 0.5s;
  align-items: center;
  .schedule {
    transition: 0.5s;
    opacity: 1;
    width: 90vw;
    overflow: visible;
  }
}

</style>



<template>
  <div class="activities">


    <div style="margin-top: 8vh" v-if="loading_activities">
        <div>
          <Carousel ref="schedule_carousel" :itemsToShow="2.5" :wrapAround="true" :transition="500">
            <Slide v-for="weekday in weekdays" :key="weekday" style="flex-direction: column;">
              <a  class="carousel__item" style="cursor: pointer;" @click="carouselSlideEvent($event.target.parentElement.parentElement)">

                <div class="weekday" >

                  <p style="pointer-events: none;">{{ weekday }}</p>
                </div>

                

              </a>

              <div class="carousel_item">
                <div class="schedule">
                  <div v-for="event in activities" :key="event" class="event">
                    <div v-if="getWeekday(event.day) == weekday">
                      <p>{{ event.time }}</p>
                      <br>
                      <p>{{ event.type }}</p>
                      <br>
                      <p>{{ event.name }}</p>

                    </div>
                  </div>
                </div>
                
              </div>
            </Slide>
          </Carousel> 
          
        </div>
        
        <!-- <div class="activities-wrapper">
          <Activity
            v-for="activity in activities"
            :key="activity.name + activity.type + Math.floor(Math.random() * 10000)"
            v-show="show_activity(activity)"
            :activity="activity"
          />
          <div class="mobile" style="height: 10vh"></div>
        </div> -->

        <div class="no-activities-warning" style="display: none">
          <span class="warning-msg">Go to your</span>
          <span class="warning-msg profile"> Profile </span>
          <span class="warning-msg">to add Interests!</span>
        </div>
    </div>
    <div v-else class="loading">
     <!-- Loading Screen -->
    </div>
  </div>
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import Activity from "@/components/Activity.vue";
import UserService from "../services/user.service";
import {ref} from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia'
import { Carousel, Pagination, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

const schedule_carousel = ref("schedule_carousel")
console.log(schedule_carousel)
export default {
  name: "Schedule",
  components: {
    Activity,
    Buttons,
    Carousel,
    Pagination,
    Navigation,
    Slide
  },
  data: function () {
    return {
      button: "all",
      model: 0,
      event_dates: [],
      activities: [],
      weekdays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      event_days:[
        "19 02 2024, Monday",
        "20 02 2024, Tuesday",
        "21 02 2024, Wednesday",
        "22 02 2024, Thursday",
        "23 02 2024, Friday",
      ],
      loading_activities: true,
    };
  },
  methods: {
    show_activity(activity) {
      return (
        activity.day === this.event_dates[this.model] &&
        (this.button === "all" ||
          (this.button === "my interests" && activity.interest))
      );
    },
    click(name) {
      if (name !== this.button) {
        this.button = name;
      }
    },
    // get weekday from string format "dd mm yyyy, weekday"
    getWeekday(date) {
      return date.split(", ")[1];
    },
    carouselSlideEvent(target) {
      console.log("click");

      if(target.classList.contains("carousel__slide--next")){
        this.$refs.schedule_carousel.next()
        const active_slide = document.querySelector(".carousel__slide--active");
        if (active_slide) {
          active_slide.style.pointerEvents = "all";
        }

        // update slide pointer events after transition
        setTimeout(() => {
          const new_active_slide = document.querySelector(".carousel__slide--active");
          if (new_active_slide) {
            new_active_slide.style.pointerEvents = "none";
          }
        }, 550);

      } else if(target.classList.contains("carousel__slide--prev")){
        this.$refs.schedule_carousel.prev()

        const active_slide = document.querySelector(".carousel__slide--active");
        if (active_slide) {
          active_slide.style.pointerEvents = "all";
        }

        setTimeout(() => {
          const new_active_slide = document.querySelector(".carousel__slide--active");
          if (new_active_slide) {
            new_active_slide.style.pointerEvents = "none";
          }
        }, 550);
      }
    }
  },
  computed: {
    ...mapState(useUserStore, ['user'])
  },
  mounted() {
    if (!this.user) {
      this.$router.push("/");
    }

    // make active slide non pointer
    const active_slide = document.querySelector(".carousel__slide--active");
    if (active_slide) {
      active_slide.style.pointerEvents = "none";
    }

    UserService.getActivities().then(
      (response) => {
        this.activities = response.data.data;
        console.log(this.activities)
      }
    );

    UserService.getEventDates().then(
      (response) => {
        this.event_dates = response.data;
        // turn into Date objects
        this.event_dates = this.event_dates.map((date) => new Date(date));
        console.log(this.event_dates)

      },
      (error) => {
        console.log(error);
      }
    );

    

    var now = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );



    for (var i = 0; i < this.event_dates.length; i++) {
      UserService.getActivities(
      ).then(
        (response) => {
          this.activities = this.activities.concat(response.data.data);
          this.loading_activities = false;
          console.log(this.activities)
        },
        (error) => {
          console.log(error);
          this.loading_activities = false;
        }
      );
    }
  },
};
</script>

<style scoped>
.activities {
  background-color: #e6e6e600;
  align-items: start;
}

.arrow-btn {
  width: 0 !important;
  height: 0 !important;
}

.arrow {
  font-size: 10vh !important;
  margin-top: 2.5vh;
}

.day-wrapper {
  vertical-align: middle;
  margin: 0;
  height: 100%;
}

.activities-wrapper {
  height: 82vh;
  overflow-y: auto;
}

.day {
  color: black;
  align-self: center;
  font-size: 9vw;
  font-weight: 600;
  margin: 0;
}

.no-activities-warning {
  margin-top: 16vh;
}

.warning-msg {
  font-size: 2.7vh;
  font-weight: 500;
}

.profile {
  color: #27ade4;
  font-weight: 600;
}

.loading {
  text-align: center;
  margin-top: 35vh;
}

</style>