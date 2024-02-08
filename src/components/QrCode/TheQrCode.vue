<template>
  <div>
    <QRCodeVue3 
      width="200" 
      height="200" 
      :value="userStore.user.student_external_id"
      :image="require('@/assets/jeec_logo_mobile.svg')"
      :imageOptions="{imageSize: 0.7, margin: 2}"
      imgclass="qrcode-image"
      :dotsOptions="{
          type: 'extra-rounded',
          gradient: {
              type: 'linear',
              rotation: 2,
              colorStops: [
                { offset: 0, color: '#4cc9f0' },
                { offset: 1, color: '#7209b7' },
              ],
            },
      }"
      :backgroundOptions="{color: 'white'}"
      :cornersSquareOptions="{type: 'extra-rounded', color: '#6741c8'}"
      :cornersDotOptions="{type: 'square', color: '#6741c8'}"
      alt="Show this QR Code"
    ></QRCodeVue3>
  </div>
</template>

<script setup>
import QRCodeVue3 from "qrcode-vue3";

import { useUserStore } from '@/stores/UserStore';
const userStore = useUserStore();
</script>

<style>
.qrcode-image {
  border-radius: 18px;
}
</style>