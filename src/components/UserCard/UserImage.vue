<template>
  <router-link to="/profile" class="radient-border-passthrough" :class="variant">
    <img :src="'data:image/png;base64,' + image" alt="user image">
  </router-link>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps(['image', 'variant']);
</script>
<style scoped>
  a.profile {
    width: auto;
    height: 100%;
  }
  a {
    --border-background: linear-gradient(135deg, #605ED0 0%, #4CC9F0 40%, #7209B7 100%);
    --border-width: 2px;
    --border-radius: 50%;

    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    display: block;
  }
  a::before {
    content: "";
  }
  a img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>