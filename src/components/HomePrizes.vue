<template>
  <div class="prizes">
      <template v-if="prizes.img_solo_daily_prize != '' || prizes.img_squad_daily_prize != ''">
        <h2>Today's Prizes</h2>
        <div class="prizes-wrapper">
          <div class="prize">
            <h3>Solo</h3>
            <div class="reward-img">
              <img :src="process.env.VUE_APP_JEEC_BRAIN_URL + prizes.img_solo_daily_prize" class="activity-img">
            </div>
          </div>
          <div class="prize">
            <h3>Squad</h3>
            <div class="reward-img">
              <img :src="process.env.VUE_APP_JEEC_BRAIN_URL + prizes.img_squad_daily_prize" class="activity-img"> 
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

const prizes = ref({
  img_solo_daily_prize: '',
  img_squad_daily_prize: '',
  solo_ranking: '',
  squad_ranking: '',
});
</script>
<style scoped>
.prizes {
}
</style>