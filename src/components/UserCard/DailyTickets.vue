<template>
  <div class="wrapper" :class="variant">
    <!-- <div v-if="variant === 'home'" class="imgs">
      <img :src="require('@/assets/tickets-' + tickets + '.svg')" aria-hidden="true">
    </div> -->
    <div class="bar">
      <p>Tickets</p>
      <!-- <div class="tickets radient-border-passthrough">
        <div class="slot radient-border-passthrough_child"></div>
        <div class="slot radient-border-passthrough_child"></div>
        <div class="slot radient-border-passthrough_child"></div>
        <div class="overlay">
          <div v-for="ticket in tickets" :key="ticket" class="fill"></div>
        </div>
      </div> -->
      <div class="tickets-progress radient-border-passthrough">
        <div class="progress radient-border-passthrough_child" :style="'--progress:' + progress + '%;'"></div>
        <div class="tickets">
          <div 
            v-for="(milestone, index) in userStore.milestones.daily" :key="index"
            :style="'width: ' + milestonePercentages[index] + '% ;'"
            ref="milestonesRef"
            class="ticket"
          >
            <img src="@/assets/tickets-1.svg" aria-hidden="true">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, defineProps, nextTick, onMounted } from 'vue';
import { useUserStore } from '@/stores/UserStore';
const userStore = useUserStore();

const props = defineProps(["variant"]);

const progress = ref(0);
const milestonesRef = ref([]);
const milestonePercentages = ref([])

onMounted(() => {
  watch(() => userStore.milestones.daily, async () => {
    const userPoints = 600;

    const milestones = userStore.milestones.daily.sort(function(a, b) { return a - b; });
    const milestonesMod = [0].concat(milestones); //[0, 50, 550, 1100]

    const progressPercentage = (userPoints / milestones[milestones.length - 1]) * 100;
    progress.value = progressPercentage;

    let milestonePercentage = 0;
    let width = 0;

    await nextTick();

    for (let index = 0; index < milestones.length; index++) {
      if (index == milestones.length - 1) {
        milestonePercentage = 100;
        width = 0;
      } else {
        milestonePercentage = (milestones[index] / milestones[milestones.length - 1]) * 100;
        width = milestonePercentage - ((milestonesMod[index] / milestones[milestones.length - 1]) * 100);
      }

      console.log(index, progressPercentage, milestonePercentage)
      if (progressPercentage >= milestonePercentage) {
        milestonesRef.value[index].classList.add("obtained");
      }
    
      milestonePercentages.value.push(width.toString());  
    }
  });
});

</script>
<style scoped>
  .wrapper {
    width: 100%;
    padding-top: 5px;
    display: flex;
  }
  .imgs {
    display: flex;
    align-items: center;
  }
  .imgs > img {
    width: 40px;
    height: 34px;
    object-fit: contain;
  }
  .bar {
    text-align: right;
    flex-grow: 1;
  }
  .wrapper.profile > .bar{
    text-align: left;
  }
  .wrapper.nav > .bar > p {
    font-size: 1.4rem;
  }
  p {
    font-family: "Lexend Exa";
    font-size: 0.95rem;
  }
  .tickets-progress {
    width: 100%;
    height: 18px;
    position: relative;

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
  .tickets {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
  }
  .ticket {
    width: 33.3333333333%;
    height: 100%;
    position: relative;
  }
  .ticket:nth-child(1){
    width: 5%;
  }
  .ticket:nth-child(2){
    width: 40%;
  }
  .ticket:nth-child(3){
    flex-grow: 1;
  }
  .tickets img {
    height: 160%;
    object-fit: contain;
    position: absolute;
    top: 50%;
    right: 0;
    translate: 50% -50%;
  }
  .ticket.obtained {
    opacity: 0.4;
  }

  @keyframes backgroundSlide {
    0% { background-position: 0% 90%; }
    100% { background-position: 200% 0%; }
  }
  /* .tickets {
    width: 100%;
    display: flex;
    height: 18px;

    --border-background: linear-gradient(110deg, #605ED0, #4CC9F0, #7209B7, #605ED0);
    --border-width: 2px;
  }
  .tickets > .slot {    
    height: 100%;
    width: 33.33333333333333333333333333333%;

    position: relative;
    overflow: hidden;

    background-size: 300% 100%;

    animation-play-state: paused !important;
  }
  .tickets > div:nth-child(1) {
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
  .tickets > div:nth-child(3) {
    border-radius: 0 50px 50px 0;
    padding: 2px 2px 2px 1px;
    background-position: 100%;
    animation: backgroundSlide3 6s linear infinite reverse;
  }
  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 40px;
    display: flex;
    border: var(--border-width) solid transparent;
    overflow: hidden;
    gap: var(--border-width);
  }
  .fill {
    background-color: rgba(0, 0, 0, 0.731);
    width: calc(33.3333333% - (var(--border-width) / 2));
    height: 100%;
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
  }  */
</style>