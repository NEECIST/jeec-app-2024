<template>
  <div class="qrcode">
    <h1 style="text-align: center; margin-bottom: 2vh; margin-top:-20vh">Show this code everywhere!</h1>
    <center>
      <qrcode-vue :size="qrcode_size" :value="external_id"></qrcode-vue>
    </center>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import axios from 'axios';

export default {
  name: "QRCode",
  components: {
    QrcodeVue,
  },
  data: function () {
    return {
      qrcode_size: 200,
      external_id: ''
    };
  },
  methods: {
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/student/istid-externalid', 
      {student_ist_id: this.currentUser.ist_id})
         .then((response) => {
          const data = response.data; // [{}, {}]
          this.external_id = data.external_id;
        });   
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
}

.qrcode h1{
  padding-left:15vw;
  padding-right:15vw;
}
</style>
