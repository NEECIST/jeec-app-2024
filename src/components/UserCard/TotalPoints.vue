<template>
  <div class="wrapper" :class="variant">
    <p>JEECPOT</p>
    <div class="points radient-border-passthrough">
      <div class="progress radient-border-passthrough_child" :style="'--progress:' + progress + '%;'"></div>
      <p v-if="progress >= 100" class="points-total">Eligible!</p>
      <p v-else class="points-total">{{ progress }}%</p>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, defineProps } from 'vue';
import { useUserStore } from '@/stores/UserStore';
const userStore = useUserStore();

const props = defineProps(["variant"]);

const progress = ref(0);

function getProgress() {
  const userTotalPoints = userStore.userPoints.total_points;

  const milestone = userStore.milestones.final;
  
  const progressPercentage = (userTotalPoints / milestone) * 100;
  
  if (progressPercentage > 100) {
    progress.value = 100
  } else {
    progress.value = progressPercentage.toFixed(2);
  }
};

watch(() => userStore.userPoints, () => {
  if (userStore.milestones.final != 0) {
    getProgress();
  } else {
    setTimeout(() => {
      getProgress();
    }, 2000);
  }
});
</script>
<style scoped>
  .wrapper {
    width: 100%;
    text-align: right;
    padding-top: 1px;
  }
  .wrapper.profile {
    text-align: left;
  }
  .wrapper.nav > p {
    font-size: 1.4rem;
  }
  .wrapper.profile > p {
    font-size: clamp(1rem, 4.5vw, 1.2rem);
    padding-bottom: 0.1rem;
  }
  p {
    font-family: 'Lexend Exa';
    font-size: 0.95rem;
  }
  .wrapper.profile > .points {
    height: 23px;
  }
  .points {
    width: 100%;
    height: 18px;
    overflow: hidden;

    --border-background: linear-gradient(130deg, #605ED0, #4CC9F0, #7209B7, #605ED0);
    --border-width: 2px;
    --border-radius: 50px
  }
  .progress {
    padding-left: calc(var(--border-width) + var(--progress)) !important;
    background-size: 200%;
    background-repeat: repeat;
    animation: backgroundSlide 4s linear infinite reverse;
    animation-delay: 1.5s;
  }

  .points-total {
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    text-align: left;
    padding-left: 1ch;
    z-index: 2;
  }

  @keyframes backgroundSlide {
    0% { background-position: 0% 90%; }
    100% { background-position: 200% 0%; }
  }
</style>