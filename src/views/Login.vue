<template>
  <div class="wrapper">
    <div class="welcome">
      <h2>Welcome to</h2>
      <img alt="JEEC" src="@/assets/jeec_logo_darkmode.svg" />
    </div>

    <div class="login">
      <p>Login to our Webapp</p>
      <div class="button_wrapper">
        <GoogleLogin :callback="callback" />
        <button @click="loginDev">Login DEV</button>
        <p>v2.297</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useUserStore } from "@/stores/UserStore";
import { decodeCredential } from "vue3-google-login";

import CryptoJS from "crypto-js";


const userStore = useUserStore();

const callback = (response) => {
  const userData = decodeCredential(response.credential);

  // console.log(userData);

  axios
    .post(
      process.env.VUE_APP_JEEC_BRAIN_URL + "/student/redirecturigoogle",
      userData
    )
    .then((response) => {
      const jwt = decrypt(response.data);

      userStore.authUser(jwt);
    });

};

function loginDev(){

  const userData = {
    email: "duarte.d.santos@tecnico.ulisboa.pt",
    name: "Duarte Malta Teixeira Jesus dos Santos",
    picture: "https://lh3.googleusercontent.com/a/ACg8ocKjA1Qo1DFfQJiC7jvDb4u59lYIIXfx2JszEa-SsfQRCijyiQ=s96-c",
  }
  
  axios
    .post(
      process.env.VUE_APP_JEEC_BRAIN_URL + "/student/redirecturigoogle",
      userData
    )
    .then((response) => {
      const jwt = decrypt(response.data);
      userStore.authUser(jwt);
    });
}

function decrypt(code) {
  const master_key = "12345678901234561234567890123456";
  const rawData = atob(code);

  let iv = rawData.substring(0, 16);
  let crypttext = rawData.substring(16);

  iv = CryptoJS.enc.Latin1.parse(iv);
  crypttext = CryptoJS.enc.Latin1.parse(crypttext);

  const key = CryptoJS.enc.Utf8.parse(master_key);

  const plaintextArray = CryptoJS.AES.decrypt({ ciphertext: crypttext }, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const output_plaintext = CryptoJS.enc.Latin1.stringify(plaintextArray);

  return output_plaintext;
}
</script>

<style scoped>
.wrapper {
  height: 100svh;
  display: flex;
  flex-direction: column;
}
.welcome {
  width: 100%;
  padding: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
}
.welcome h2 {
  font-family: 'Lexend Exa', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
}
.welcome img {
  display: block;
  width: 100%;
  object-fit: contain;
  max-width: 300px;
}
.login {
  margin: 0 auto;
  margin-top: 100px;
  width: 90%;
  background-color: var(--color-background-sec);
  border-radius: 20px;
  height: 200px;
  max-width: 300px;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.button_wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -30%;
}

.button_wrapper p {
  padding-top: 0.3rem;
}
.g-btn-wrapper {
  margin: 0 auto;
}

@media screen and (min-width: 500px) {
  .login {
    max-width: 500px;
  }
}

</style>


<!-- <script setup>
import { decodeCredential } from 'vue3-google-login'
import User from "../models/user";
import axios from 'axios';
import authHeader from "@/services/auth-header";
import CryptoJS from 'vue-cryptojs';
import { useStore } from "vuex";

const callback = (response) => {
  // decodeCredential will retrive the JWT payload from the credential
  const userData = decodeCredential(response.credential)
  console.log("Handle the userData", userData)

  axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + "/student/redirecturigoogle", userData, { headers: authHeader() }).then(response => {
    if (response.data != '') {
      console.log("Kono Dio Da!")
      const store = useStore()
      console.log(store)
      // window.location.replace(process.env.STUDENT_APP_URL + "?token=" + response.data);

      if (response.data) {
        store
          .dispatch("auth/login", [
            this.user,
            this.decrypt(response.data),
          ])
          .then(
            () => {
              this.$router.push("/home");
            },
            () => {
              store.dispatch("auth/logout");
            }
          );
      } else if (this.loggedIn) {
        this.$router.push("/home");
      }
    } else {
      window.location.replace(process.env.STUDENT_APP_URL)
    }
  })
}
</script>

<script>
import User from "../models/user";
import axios from 'axios';
import authHeader from "@/services/auth-header";
import CryptoJS from 'vue-cryptojs';


export default {
  name: "Login",
  components: {

  },

  data() {
    return {
      // callback:function name() {},
      user: new User(),
      loading: this.$route.query.token ? true : false,
      token: '',

    }
  },
  computed: {
    // loggedIn() {
    //   return this.$store.state.auth.status.loggedIn;
    // },
  },


  methods: {
    decrypt(code) {
      var master_key = "12345678901234561234567890123456";
      var rawData = atob(code.split("_").join("+"));

      var iv = rawData.substring(0, 16);
      var crypttext = rawData.substring(16);

      crypttext = CryptoJS.enc.Latin1.parse(crypttext);
      iv = CryptoJS.enc.Latin1.parse(iv);
      var key = CryptoJS.enc.Utf8.parse(master_key);

      var plaintextArray = CryptoJS.AES.decrypt(
        { ciphertext: crypttext },
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      var output_plaintext = CryptoJS.enc.Latin1.stringify(plaintextArray);

      return output_plaintext;
    },
  },
  created() {

    console.log('v2.0')
    // console.log(data)
    // if (data != null) {
    //   this.$store
    //     .dispatch("auth/login", [
    //       this.user,
    //       this.decrypt(this.$route.query.token),
    //     ])
    //     .then(
    //       () => {
    //         this.$router.push("/home");
    //       },
    //       () => {
    //         this.$store.dispatch("auth/logout");
    //       }
    //     );
    // } else if (this.loggedIn) {
    //   this.$router.push("/home");
    // }
  },
  mounted() {
    console.log(this.$store);
  },

}

</script> -->