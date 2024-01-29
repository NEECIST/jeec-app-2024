<template>
  <TheHeader v-if="header" :title="pageName"></TheHeader>
  <main>
    <router-view/>
  </main>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';

import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const pageName = ref("");
const header = ref(true);

function onRouteChange() {
  pageName.value = route.name;

  if (route.meta.header != undefined && route.meta.header == false) {
    header.value = false;
  } else {
    header.value = true;
  }
};

onRouteChange();
watch(() => route.fullPath, onRouteChange);
</script>

<style scoped>
main {
  padding: 0 2ch;
}
</style>