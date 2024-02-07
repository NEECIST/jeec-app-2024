<template>
  <TheHeader v-if="header" :title="pageName"></TheHeader>
  <TheUserInfo v-if="userPopup" :inert="stateStore.navOpen" variant="home"></TheUserInfo>
  <main :inert="stateStore.navOpen">
    <router-view />
  </main>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
import TheUserInfo from './components/UserCard/TheUserInfo.vue';

import { useStateStore } from '@/stores/StateStore';
const stateStore = useStateStore();

import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const pageName = ref("");
const header = ref(true);
const userPopup = ref(true);

function onRouteChange() {
  pageName.value = route.name;

  if (route.meta.header !== undefined && route.meta.header === false) {
    header.value = false;
  } else {
    header.value = true;
  }

  if (route.meta.userPopup !== undefined && route.meta.userPopup === false) {
    userPopup.value = false;
  } else {
    userPopup.value = true;
  }
};

onMounted(async () => {
  await router.isReady();
  onRouteChange()
  watch(() => route.fullPath, onRouteChange);
});
</script>

<style scoped>
main {
  padding: 0 2ch;
  padding-top: 90px;
  z-index: 1;
  position: relative;
}
</style>