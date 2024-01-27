<template>
  <div class="login">
    <div class="loading">
      <div class="loading-top">
        <v-img alt="JEEC logo" src="@/assets/jeec_colour_no_edition.svg" />
      </div>

      <div class="buttons-flex">

        <GoogleLogin :callback="callback" />
        <p>v2.1</p>

      </div>

    </div>

  </div>
</template>

<script setup>
import axios from 'axios';
import { useUserStore } from '@/stores/UserStore';
// import { usePrizesStore } from '@/stores/PrizesStore';
// import { useNewActivityStore } from '@/stores/NewActivityStore';
import { decodeCredential } from 'vue3-google-login'
import CryptoJS from 'crypto-js';

const userStore = useUserStore();
// const userStore2 = useNewActivityStore();
// const userStore3 = usePrizesStore();

const callback = (response) => {
  const userData = decodeCredential(response.credential)

  console.log(userData)

  axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + "/student/redirecturigoogle", userData)
    .then((response) => {
      const jwt = decrypt(response.data)

      userStore.authUser(jwt)
      userStore.authUser2(jwt)
      userStore.authUser3(jwt)
      // userStore2.authUser(jwt)
      // userStore3.authUser(jwt)
    })
}

function decrypt(code) {
  const master_key = "12345678901234561234567890123456";
  const rawData = atob(code);

  let iv = rawData.substring(0, 16);
  let crypttext = rawData.substring(16);

  iv = CryptoJS.enc.Latin1.parse(iv);
  crypttext = CryptoJS.enc.Latin1.parse(crypttext);

  const key = CryptoJS.enc.Utf8.parse(master_key);

  const plaintextArray = CryptoJS.AES.decrypt(
    { ciphertext: crypttext },
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const output_plaintext = CryptoJS.enc.Latin1.stringify(plaintextArray);

  return output_plaintext;
};
</script>

<!-- <script setup>
import { decodeCredential } from 'vue3-google-login'
import User from "../models/user";
import axios from 'axios';
import authHeader from "../services/auth-header";
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
import authHeader from "../services/auth-header";
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

<style scoped>
.login {
  height: 100vh;
  width: 100vw;
  transform: translateY(-10vh);
}

.loading {
  background-color: #f1f1f1;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.loading-top {
  width: 75vw;
  position: absolute;
  top: 20%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.loading-bar {
  position: absolute;
  top: 55%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.buttons-flex {
  width: 100%;
  padding: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 55%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.button {
  height: 13vw;
  display: flex;
  align-items: center;
  border-radius: 6vw;
  padding: 5vw;
  margin: 2vw;
  color: #ffffff;
  font-size: 4.5vw;
  font-weight: 650;
  cursor: pointer;
}

.icon {
  padding-right: 5vw;
  height: 7vw;
}

.loading-bottom {
  width: 32vw;
  position: absolute;
  top: 90%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

@media screen and (min-width: 550px) {
  .loading-top {
    width: 56vh;
  }

  .buttons-flex {
    padding: 0vh;
  }

  .button {
    height: 9.5vh;
    border-radius: 6vh;
    padding: 4vh;
    margin: 2vh;
    font-size: 3.4vh;
  }

  .icon {
    padding-right: 5vh;
    height: 5vh;
  }

  .loading-bottom {
    width: 24vh;
  }
}

#customBtn {
  display: inline-block;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
}

#customBtn:hover {
  cursor: pointer;
}

span.label {
  font-family: serif;
  font-weight: normal;
}

span.buttonText {
  display: inline-block;
  vertical-align: middle;
  padding-left: 42px;
  padding-right: 42px;
  font-size: 14px;
  font-weight: bold;
  /* Use the Roboto font that is loaded in the <head> */
  font-family: 'Roboto', sans-serif;
}

.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
