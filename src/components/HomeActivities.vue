<template>
  <div class="activities">      
      <template v-if="nextActivity.name != ''">
        <h2>Up Next</h2>
        <div class="activity-wrapper">
          <div class="activity-info">
            <p>
              {{ nextActivity.activity_type }}
            </p>
            <h3>
              {{ nextActivity.name }}
            </h3>
            <p class="activity-time">
              {{ nextActivity.start_time }} - {{ nextActivity.end_time }}
            </p>
          </div>
          <div class="activity-image">
            <div v-for="image in nextActivity.images" :key="image" >
              <img :src="jeec_brain_url + image" class="activity-img"
                :class="{ size2: nextActivity.images.length == 2,
                          size3: nextActivity.images.length == 3,
                          size4: nextActivity.images.length >= 4 }"
              >
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
import { ref } from 'vue';
import axios from 'axios';
import authHeader from '@/services/auth-header';

const nextActivity = ref({
  name: "",
  start_time: "",
  end_time: "",
  activity_type: "",
  images: null
});

function getNextActivity(){
  axios
    .get(
      process.env.VUE_APP_JEEC_BRAIN_URL + "/student/next_activity",
      {
        headers: authHeader()
      }
    )
    .then((response) => {
      console.log(response)
      if (response.data.activity != null) {
        nextActivity.value = response.data.activity
      }
    })
}

getNextActivity();
</script>

<style scoped>
.activities {
}
</style>