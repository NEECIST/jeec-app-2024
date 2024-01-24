<template>
  <div class="qrcode">
    <h1 style="text-align: center; margin-bottom: 2vh; margin-top:-20vh; color: white;">Show this code everywhere!</h1>
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
import { useRouter } from 'vue-router'

const router = useRouter()

export default {
  name: "QRCode",
  components: {
    QRCodeVue3,
  },
  data: function () {
    return {
      qr_center_img:require("@/assets/jeec_mobile_white.svg"),
    };
  },
  methods: {
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  mounted() {
    if (!this.user) {
      router.push("/");
    } 
  },
};
</script>

<style scoped>
.qrcode {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;
  background-color: #1F1F1F;
}

.qrcode h1{
  padding-left:15vw;
  padding-right:15vw;
}
</style>
