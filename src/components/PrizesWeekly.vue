<template>
  <div class="jeecpot-rewards" v-if="rewards">
    <div class="reward-container">
      <div v-for="(item,key) in rewards" :key="item.position" class="reward-item">
        <!-- {{ item.position }} -->
        <div class="reward-img" :class="{'small-cnt': key!=1}">
          <img :src="jeec_brain_url + item" class="activity-img" :class="{'big': key==1},{'small': key!=1}">
          <p class="ranking second" v-if="key==0">2<sub>nd</sub></p>
          <p class="ranking first" v-if="key==1">1<sub>st</sub></p>
          <p class="ranking third" v-if="key==2">3<sub>rd</sub></p>
          <!-- <img :src="item" class="activity-img"> -->
        </div>
      </div>
    </div>
  </div>
</template>



<script>

//import { Carousel, Slide } from 'vue3-carousel'
//import 'vue3-carousel/dist/carousel.css'

export default {
  name: "WeeklyPrizes",
  props: {
    rewards: Object,
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
  align-self: center;
  position: relative;
  height: 13vh;
  width: 13vh;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-left:auto;
  margin-right:auto;
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
  margin-left:auto;
  margin-right:auto;
  object-fit: contain;
  margin-left:2vh;
  margin-right:2vh;
  box-shadow: 0px 0px 15px #F72585;
  overflow:visible;
}

.jeecpot-rewards {
  font-weight: 600;
  width: 100vw;
}

.reward-container {
  display: flex; /* Use flexbox to make the items align horizontally */
  justify-content: space-around; /* Adjust as needed */
  flex-wrap: wrap; /* Allow items to wrap to next line if necessary */
  align-items: flex-end;
}

.reward-item {
  margin-bottom: 20px; /* Adjust margin between items */
}

.reward-img {
  align-self: center;
  position: relative;
  height: 13vh;
  width: 13vh;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: auto;
  margin-right: auto;
}

.activity-img {
  align-self: right;
  position: relative;
  border: 0.1vh solid white;
  border-radius: 50%;
  background-color: white;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: auto;
  margin-right: auto;
  object-fit: contain;
  margin-left: 2vh;
  margin-right: 2vh;
} 

.big{
  height: 13vh;
  width: 13vh;
}

.small{
  height: 10vh;
  width: 10vh;
}

.small-cnt{
  top:3vh;
}

.ranking{
  position:relative;
  bottom:4vh;
  left:3vh;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  text-align:center;
  display: table-cell;
  vertical-align: middle;
  box-shadow: 0px 0px 15px #F72585;
}

.first{
  background-color:#C1A875;
}

.second{
  background-color:#CDC9C2;
}
.third{
  background-color:#C9705C;
}
</style>