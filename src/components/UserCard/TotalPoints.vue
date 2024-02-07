<template>
  <div class="wrapper" :class="variant">
    <p>Total</p>
    <div class="points radient-border-passthrough">
      <div class="progress radient-border-passthrough_child" :style="'--progress:' + progress + '%;'"></div>
      <p class="points-total">{{ progress }}%</p>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue';
const props = defineProps(["variant"]);

const progress = ref(40);
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
  p {
    font-family: 'Lexend Exa';
    font-size: 0.95rem;
  }
  .points {
    width: 100%;
    height: 18px;

    --border-background: linear-gradient(130deg, #605ED0, #4CC9F0, #7209B7, #605ED0);
    --border-width: 2px;
  }
  .progress {
    padding-left: calc(var(--border-width) + var(--progress)) !important;
    background-size: 200%;
    background-repeat: repeat;
    animation: backgroundSlide 4s linear infinite reverse;
  }

  .points-total {
    position: relative;
    text-align: left;
    padding-left: 1ch;
    z-index: 2;
  }

  @keyframes backgroundSlide {
    0% { background-position: 0% 90%; }
    100% { background-position: 200% 0%; }
  }
</style>