<template>
  <div class="next-activity" :style="{ '--background': backgroundColorWithTransparency, '--border-background': nextActivity.color }">
    <template v-if="nextActivity.name != ''">
      <div class="activity-container">
        <h2>Up Next</h2>
        <div class="activity">
          <div class="activity-info">
            <div class="activity-type">
              <h3 :style="{ color: nextActivity.color }">
                {{ nextActivity.activity_type }}
              </h3>
              <div class="activity-type-icon">
                <img src="../../assets/icons/Union.png" alt="Activity Type Icon">
              </div>
            </div>
            <h4>
              {{ nextActivity.name }}
            </h4>
            <h5>
              {{ nextActivity.location }}
            </h5>
            <p>
              {{nextActivity.day}} | {{ nextActivity.start_time }} - {{ nextActivity.end_time }}
            </p>
          </div>
          <div class="activity-image radient-border-passthrough" :style="{ '--background': 'transparent', '--border-background': nextActivity.color }">
            <div class="circle circle-1 radient-border-passthrough" :style="{ '--background': 'transparent', '--border-background': nextActivity.color }">
              <img class="image"  :src="nextActivity.images[0]">
            </div>
            <div class="circle circle-2 radient-border-passthrough" :style="{ '--background': 'transparent', '--border-background': nextActivity.color }" >
              <img class="image" :src="nextActivity.images[1]">
            </div>
           
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="no-activity">
        <h2>There are no more activities scheduled</h2>
      </div>
    </template>
  </div>
</template>

<script setup>
import FadeLoop from '../FadeLoop.vue';

import { ref, computed } from 'vue';
import axios from 'axios';
import authHeader from '@/services/auth-header';

const nextActivity = ref({
  name: "Intro to Machine Learning",
  location: "Main Stage",
  start_time: "25h00",
  end_time: "26h00",
  day: "February 31",
  activity_type: "Panel",
  images: [
    require('@/assets/logo.png'),
    require('@/assets/plus_sign.png'),
  ],
  color: "#2E55FF"
});

// Computed property to add "A" at the end of the hex color
const backgroundColorWithTransparency = computed(() => {
  return nextActivity.value.color + '1A';
});

// function getNextActivity() {
//   axios
//     .get(
//       process.env.VUE_APP_JEEC_BRAIN_URL + "/student/next_activity",
//       {
//         headers: authHeader()
//       }
//     )
//     .then((response) => {
//       if (response.data.activity != null) {
//         nextActivity.value = response.data.activity
//         response.data.activity.images.forEach((image, index) => {
//           const bufferArray = [];
//           bufferArray.push(process.env.VUE_APP_JEEC_BRAIN_URL + image);

//           nextActivity.value.images = bufferArray;
//         });
//       }
//     })
// }

// getNextActivity();
</script>

<style scoped>
.activity-container {
  padding: 0.5rem 0 0.9rem 0;
}

.activity-container h2 {
  font-size: clamp(1.2rem, 3.1vw, 1.8rem);

  font-family: "Lexend Exa";
  text-transform: uppercase;
}

.activity {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  padding-top: 0.3rem;
}

.activity-info {
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 0 0.5rem 0.5rem;
  gap: 0.3rem;
}

.activity-info h3 {
  font-family: "Lexend Exa";
  font-size: clamp(0.8rem, 3.2vw, 1.1rem);
  font-weight: 700;
  overflow: hidden;
  letter-spacing: 0.05em;

}

.activity-type{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}
.activity-type-icon {
  width:clamp(0.8rem, 3.2vw, 1.1rem);
  height: clamp(0.8rem, 3.2vw, 1.1rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-info h4 {
  font-family: "Lexend Exa";
  font-size: clamp(0.9rem, 3.7vw, 1.3rem);
  font-weight: 400;
  letter-spacing: 0.05em;
}

.activity-info h5 {
  font-family: "Lexend Exa";
  font-size: clamp(0.8rem, 3.1vw, 1.2rem);
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.activity-info p {
  display: flex;
  justify-content: flex-start;
  font-family: "Lexend Exa";
  font-size: clamp(0.4rem, 3.1vw, 0.8rem);
  
}

.activity-image {
  width: 100%;
  min-width: 60px;
  max-width: 80px;
  position: relative;
  align-self: center;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  --border-radius: 50%;
}

.activity-image::before {
  content: "";
}

.activity-image .image {
  height: 90%;
  width: 90%;
  object-fit: contain;
}

.circle {
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  --border-width: 2.0px;
  overflow: hidden;
  --border-radius: 50%;
}

.circle::before {
  content: "";
}

.circle-1 {
  transform: translate(-30%, -30%);
}
.circle-2 {
  transform: translate(30%, 30%);
}

.no-activity {
  padding: 3rem 0;
}
</style>