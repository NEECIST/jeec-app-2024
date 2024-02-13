<template>
  <div class="rewards">


    <div class="main-button-container">
      <button  @click.stop="click_daily()" class="main-button radient-border-passthrough" :class="{active: daily}">
        Daily
      </button>
      <button @click.stop="click_week()" class="main-button radient-border-passthrough" :class="{active: !daily}">
        Week
      </button>
    </div>
    <section class="prizes-section">
      <template v-if="daily">
        <div>
          <h2 class="prize-title daily">SOLO PRIZES</h2>
          <PrizesDaily :rewards="images.individual_daily_rewards" />
        </div>
        <div>
          <h2 class="prize-title daily">SQUAD PRIZES</h2>
          <PrizesDaily :rewards="images.squad_daily_rewards"/>
        </div>
      </template>
      <template v-else>
        <div>
          <h2 class="prize-title weekly main-prize">JEECPOT</h2>
          <PrizesWeekly :rewards="images.jeecpot"/>
        </div>
        <div>
          <h2 class="prize-title weekly">SOLO PRIZES</h2>
          <PrizesWeekly :rewards="images.individual_weekly_rewards"/>
        </div>
        <div>
          <h2 class="prize-title weekly">SQUAD PRIZES</h2>
          <PrizesWeekly :rewards="images.squad_weekly_rewards"/>
        </div>
      </template>
    </section>
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
  }
};
</script>

<style scoped>
.main-button-container{
  display:flex;
  justify-content:space-around;
  max-width: 500px;
  margin: 0 auto;
  gap: 10px;
}
.main-button{
  width: 100%;
  font-size: 1.3rem;
  padding: 0.3rem;
  border: none;
  cursor: pointer;
  --background: none;
  --border-width: 2px 0 0 0;
}
.main-button:first-of-type {
  --border-background: linear-gradient(100deg, #4CC9F0, #7209B7);
  --border-radius: 20px 0 0 0;
}
.main-button:last-of-type {
  --border-background: linear-gradient(100deg, #7209B7, #F72585);
  --border-radius: 0 20px 0 0;
}
.main-button.active {
  font-size: 1.4rem;
  font-weight: 700;
  --background: radial-gradient(ellipse 60% 120% at 50% 0, #4ccaf032, #7109b70e 90%, #7109b700);
}
.main-button::before {
  content: "";
}

.prizes-section {
  padding-bottom: 130px;
}

.prize-title{
  text-align:center;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing:5px;
  overflow:visible;
  font-family: "Lexend Exa";
  letter-spacing: 3px;
  padding-top: 4rem;
  padding-bottom: 1rem;
}

.prize-title.main-prize {
  font-size: 2.4rem;
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