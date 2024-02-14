<style>
.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
}

.loading-spinner.invisible{
  opacity: 0;
  transition: 0.01s;
}

.carousel{
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .schedule{
    position: relative;
  }
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
  display: flex;
  flex-direction: column;;

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

.carousel__slide{
  height: 0;
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
  transition: 0.5s;
  align-items: center;
  height: auto;

  .schedule {
    transition: 0.5s;
    opacity: 1;
    width: 85vw;
    /* height: 65vh; */
    overflow-x: hidden;
    overflow: visible;
  }

  .line{
    opacity: 1;
  }
  
  .spacer{
    height: 100px;
    flex-direction: column;
    flex: 1;
  }
  
}

</style>



<template>
  <HollowDotsSpinner class="loading-spinner"
  :animation-duration="1250"
  :size="65"
  :color="'white'"
  />

  <div class="activities invisible">
    <div style="margin-top: 4vh">
        <div class="carousel" style="margin-bottom: 110px;">
          <Carousel ref="schedule_carousel" :mouseDrag="false" :touchDrag="false" :itemsToShow="2.5" :wrapAround="true" :transition="500">
            <Slide v-for="(weekday, index) in weekdays" :key="index">
                <button  class="carousel__item" style="cursor: pointer; margin-bottom: 10px;" @click="carouselSlideEvent($event.target.parentElement.parentElement)">
                  <div class="weekday" >
                    <p style="pointer-events: none;">{{ weekday }}</p>
                  </div>
                </button>

                
                <!-- Weekday's Schedule -->
                <div class="carousel_item">
                  <div class="schedule">
                    <div class="line"></div>
                    <div v-for="(event, index) in activities" :key="event" class="event">
                      <h2>ola</h2>
                      <Event v-if="getWeekday(event.day) == weekday" color="aliceblue" :event="event" :index="weekday+index" link="/home"></Event>
                    </div>
                  </div> 
                </div>
            </Slide>
            <div class="spacer"></div>
          </Carousel> 
          
        </div>
        


        <div class="no-activities-warning" style="display: none">
          <span class="warning-msg">Go to your</span>
          <span class="warning-msg profile"> Profile </span>
          <span class="warning-msg">to add Interests!</span>
        </div>
    </div>

  </div>
</template>

<script>
import Event from "@/components/Event.vue";
import UserService from "../services/user.service";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia'
import { Carousel,Slide } from 'vue3-carousel'
import { HollowDotsSpinner } from 'epic-spinners'

import 'vue3-carousel/dist/carousel.css'

export default {
  name: "Schedule",
  components: {
    HollowDotsSpinner,
    Event,
    Carousel,
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
      loading_activities: true,
    };
  },
  methods: {
    // get weekday from string format "dd mm yyyy, weekday"
    getWeekday(date) {
      return date.split(", ")[1];
    },
    // onClick weekday element event
    carouselSlideEvent(target) {
      console.log("click bitch")
      // if clicked element is "next"
      if(target.classList.contains("carousel__slide--next")){
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
              if(next_slide.innerText != "Monday"){
                next_slide.firstChild.style.pointerEvents = "all";
              }
            }
          }
        }, 550);
      // if clicked element is "prev"  
      } else if(target.classList.contains("carousel__slide--prev")){
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
      if (slide_clones[i].innerText == "Friday" || slide_clones[i].innerText == "Monday") {
        slide_clones[i].style.opacity = 0;
        slide_clones[i].style.pointerEvents = "none";
      }
    }
    
    // get activities
    UserService.getActivities().then(
      (response) => {
        this.activities = response.data.data;
        console.log(this.activities)
      }
    ).finally(() => {
      this.loading_activities = false;
      const activities = document.querySelector('.activities');
      const loading_spinner = document.querySelector('.loading-spinner');
      const active_slide = document.querySelector(".carousel__slide--active");

      loading_spinner.classList.add('invisible');
      activities.classList.remove('invisible');
      activities.classList.add('visible');
    })
  },
};
</script>

<style scoped>

.activities {
  background-color: #e6e6e600;
  align-items: start;
  overflow-x: visible;
}

.activities.invisible{
  opacity: 0;
}

.activities.visible{
  opacity: 1;
  transition: 1s;
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


</style>