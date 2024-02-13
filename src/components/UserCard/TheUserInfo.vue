<template>
  <div :class="variant, {'radient-border-passthrough': variant === 'home'}" class="user-card">
    <div :class="variant" class="name-wrapper" v-if="variant != 'home'">
      <p>{{ userStore.user.name }}</p>
    </div>
    <div :class="variant" class="qr-wrapper" v-if="variant == 'home'">
      <QrCodeButton></QrCodeButton>
    </div>
    <div :class="variant" class="tickets-wrapper">
      <DailyTickets :variant="variant"></DailyTickets>
    </div>
    <div :class="variant" class="points-wrapper">
      <TotalPoints :variant="variant"></TotalPoints>
    </div>
    <div :class="variant" class="user-wrapper">
      <UserImage :image="userStore.user.picture"></UserImage>
    </div>
  </div>
</template>
<script setup>
import QrCodeButton from './QrCodeButton.vue';
import DailyTickets from './DailyTickets.vue';
import TotalPoints from './TotalPoints.vue';
import UserImage from './UserImage.vue';

import { useUserStore } from '@/stores/UserStore';
const userStore = useUserStore();

userStore.getMilestones();

import { defineProps } from 'vue';

const props = defineProps({
  variant: {
    default: "nav"
  }
});
</script>
<style scoped>
  .user-card.home {
    --height: 90px;
    
    --border-radius: 45px;
    --border-width: 2px;

    grid-template-areas:
    "qr tickets user"
    "qr points user";
    grid-template-rows: min-content 1fr;
    grid-template-columns: var(--height) 1fr var(--height);
    position: fixed;
    bottom: 10px;
    width: calc(100% - 20px);
    right: 10px;
    height: 90px;
    max-width: 450px;
    z-index: 50;
  }
  .user-card.home::before {
    content: "";
  }
  .qr-wrapper.home {
    padding: 17px;
  }
  .tickets-wrapper.home {
    padding-right: 5px;
    margin-left: -5px;
  }
  .points-wrapper.home {
    padding-right: 5px;
    margin-left: -5px;
  }
  .user-wrapper.home {
    padding: 8px;
  }

  .user-card.nav {
    grid-template-areas:
    "name name"
    "tickets user"
    "points user";
    grid-template-rows: min-content 1fr 1fr;
    grid-template-columns: 1fr max-content;
    width: 100%;
    height: 150px;
    padding-right: 1rem;
    padding-left: clamp(10px, 5vw, 70px);
  }
  .name-wrapper.nav > p{
    font-family: "Lexend Exa";
    font-weight: 500;
    font-size: 1.6rem;
    padding-bottom: 0.5rem;
  }
  .qr-wrapper.nav {
    padding: 17px;
  }
  .tickets-wrapper.nav {
    padding-right: 5px;
    padding-left: 10%;
  }
  .points-wrapper.nav {
    padding-right: 5px;
  }
  .user-wrapper.nav {
    padding: 8px;
  }
  .user-card.profile {
    grid-template-areas:
    "name user"
    "tickets user"
    "points points";
    grid-template-rows: 50px 50px 50px;
    grid-template-columns: 1fr 70px;
  }
  .user-card {
    display: grid;
  }
  .name-wrapper {
    grid-area: name;
    text-align: right;
  }
  .qr-wrapper {
    grid-area: qr;
  }
  .tickets-wrapper {
    grid-area: tickets;
  }
  .points-wrapper {
    grid-area: points;
  }
  .user-wrapper {
    grid-area: user;
  }

  @media screen and (max-width: 850px) {
    .user-card.home {
      left: 50%;
      translate: -50% 0;
    }
  }
</style>