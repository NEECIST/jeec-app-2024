<template>
  <div class="wrapper" :class="variant">
    <p>Tickets</p>
    <div class="tickets radient-border-passthrough">
      <div class="radient-border-passthrough_child"></div>
      <div class="radient-border-passthrough_child"></div>
      <div class="radient-border-passthrough_child"></div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps(["variant"]);
</script>
<style scoped>
  .wrapper {
    width: 100%;
    text-align: right;
    padding-top: 3px;
  }
  .wrapper.profile {
    text-align: left;
  }
  .wrapper.nav > p {
    font-size: 1.4rem;
  }
  p {
    font-family: "Lexend Exa";
    font-size: 0.95rem;
  }
  .tickets {
    width: 100%;
    display: flex;
    height: 18px;

    --border-background: linear-gradient(170deg, #605ED0, #4CC9F0, #7209B7, #605ED0);
    --border-width: 2px;
  }
  .tickets > div {    
    height: 100%;
    width: 33.333%;

    position: relative;
    overflow: hidden;

    background-size: 300% 100%;

    animation-play-state: paused !important;
  }
  .tickets > div:first-child {
    border-radius: 50px 0 0 50px;
    padding: 2px 1px 2px 2px;
    background-position: 0%;
    animation: backgroundSlide1 6s linear infinite reverse;
  }
  .tickets > div:nth-child(2) {
    border-radius: 0;
    padding: 2px 1px 2px 1px;
    background-position: 50%;
    animation: backgroundSlide2 6s linear infinite reverse;
  }
  .tickets > div:last-child {
    border-radius: 0 50px 50px 0;
    padding: 2px 2px 2px 1px;
    background-position: 100%;
    animation: backgroundSlide3 6s linear infinite reverse;
  }
  .white {
    width: 100%;
    height: 100%;
    background-color: white;
    position: absolute;
    left: 0;
  }

  @keyframes backgroundSlide1 {
    0% { background-position: 0% 0%; }
    100% { background-position: 300% 0%; }
  }
  @keyframes backgroundSlide2 {
    0% { background-position: 50% 0%; }
    100% { background-position: 350% 0%; }
  }
  @keyframes backgroundSlide3 {
    0% { background-position: 100% 0%; }
    100% { background-position: 400% 0%; }
  }
</style>