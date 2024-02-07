<template>
  <div>
    <h1>Show this code everywhere!</h1>
    <TheQrCode></TheQrCode>
  </div>
</template>
<script setup>
import TheQrCode from "@/components/QrCode/TheQrCode.vue"
</script>
<style scoped>
  h1 {
    margin: 0 auto;
    width: fit-content;
    padding-top: 4rem;
    padding-bottom: 3rem;
  }
</style>