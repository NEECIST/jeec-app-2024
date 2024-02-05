<template>
  <TheHeader v-if="header" :title="pageName"></TheHeader>
  <main :inert="stateStore.navOpen">
    <router-view />
  </main>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';

import { useStateStore } from '@/stores/StateStore';
const stateStore = useStateStore();

import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const pageName = ref("");
const header = ref(true);

function onRouteChange() {
  pageName.value = route.name;
  const showHeader = route.meta.header;
  console.log(showHeader)

  if (showHeader != undefined && showHeader == false) {
    header.value = false;
  } else {
    header.value = true;
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
  z-index: 1;
  position: relative;
}
</style>