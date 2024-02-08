<template>
  <div class="jeecpot-rewards" v-if="rewards">

    <carousel :items-to-show="3" :wrap-around="true">
      <Slide v-for="(item, key) in rewards" :key="item" style="margin-bottom:15px; margin-top:15px; overflow:visible; flex-direction:column">
        <!-- <div>
          {{ currentSlide }}
        </div> -->

        <div class="reward-img">
          <img :src="jeec_brain_url + item" class="activity-img">
          <!-- <img :src="item" class="activity-img"> -->
        </div>
        <p v-if="key==0">
          Monday
        </p>
        <p v-if="key==1">
          Tuesday
        </p>
        <p v-if="key==2">
          Wednesday
        </p>
        <p v-if="key==3">
          Thursday
        </p>
        <p v-if="key==4">
          Friday
        </p>
      </Slide>

      <!-- <template #addons="{ currentSlide }">
        {{ currentSlide }}
      </template> -->
    </carousel>

<!--    <div v-for="item in rewards" :key="item">
      {{ item.date }}
      <div class="reward-img">
        <img :src="jeec_brain_url + item.img" class="activity-img">
      </div>
    </div>-->
  </div>
</template>



<script>
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
  name: "DailyPrizes",
  props: {
    rewards: Object,
  },
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
    };
  },
  computed: {},
};
</script>

<style scoped>
.jeecpot-rewards {
  font-weight: 600;
  width: 100vw;
}

.title-container {
  position: relative;
  top: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.individual-title {
  width: 146px;
  height: 34px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;

  color: #03618C;
}

.squads-title {
  width: 94px;
  height: 34px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;

  color: #03618C;
}

.winner-container {
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.winner-box {
  position: relative;
  align-self: center;
  width: 90vw;
  height: 20vh;
  border-radius: 35px;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.prize {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.reward-info {
  position: relative;
  margin-top: 3vw;
  width: 80px;
  height: 24px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  color: #000000;
}

.image {
  border-radius: 50%;

  position: relative;
  width: 12.5vh;
  height: 12.5vh;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.placements {
  position: relative;
  margin-left: -5vw;
  width: 19px;
  height: 59px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 59px;
  /* identical to box height */

  letter-spacing: 0.01em;
}

.reward-img {
  /*align-self: center;*/
  position: relative;
  height: 13vh;
  width: 13vh;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: auto;
  margin-right: auto;
  overflow:visible;
  margin-bottom:10px;
}

.activity-img {
  align-self: right;
  position: relative;
  height: 13vh;
  width: 13vh;
  border: 0.1vh solid white;
  border-radius: 50%;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: auto;
  margin-right: auto;
  object-fit: contain;
  box-shadow: 0px 0px 15px #4CC9F0;
}
</style>