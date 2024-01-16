<template>
  <!-- Property of Duarte Santos -->
  <div class="personal-reward" >
    <div style="height:  auto;">
      <img src="../assets/roadmap.svg" class="roadmap"/>
      <div class="prizes" style="position: absolute; top: 9%; left: 8%" v-if="levels[0]">
        <img  :class="[{current_prize_img: currentLevel(1)}, {prize_img: !currentLevel(1)}]" 
              :src="jeec_brain_url + levels[0].reward.image"/>
        <div class="prize-name-box">
          <p :class="[{current_prize_name: currentLevel(1)}, {prize_name: !currentLevel(1)}]">{{ '1. ' + levels[0].reward.name }} <br>{{ levels[0].end_points }}XP</p>
        </div>
      </div>
      <div class="prizes" style="position: absolute; top: 12%; left: 64%" v-if="levels[1]">
        <img :class="[{current_prize_img: currentLevel(2)}, {prize_img: !currentLevel(2)}]" 
             :src="jeec_brain_url + levels[1].reward.image"/>
        <div class="prize-name-box">
          <p :class="[{current_prize_name: currentLevel(2)}, {prize_name: !currentLevel(2)}]">{{ '2. ' + levels[1].reward.name }}<br>{{ levels[1].end_points }}XP</p>
        </div>
      </div>
      <div class="prizes" style="position: absolute; top: 24%; left: 15%" v-if="levels[2]">
        <img :class="[{current_prize_img: currentLevel(3)}, {prize_img: !currentLevel(3)}]"
             :src="jeec_brain_url + levels[2].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(3)}, {prize_name: !currentLevel(3)}]">{{ '3. ' + levels[2].reward.name }}<br>{{ levels[2].end_points }}XP</p>
      </div>
      <div class="prizes" style="position: absolute; top: 27%; left: 52%" v-if="levels[3]">
        <img :class="[{current_prize_img: currentLevel(4)}, {prize_img: !currentLevel(4)}]"
             :src="jeec_brain_url + levels[3].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(4)}, {prize_name: !currentLevel(4)}]">{{ '4. ' + levels[3].reward.name }}<br>{{ levels[3].end_points }}XP</p>
      </div>
      <div class="prizes" style="position: absolute; top: 40%; left: 59%" v-if="levels[4]">
        <img :class="[{current_prize_img: currentLevel(5)}, {prize_img: !currentLevel(5)}]"
             :src="jeec_brain_url + levels[4].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(5)}, {prize_name: !currentLevel(5)}]">{{ '5. ' + levels[4].reward.name }}<br>{{ levels[4].end_points }}XP</p>
      </div>
      <div class="prizes" style="position: absolute; top: 48%; left: 10%" v-if="levels[5]">
        <img :class="[{current_prize_img: currentLevel(6)}, {prize_img: !currentLevel(6)}]"
             :src="jeec_brain_url + levels[5].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(6)}, {prize_name: !currentLevel(6)}]">{{ '6. ' + levels[5].reward.name }}<br>{{ levels[5].end_points }}XP</p>
      </div>
      <div class="prizes" style="position: absolute; top: 54%; left: 40%" v-if="levels[6]">
        <img :class="[{current_prize_img: currentLevel(7)}, {prize_img: !currentLevel(7)}]"
             :src="jeec_brain_url + levels[6].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(7)}, {prize_name: !currentLevel(7)}]">{{ '7. ' + levels[6].reward.name }}<br>{{ levels[6].end_points }}XP</p>
      </div>
      <div class="prizes" style="position: absolute; top: 66%; left: 59%" v-if="levels[7]">
        <img :class="[{current_prize_img: currentLevel(8)}, {prize_img: !currentLevel(8)}]"
             :src="jeec_brain_url + levels[7].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(8)}, {prize_name: !currentLevel(8)}]">{{ '8. ' + levels[7].reward.name }}<br>{{ levels[7].end_points }}XP</p>
      </div>
      <div class="prizes" style="position: absolute; top: 71%; left: 8%" v-if="levels[8]">
        <img :class="[{current_prize_img: currentLevel(9)}, {prize_img: !currentLevel(9)}]"
             :src="jeec_brain_url + levels[8].reward.image"/>
        <p :class="[{current_prize_name: currentLevel(9)}, {prize_name: !currentLevel(9)}]">{{ '9. ' + levels[8].reward.name }}<br>{{ levels[8].end_points }}XP</p>
      </div>
      <div class="prizes" style="flex-direction: row; align-items: center; position: absolute; top: 84%; left: 30%" v-if="levels[9]">
        <img :class="[{current_prize_img: currentLevel(10)}, {prize_img: !currentLevel(10)}]"
             :src="jeec_brain_url + levels[9].reward.image" style="width: calc(7.5vh + 20vw); height: calc(7.5vh + 20vw);"/>
        <p :class="[{current_prize_name: currentLevel(10)}, {prize_name: !currentLevel(10)}]">{{ '10. ' + levels[9].reward.name }}<br>{{ levels[9].end_points }}XP</p>
      </div>
    </div>
  </div>
</template>

<script>
// import Expbar from "@/components/Expbar.vue";

export default {
  name: "PersonalRewards",
  components: {
    // Expbar,
  },
  props: {
    levels: Array,
    user_points: Number,
    user_level: Number,
  },
  data() {
    return {
      jeec_brain_url: process.env.VUE_APP_JEEC_BRAIN_URL,
      xpbar_width: "65vw",
      height: 30,
    };
  },
  methods: {
    currentLevel(level){
      if(level == this.user_level){
        return true;
      }
      return false;
    },
    image_index(i) {
      return (i + this.levels.length) % this.levels.length;
    },
    resize() {
      if (window.innerWidth < 1100) {
        this.xpbar_width = "65vw";
      } else {
        this.xpbar_width = "40vw";
      }

      if (window.innerWidth < 600) {
        this.height = 30;
      } else if (window.innerWidth < 1100) {
        this.height = 35;
      } else if (window.innerWidth < 1500) {
        this.height = 45;
      } else {
        this.height = 60;
      }
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  created() {
    window.addEventListener("resize", this.resize);

    this.resize();
  },
};
</script>

<style scoped>
.personal-reward {
  font-weight: 600;
  height: auto;
  width: 100vw;
}

.roadmap{
  width: calc(15vh + 50vw);
  display: block;
  position: relative;
  left: calc(50vw - 7.5vh - 25vw);
  padding-top: 8vh;
  padding-bottom: calc(8vh + 20vw);
}

.prizes{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align:center;
}

.prize_img{
  z-index: 1;
  border-radius: 50%;

  position: relative;
  width: calc(5vh + 15vw);
  height: calc(5vh + 15vw);

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border:  3px solid #1A9CD8;
}

.current_prize_img{
  z-index: 1;
  border-radius: 50%;

  position: relative;
  width: calc(5vh + 15vw);
  height: calc(5vh + 15vw);

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border:  3px solid #D9D004;
}

.prize-name-box{
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
}

.prize_name{
  padding: 0.5vh;
  color: #1A9CD8;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 2vh;
  line-height: 24px;
  letter-spacing: 0.01em;
  background-color: #DDEDF3;
  border: 3px solid #1A9CD8;
  border-radius: 35px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.current_prize_name{
  padding: 0.5vh;
  color: #D9D004;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 2vh;
  line-height: 24px;
  letter-spacing: 0.01em;
  background-color: #F7F3C7;
  border: 3px solid #D9D004;
  border-radius: 35px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

@media screen and (max-width: 1100px) {
  .first,
  .third,
  .rect,
  .other-points,
  .browser {
    display: none;
  }
}
</style>
