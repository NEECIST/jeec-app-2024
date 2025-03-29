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
          </div>
          <div class="activity-image radient-border-passthrough" :style="{ '--background': backgroundColorWithTransparency, '--border-background': nextActivity.color }">
            <img class="image" :src="nextActivity.images[0]">
          </div>
        </div>
        <div class="activity-time">
          <p>
            {{ nextActivity.start_time }} - {{ nextActivity.end_time }}
          </p>
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
  name: "Creative Writing Workshop",
  start_time: "10:00 AM",
  end_time: "12:00 AM",
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
.next-activity {
  /* Removed CSS variables from here */
}

.activity-container {
  padding: 1rem 0 2rem 0;
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
  padding-top: 1rem;
}

.activity-info {
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.5rem 0 0.5rem 0.5rem;
  gap: 0.05rem;
}

.activity-info h3 {
  font-family: "Lexend Exa";
  font-size: clamp(1.1rem, 3.5vw, 1.4rem);
  color: var(--color-darker-light-blue);
  /* Panel */
  font-weight: 700;

  line-height: 18px;
  /* identical to box height */
  letter-spacing: 0.05em;

}

.activity-type{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
}

.activity-info h4 {
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  letter-spacing: 0.1ch;
}

.activity-time p {
  font-family: "Lexend Exa";
  padding-top: 1rem;
}

.activity-image {
  width: 100%;
  min-width: 70px;
  max-width: 130px;
  align-self: center;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  --border-radius: 50%;
  --background: white;
}

.activity-image::before {
  content: "";
}

.activity-image .image {
  height: 70%;
  width: 60%;
  object-fit: contain;
}

.no-activity {
  padding: 3rem 0;
}
</style>