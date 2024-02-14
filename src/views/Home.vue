<template>
  <div>
    <HomeActivities class="card radient-border-passthrough"></HomeActivities>
    <HomePrizes class="card radient-border-passthrough"></HomePrizes>
    <HomeTip class="card radient-border-passthrough"></HomeTip>
  </div>
</template>

<script setup>
import HomeActivities from '@/components/HomeCards/HomeActivities.vue';
import HomePrizes from '@/components/HomeCards/HomePrizes.vue';
import HomeTip from '@/components/HomeCards/HomeTip.vue';
</script>

<style scoped>
.card {
  --border-radius: 40px;
  --border-width: 2.5px;

  width: 80%;
  max-width: 800px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.4);
  
  padding: 0 2ch;
  margin: 0 auto;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  text-align: center;
}
.card::before {
  content: "";
}

.card:last-child {
  margin-bottom: 120px;
}

@media screen and (max-width: 700px) {
  .card {
    width: 90%;
  }
}

@media screen and (max-width: 500px) {
  .card {
    width: 95%;
  }
}
</style>
