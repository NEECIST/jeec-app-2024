<template>
  <div class="qrcode">
    <QRCodeVue3 
      width="200" 
      height="200" 
      :value="this.user.student_external_id"
      :image="qr_center_img"
      :imageOptions="{imageSize: 0.7, margin: 8}"
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
      :backgroundOptions="{color: '#1f1f1f'}"
      :cornersSquareOptions="{type: 'extra-rounded', color: '#6741c8'}"
      :cornersDotOptions="{type: 'square', color: '#6741c8'}"
    ></QRCodeVue3>
  </div>
</template>

<script>
import QRCodeVue3 from "qrcode-vue3";
import { useUserStore } from '@/stores/UserStore';
import { mapState } from 'pinia'

export default {
  name: "QRCode",
  components: {
    QRCodeVue3,
  },
  data: function () {
    return {
      qr_center_img: require("@/assets/jeec_mobile_white.svg"),
    };
  },
  methods: {
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
};
</script>

<style scoped>
.qrcode {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
