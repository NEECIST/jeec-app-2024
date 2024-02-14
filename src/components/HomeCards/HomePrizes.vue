<template>
  <div class="today-prizes">
      <template v-if="prizes.img_solo_daily_prize != '' || prizes.img_squad_daily_prize != ''">
        <div class="prizes-container">
          <h2>Today's Prizes</h2>
          <div class="prizes-flex">
            <div v-if="prizes-img_solo_daily_prize != ''" class="prize">
              <h3>Solo</h3>
              <div class="prize-img">
                <img :src="jeec_brain_url + prizes.img_solo_daily_prize" class="activity-img">
              </div>
            </div>
            <div v-if="prizes-img_squad_daily_prize != ''" class="prize">
              <h3>Squad</h3>
              <div class="prize-img">
                <img :src="jeec_brain_url + prizes.img_squad_daily_prize" class="activity-img"> 
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no-prizes">
          <h2>No Prizes today</h2>
        </div>
      </template>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const jeec_brain_url = process.env.VUE_APP_JEEC_BRAIN_URL;

const prizes = ref({
  img_solo_daily_prize: '',
  img_squad_daily_prize: '',
  solo_ranking: '',
  squad_ranking: '',
});
</script>
<style scoped>
.prizes-container h2 {
  font-size: 2.2rem;
  font-family: "Lexend Exa";
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #4cc9f0;
}

.no-prizes {
  padding: 3rem 0;
}
</style>