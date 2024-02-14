<template>
  <div class="next-activity">
    <template v-if="nextActivity.name != ''">
      <div class="activity-container">
        <h2>Up Next</h2>
        <div class="activity">
          <div class="activity-info">
            <h3>
              {{ nextActivity.activity_type }}
            </h3>
            <h4>
              {{ nextActivity.name }}
            </h4>
          </div>
          <div class="activity-image radient-border-passthrough">
            <FadeLoop v-if="nextActivity.images.length >= 2" class="image" :image_list="nextActivity.images"></FadeLoop>
            <img class="image" v-else :src="nextActivity.images[0]">
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

import { ref } from 'vue';
import axios from 'axios';
import authHeader from '@/services/auth-header';

const nextActivity = ref({
  name: "",
  start_time: "",
  end_time: "",
  activity_type: "",
  images: [],
});

function getNextActivity() {
  axios
    .get(
      process.env.VUE_APP_JEEC_BRAIN_URL + "/student/next_activity",
      {
        headers: authHeader()
      }
    )
    .then((response) => {
      if (response.data.activity != null) {
        nextActivity.value = response.data.activity
        response.data.activity.images.forEach((image, index) => {
          const bufferArray = [];
          bufferArray.push(process.env.VUE_APP_JEEC_BRAIN_URL + image);

          nextActivity.value.images = bufferArray;
        });
      }
    })
}

getNextActivity();
</script>

<style scoped>
.next-activity {
  --background: radial-gradient(ellipse 150% 150% at 15% 0%, rgba(76, 202, 240, 0.33) 0%, rgba(76, 202, 240, 0.2) 70%, rgba(76, 202, 240, 0) 100%);
}

.activity-container {
  padding: 1rem 0 2rem 0;
}

.activity-container h2 {
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);

  font-family: "Lexend Exa";
  letter-spacing: 4px;
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
  gap: 0.3rem;
}

.activity-info h3 {
  font-family: "Lexend Exa";
  font-size: clamp(1.1rem, 3.5vw, 1.4rem);
}

.activity-info h4 {
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
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

  --border-radius: 50%;
  --background: white;
}

.activity-image::before {
  content: "";
}

.activity-image .image {
  height: 90%;
  width: 90%;
  object-fit: contain;
}

.no-activity {
  padding: 3rem 0;
}
</style>