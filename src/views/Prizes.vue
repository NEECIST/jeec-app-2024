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

        <PrizesDaily :rewards="images.individual_daily_rewards" v-if="ready" />
      </div>
      <!-- {{ weekly }} -->
      <div>
        <p class="prize-title daily">SQUAD PRIZES</p>

        <PrizesDaily :rewards="images.squad_daily_rewards" v-if="ready"/>
      </div>
    </div>
    <div v-else>

      <div>
        <p class="prize-title weekly">JEECPOT</p>

        <PrizesWeekly :rewards="images.jeecpot" v-if="ready"/>
      </div>
      <!-- {{ weekly }} -->
      <div>
        <p class="prize-title weekly">SOLO PRIZES</p>

        <PrizesWeekly :rewards="images.individual_weekly_rewards" v-if="ready"/>
      </div>
      <div>
        <p class="prize-title weekly">SQUAD PRIZES</p>

        <PrizesWeekly :rewards="images.squad_weekly_rewards" v-if="ready"/>
      </div>
    </div>



  </div>
</template>

<script>
import PrizesDaily from "@/components/PrizesDaily.vue";
import PrizesWeekly from "@/components/PrizesWeekly.vue";
import { mapState } from 'pinia'
import { usePrizeStore } from "@/stores/PrizeStore";
// import image from "@/assets/profile.jpg"

export default {
  name: "Prizes",
  components: {
    PrizesDaily,
    PrizesWeekly,
  },
  data: function () {
    return {
      daily: true,
      ready:false,
      // images:{
      //     solo_daily_prizes: [image,image,image,image,image],
      //     squad_daily_prizes: [image,image,image,image,image],
      //     jeecpot_prizes: [image,image,image],
      //     squad_prizes: [image,image,image],
      //     solo_prizes: [image,image,image],
      //   },
    };
  },
  computed: {
    ...mapState(usePrizeStore, ['images']),
  },
  methods: {
    click_daily() {
      this.daily = true;
    }, 
    click_week() {
      this.daily = false;
    },
  },
  watch:{
    images(){
      this.ready=true;
      console.log(this.images);
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