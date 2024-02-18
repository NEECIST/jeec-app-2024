<template>
  <div class="today-prizes">
      <template v-if="prizes.individual_prize != null || prizes.squad_prize != null">
        <div class="prizes-container">
          <h2>Today's Prizes</h2>
          <div class="prizes-flex">
            <div v-if="prizes.individual_prize != null" class="prize">
              <h3>Solo</h3>
              <div class="prize-img radient-border-passthrough">
                <img :src="jeec_brain_url + prizes.individual_prize" class="activity-img">
              </div>
            </div>
            <div v-if="prizes.squad_prize != null" class="prize">
              <h3>Squad</h3>
              <div class="prize-img radient-border-passthrough">
                <img :src="jeec_brain_url + prizes.squad_prize" class="activity-img"> 
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
import axios from 'axios';
import authHeader from '@/services/auth-header';

const jeec_brain_url = process.env.VUE_APP_JEEC_BRAIN_URL;

const prizes = ref({
  individual_prize: null,
  squad_prize: null,
});

function getDailyPrizes() {
  axios
    .get(
      process.env.VUE_APP_JEEC_BRAIN_URL + "/student/get_today_rewards",
      {
        headers: authHeader()
      }
    )
    .then((response) => {
      prizes.value = response.data.prizes;
    })
}

getDailyPrizes();

</script>
<style scoped>

.today-prizes h2 {
  font-size: 2rem;
  font-family: "Lexend Exa";
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #4cc9f0;
}

.no-prizes {
  padding: 3rem 0;
}

.prizes-container {
  padding: 1rem;
}

.prizes-flex {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  gap: 5rem;
}

.prize h3 {
  font-family: "Lexend Exa";
  letter-spacing: 3px;
  font-size: 1.3rem;
  color: #4cc9f0;
  padding-bottom: 0.5rem;
}

.prize-img {
  max-width: 100px;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  
  --background: white;
  --border-radius: 50%;
}

.prize-img::before {
  content: "";
}

.prize-img img {
  width: 90%;
  height: 90%;
}

@media screen and (max-width: 450px) {
  .prizes-flex {
    flex-direction: column;
    align-items: center;
  }

  
}
</style>