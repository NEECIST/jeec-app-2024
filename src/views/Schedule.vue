<template>
  <HollowDotsSpinner class="loading-spinner" :animation-duration="1250" :size="65" :color="'white'" />

  <div class="activities invisible">
    <div style="margin-top: 4vh">
      <div class="carousel" style="margin-bottom: 110px;">
        <Carousel ref="schedule_carousel" :mouseDrag="false" :touchDrag="false" :itemsToShow="2.5" :wrapAround="true"
          :transition="500">
          <Slide v-for="(weekday, index) in weekdays" :key="index">
            <button class="main-button radient-border-passthrough" :class="weekday.toLowerCase()"
              style="cursor: pointer; margin-bottom: 10px;"
              @click="carouselSlideEvent($event.target.parentElement.parentElement)">
              <div class="weekday">
                <p style="pointer-events: none;">{{ weekday }}</p>
              </div>
            </button>

            <div class="carousel__item" style="background-color: transparent;">
              <div v-if="!loading_jobfair" class="jobfair radient-border-passthrough">
                <h3 style="font-family: 'Lexend Exa'; margin-bottom: 5px;">Job Fair</h3>
                <p>9:30 - 18:30</p>
                <div class="showcase" style="display: flex;">
                  <FadeLoop class="fadeloop" :image_list="getJobFairImages(weekday)" :alt_list="getJobFairAlt(weekday)"
                    :link_list="getJobFairLinks(weekday)" :index="0" :initial_duration="2200" :duration="3500" :step="3">
                  </FadeLoop>

                  <FadeLoop class="fadeloop" :image_list="getJobFairImages(weekday)" :alt_list="getJobFairAlt(weekday)"
                    :link_list="getJobFairLinks(weekday)" :index="1" :initial_duration="2400" :duration="3500" :step="3">
                  </FadeLoop>

                  <FadeLoop class="fadeloop" :image_list="getJobFairImages(weekday)" :alt_list="getJobFairAlt(weekday)"
                    :link_list="getJobFairLinks(weekday)" :index="2" :initial_duration="2600" :duration="3500" :step="3">
                  </FadeLoop>

                </div>
              </div>
            </div>


            <div class="carousel_item">
              <div class="schedule">
                <div class="line"></div>
                <div v-for="(event, index) in activities" :key="event" class="event">
                  <Event v-if="getWeekday(event.day) == weekday" color="aliceblue" :event="event" :index="weekday + index">
                  </Event>
                </div>
              </div>
            </div>
          </Slide>
          <div class="spacer"></div>
        </Carousel>

      </div>

    </div>

  </div>
</template>

<script>
import Event from "@/components/Event.vue";
import UserService from "../services/user.service";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia'
import { Carousel, Slide } from 'vue3-carousel'
import { HollowDotsSpinner } from 'epic-spinners'
import FadeLoop from "@/components/FadeLoop.vue";

import 'vue3-carousel/dist/carousel.css'

export default {
  name: "Schedule",
  components: {
    HollowDotsSpinner,
    Event,
    Carousel,
    Slide,
    FadeLoop
  },
  data: function () {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      button: "all",
      model: 0,
      jobfair_companies: [],
      activities: [],
      weekdays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      current_day_index: 0,
      carousel_breakpoints: {
        0: { itemsToShow: 2.5 },
        640: { itemsToShow: 3.0 },
        900: { itemsToShow: 4.8 }
      },
      loading_activities: true,
      loading_jobfair: true,
    };
  },
  methods: {
    // get weekday from string format "dd mm yyyy, weekday"
    getWeekday(date) {
      return date.split(", ")[1];
    },

    setCurrentDayIdx(){
      var today = new Date();
      var day = today.getDay();
      this.current_day_index = day - 1;
    },

    goToCurrentDay(){
      // get current day
      var today = new Date();
      var day = today.getDay();
      var day_name = this.weekdays[day-1];
      // go to current day
      this.$refs.schedule_carousel.slideTo(this.weekdays.indexOf(day_name));
      const active_slide = document.querySelector(".carousel__slide--active");
        if (active_slide) {
          active_slide.firstChild.style.pointerEvents = "all";
        }

        // update slide pointer events after transition
        setTimeout(() => {
          const new_active_slide = document.querySelector(".carousel__slide--active");
          if (new_active_slide) {
            new_active_slide.style.pointerEvents = "all";
            new_active_slide.firstChild.style.pointerEvents = "none";
            const next_slide = document.querySelector(".carousel__slide--next");
            if (next_slide) {
              next_slide.style.pointerEvents = "none";
              next_slide.firstChild.style.pointerEvents = "all";
            }

            const weekday = new_active_slide.firstChild.innerText;
            if (weekday.includes("Friday")) {
              next_slide.firstChild.style.pointerEvents = "none";
            }
          }
        }, 550);
    },

    getJobFairImages(weekday) {
      // map jobfair_companies[weekday].logo to their respective weekdays
      if (this.jobfair_companies[weekday] == undefined) {
        return [];
      }

      var jobfair_images = this.jobfair_companies[weekday].filter(function (company) { return company.logo }).map(company => process.env.VUE_APP_JEEC_BRAIN_URL + company.logo);
      return jobfair_images;
    },
    getJobFairLinks(weekday) {
      // map jobfair_companies[weekday].website to their respective weekdays
      if (this.jobfair_companies[weekday] == undefined) {
        return [];
      }

      var jobfair_links = this.jobfair_companies[weekday].filter(function (company) { return company.logo }).map(company => company.link);
      return jobfair_links;
    },
    getJobFairAlt(weekday) {
      // map jobfair_companies[weekday].name to their respective weekdays
      if (this.jobfair_companies[weekday] == undefined) {
        return [];
      }

      var jobfair_alt = this.jobfair_companies[weekday].filter(function (company) { return company.logo }).map(company => company.name);
      return jobfair_alt;
    },
    // onClick weekday element event
    carouselSlideEvent(target) {
      // if clicked element is "next"
      if (target.classList.contains("carousel__slide--next")) {
        // go to next slide
        this.$refs.schedule_carousel.next()

        // make active slide (soon to be prev slide) pointable
        const active_slide = document.querySelector(".carousel__slide--active");
        if (active_slide) {
          active_slide.firstChild.style.pointerEvents = "all";
        }

        // update slide pointer events after transition
        setTimeout(() => {
          const new_active_slide = document.querySelector(".carousel__slide--active");
          if (new_active_slide) {
            new_active_slide.style.pointerEvents = "all";
            new_active_slide.firstChild.style.pointerEvents = "none";
            const next_slide = document.querySelector(".carousel__slide--next");
            if (next_slide) {
              next_slide.style.pointerEvents = "none";
              next_slide.firstChild.style.pointerEvents = "all";
            }

            const weekday = new_active_slide.firstChild.innerText;
            if (weekday.includes("Friday")) {
              next_slide.firstChild.style.pointerEvents = "none";
            }
          }
        }, 550);
        // if clicked element is "prev"  
      } else if (target.classList.contains("carousel__slide--prev")) {
        // go to prev slide
        this.$refs.schedule_carousel.prev()


        // make active slide (soon to be next slide) pointable
        const active_slide = document.querySelector(".carousel__slide--active");
        if (active_slide) {
          active_slide.firstChild.style.pointerEvents = "all";
        }

        // update slide pointer events after transition
        setTimeout(() => {
          const new_active_slide = document.querySelector(".carousel__slide--active");
          if (new_active_slide) {
            new_active_slide.style.pointerEvents = "all";
            new_active_slide.firstChild.style.pointerEvents = "none";
            const next_slide = document.querySelector(".carousel__slide--next");
            if (next_slide) {
              next_slide.style.pointerEvents = "none";
              next_slide.firstChild.style.pointerEvents = "all";
            }
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
      active_slide.firstChild.style.pointerEvents = "none";
    }

    // workaround to make add-to-calendar icon pointable
    const next_slide = document.querySelector(".carousel__slide--next");
    if (next_slide) {
      next_slide.style.pointerEvents = "none";
      next_slide.firstChild.style.pointerEvents = "all";
    }

    // make non loopable slides
    const slide_clones = document.querySelectorAll(".carousel__slide--clone");
    for (let i = 0; i < slide_clones.length; i++) {
      if (slide_clones[i].innerText.includes("Friday") || slide_clones[i].innerText.includes("Monday")) {
        slide_clones[i].style.opacity = 0;
        slide_clones[i].style.pointerEvents = "none";
      }
    }


    UserService.getJobFair().then(
      (response) => {
        this.jobfair_companies = response.data;
        console.log(response.data)
      }
    ).finally(() => {
      this.loading_jobfair = false;

      if (this.loading_activities == false && this.loading_jobfair == false) {
        const loading_spinner = document.querySelector('.loading-spinner');
        const activities = document.querySelector('.activities');
        this.goToCurrentDay()
        loading_spinner.classList.add('invisible');
        activities.classList.remove('invisible');
        activities.classList.add('visible');
      }
    })

    // get activities
    UserService.getActivities().then(
      (response) => {
        this.activities = response.data.data;
        console.log(this.activities)
      }
    ).finally(() => {
      this.loading_activities = false;

      if (this.loading_activities == false && this.loading_jobfair == false) {
        const loading_spinner = document.querySelector('.loading-spinner');
        const activities = document.querySelector('.activities');
        this.goToCurrentDay()
        loading_spinner.classList.add('invisible');
        activities.classList.remove('invisible');
        activities.classList.add('visible');
      }
    })
  },
};
</script>

<style scoped>
.main-button {
  width: calc(100% - 10px);
  margin-left: 5px;
  font-size: 1.3rem;
  padding: 0.3rem;
  border: none;
  cursor: pointer;
  --background: none;
  --border-width: 2px 0 0 0;
  --border-radius: 0 0 0 0;
  height: 40px;
}

.carousel__slide--active .main-button {
  font-size: 1.4rem;
  font-weight: 700;
  --background: radial-gradient(ellipse 60% 120% at 50% 0, #4ccaf032, #7109b70e 90%, #7109b700);
}

.main-button::before {
  content: "";
}

.main-button.monday {
  --border-background: linear-gradient(100deg, #4CC9F0, #5B7EDA);
  --border-radius: 20px 0 0 0;
}

.main-button.tuesday {
  --border-background: linear-gradient(100deg, #5B7EDA, #6A33C3);
}

.main-button.wednesday {
  --border-background: linear-gradient(100deg, #6A33C3, #890EAE);
}

.main-button.thursday {
  --border-background: linear-gradient(100deg, #890EAE, #C11A99);
}

.main-button.friday {
  --border-background: linear-gradient(100deg, #C11A99, #F72585);
  --border-radius: 0 20px 0 0;
}

.activities {
  background-color: #e6e6e600;
  align-items: start;
  overflow-x: visible;
}

.activities.invisible {
  opacity: 0;
}

.activities.visible {
  opacity: 1;
  transition: 1s;
}

.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
}

.loading-spinner.invisible {
  opacity: 0;
  transition: 0.01s;
}

.carousel {
  /* height: 90vh; */
  width: 100%;
  overflow-y: hidden;
}

.carousel__item {
  min-height: 30px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 14px;
  border-radius: 0px;
  padding: 0;
  margin: 0;
  display: -webkit-flex !important;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.carousel__item .schedule {
  position: relative;
}

.carousel__item .jobfair {
  position: relative;
}

.line {
  height: 100%;
  width: 2px;
  position: fixed;
  background-color: white;
  margin-left: 4px;
  margin-top: 1vh;
  opacity: 0;
}

.carousel__slide {
  padding: 0px;
  align-items: start;
  justify-content: start;
  display: -webkit-flex !important;
  display: flex;
  flex-direction: column;
  ;
  transform: rotateY(0);

}

.carousel__track {
  justify-content: safe center;

}

.carousel__icon {
  fill: none;
}

.carousel__slide--prev {
  transform: rotateY(0);
}

.carousel__slide--next {
  transform: rotateY(0);
}



.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

/*  */
.weekday {
  display: -webkit-flex !important;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.weekday p {
  overflow-wrap: normal;
  margin-left: -100%;
  margin-right: -100%;
  text-align: center;
}

.schedule {
  opacity: 0;
}

.jobfair {
  opacity: 0;
  height: 0;
}

.jobfair h2 {
  opacity: 0;
}

.carousel__slide--active .jobfair p {
  font-size: 0.8rem;
  padding: 0.2rem 0;
}


.carousel__slide {
  height: 0;
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
  transition: 0.5s;
  align-items: center;
  height: auto;
}

.carousel__slide--active .line {
  opacity: 1;
}

.carousel__slide--active .spacer {
  height: 100px;
  flex-direction: column;
  flex: 1;
}

.carousel__slide--active .schedule {
  transition: 0.5s;
  opacity: 1;
  width: 85vw;
  /* height: 65vh; */
  overflow-x: hidden;
  overflow: visible;
  max-width: 800px;
}

.carousel__slide--active .jobfair::before {
  content: "";
}

.carousel__slide--active .jobfair {


  --border-radius: 20px;
  --border-width: 2px;
  --background: var(--background_, radial-gradient(ellipse 150% 150% at 15% 0%, rgba(76, 202, 240, 0.3) 0%, rgba(76, 202, 240, 0.2) 70%, rgba(76, 202, 240, 0.1) 100%));
  --border-background: var(--border-background_, linear-gradient(165deg, #605ED0 0%, #4CC9F0 40%, #7209B7 100%));

  --color: white;


  display: -webkit-flex !important;
  display: flex;
  transition: 1s;
  opacity: 1;
  width: 80vw;
  height: 22vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 20px;
  margin-bottom: 20px;

  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 5px;
  padding-right: 5px;

  max-width: 700px;

}

.carousel__slide--active .jobfair h3 {
  opacity: 1;
  transition: 2.5s;
}

.carousel__slide--active .showcase {
  display: -webkit-flex !important;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 13vh;
}

.carousel__slide--active .fadeloop {
  width: 30%;
  height: 100%;
  display: -webkit-flex !important;
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  position: relative;
  transition: 0.5s;
  padding: 10px;
  opacity: 1;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
</style>