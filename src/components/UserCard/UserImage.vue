<template>
  <router-link to="/profile" class="radient-border-passthrough" :class="variant">
    <!-- <img :src="'data:image/png;base64,' + computedImage" alt="user image"> -->
    <img :src="image" alt="user image">
  </router-link>
</template>
<script setup>
import { defineProps } from 'vue';
import { ref } from 'vue';
const props = defineProps(['image', 'variant']);
const image = ref(require('@/assets/JEEC.png'));

</script>
<style scoped>
  a.profile {
    width: auto;
    height: 100%;
    flex-grow: 1;
  }
  a {
    --border-background: #199CFF;
    --border-width: 1.5px;
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