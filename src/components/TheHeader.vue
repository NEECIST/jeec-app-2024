<template>
  <header>
    <router-link to="/" :inert="stateStore.navOpen">
      <img src="@/assets/jeec_mobile_white.svg" alt="JEEC">
    </router-link>
    <h1>{{ title }}</h1>
    <NavHamburguer></NavHamburguer>
    <NavDrawer></NavDrawer>
  </header>
</template>

<script setup>
import NavHamburguer from "./NavHamburguer.vue";
import NavDrawer from "./NavDrawer.vue";

import { useStateStore } from "@/stores/StateStore";
const stateStore = useStateStore()

import { defineProps } from 'vue';
const props = defineProps(["title"]);
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background-color: var(--color-background);
  box-shadow: 0px 0px 15px var(--color-background);
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 15px;
  z-index: 100;
  position: relative;
}

header h1 {
  text-transform: uppercase;
  color: var(--color-background);
  text-shadow: 0px 0px 15px #4CC9F0, 2px 2px 0 #4CC9F0, 2px -2px 0 #4CC9F0, -2px 2px 0 #4CC9F0, -2px -2px 0 #4CC9F0;  letter-spacing: 2px;
  font-size: clamp(1.5rem, 8vw, 2.3rem);
}
</style>