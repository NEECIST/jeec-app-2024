<template>
  <div class="rewards">


    <div class="main-button-container">
      <button  @click.stop="click_daily()" class="main-button" style="border-top-left-radius:20px">
        Daily
      </button>
      <button @click.stop="click_week()" class="main-button" style="border-top-right-radius:20px">
        Week
      </button>
    </div>

    <div v-if="daily">
      <div>
        <p class="prize-title daily">SOLO PRIZES</p>

        <DailyPrizes :rewards="images.solo_daily_prizes" />
      </div>
      <!-- {{ weekly }} -->
      <div>
        <p class="prize-title daily">SQUAD PRIZES</p>

        <DailyPrizes :rewards="images.squad_daily_prizes" />
      </div>
    </div>
    <div v-else>

      <div>
        <p class="prize-title weekly">JEECPOT</p>

        <WeeklyPrizes :rewards="images.jeecpot_prizes" />
      </div>
      <!-- {{ weekly }} -->
      <div>
        <p class="prize-title weekly">SOLO PRIZES</p>

        <WeeklyPrizes :rewards="images.solo_prizes" />
      </div>
      <div>
        <p class="prize-title weekly">SQUAD PRIZES</p>

        <WeeklyPrizes :rewards="images.squad_prizes" />
      </div>
    </div>



  </div>
</template>

<script>

import SquadRewards from "@/components/SquadRewards.vue";
import DailyPrizes from "@/components/DailyPrizes.vue";
import WeeklyPrizes from "@/components/WeeklyPrizes.vue";
import { mapState } from 'pinia'
import { usePrizeStore } from "@/stores/PrizeStore";
import image from "@/assets/profile.jpg"

export default {
  name: "Prizes",
  components: {

    SquadRewards,
    DailyPrizes,
    WeeklyPrizes,

  },
  data: function () {
    return {
      daily: true,
      images:{
          solo_daily_prizes: [image,image,image,image,image],
          squad_daily_prizes: [image,image,image,image,image],
          jeecpot_prizes: [image,image,image],
          squad_prizes: [image,image,image],
          solo_prizes: [image,image,image],
        },
    };
  },
  computed: {
    ...mapState(usePrizeStore, ['images_']),
  },
  methods: {
    click_daily() {
      this.daily = true;
    }, click_week() {
      this.daily = false;
    }
  },
};
</script>

<style scoped>
.main-button-container{
  display:flex;
  justify-content:space-around;
}
.main-button{
  width:45vw;
  background:none;
  border-left:none;
  border-right:none;
  font-size:20px;
}

.prize-title{
  text-align:center;
  font-size:30px;
  font-weight: bold;
  letter-spacing:5px;
  overflow:visible;
}

.weekly{
  color:#F72585;
  text-shadow: 0px 0px 15px #F72585;
  margin-bottom:10px;
}

.daily{
  color:#4CC9F0;
  text-shadow: 0px 0px 15px #4CC9F0;
}
</style>