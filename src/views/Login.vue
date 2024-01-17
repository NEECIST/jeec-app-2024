<template>
  <div class="login">
    <div class="loading">
      <div class="loading-top">
        <v-img alt="JEEC logo" src="../assets/jeec_colour_no_edition.svg" />
      </div>
      <div class="buttons-flex" v-if="!loading">
        <!-- <GoogleLogin :callback="callback"/> -->
        <!-- <button @click="work">botão</button> -->
        <GoogleLogin :callback="callback"/>

      </div>
      <div> 
        V2.2
      </div>
    </div>
    
  </div>
  
          
        <!-- <div
          @click.stop="login_student"
          class="button"
          style="background-color: #27ade4"
        >
          <img
            alt="Fenix logo"
            src="../assets/icons/graduation-hat.svg"
            class="icon"
            style="margin-top: 0.5vw"
          />
          Student Login
        </div> -->
        <!-- Botão GOOGLE -->
        <!-- <div @click="onSignIn()" class="g-signin2" data-width="300" data-height="40" data-longtitle="true"></div>  -->
        <!-- <div id="my-signin2"></div> -->
        <!-- <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
          Sign in now with Google
        </g-signin-button> -->
        <!-- <GoogleLogin :params="params" :onSuccess="onSuccess" >NEW LOGIN TEXT</GoogleLogin>
        <div ref="googleLoginBtn">That didn't work, soz</div>

        <div
          @click.stop="login_partner"
          class="button"
          style="background-color: #27ade4"
        >
          <img
            alt="Fenix logo"
            src="../assets/icons/businessman.svg"
            class="icon"
          />
          Partner Login
        </div>
        <div
          @click.stop="return_website"
          class="button"
          style="background-color: #e42741"
        >
          <img
            alt="Fenix logo"
            src="../assets/icons/back-arrow.svg"
            class="icon"
          />
          Return to Website
        </div>
      </div>
      <div v-else>
        <v-progress-circular
          indeterminate
          color="#27ade4"
          :size="100"
          :width="10"
          class="loading-bar"
        ></v-progress-circular>
      </div>
      <div class="loading-bottom">
        <img alt="IST logo" src="../assets/tecnico_grey.svg" />
      </div> -->
</template>

<script>
import User from "../models/user";
// import * as parserJwt from '../assets/jwtparser.js';
import axios from 'axios';
import authHeader from "../services/auth-header";

import CryptoJS from 'vue-cryptojs';

const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response)
}
// import UserService from "../services/user.service";

// const callback = (response) => {
//   // This callback will be triggered when the user selects or login to
//   // his Google account from the popup
//   console.log("Handle the response", response)
// }

export default {
  name: "Login",
  components: {
    
  },
  
  data(){
    return{
      // callback:function name() {},
      user: new User(),
      loading: this.$route.query.token ? true : false,
      token:'',
    }
  },
  computed: {
    // loggedIn() {
    //   return this.$store.state.auth.status.loggedIn;
    // },
  },


  methods:{
    
    bullshit() {
      console.log('entrou bullshit')
      if (this.token) {
        this.$store
          .dispatch("auth/login", [
            this.user,
            this.decrypt(this.token),
          ])
          .then(
            () => {
              this.$router.push("/home");
            },
            () => {
              this.$store.dispatch("auth/logout");
            }
          );
      } else if (this.loggedIn) {
        this.$router.push("/home");
      }
    },
    async work(){
      axios.post(process.env.VUE_APP_JEEC_BRAIN_URL+"/student/redirecturigoogle",
            { headers: authHeader() }
          ).then(response => {
            if (response.data != ''){
              this.token = response.data;
              this.bullshit()

            }else{
              window.location.replace(process.env.STUDENT_APP_URL)

            }
            })
    },
    decrypt(code) {
      var master_key = "12345678901234561234567890123456";
      var rawData = atob(code.split("_").join("+"));

      var iv = rawData.substring(0, 16);
      var crypttext = rawData.substring(16);

      crypttext = this.CryptoJS.enc.Latin1.parse(crypttext);
      iv = this.CryptoJS.enc.Latin1.parse(iv);
      var key = this.CryptoJS.enc.Utf8.parse(master_key);

      var plaintextArray = this.CryptoJS.AES.decrypt(
        { ciphertext: crypttext },
        key,
        {
          iv: iv,
          mode: this.CryptoJS.mode.CBC,
          padding: this.CryptoJS.pad.Pkcs7,
        }
      );

      var output_plaintext = this.CryptoJS.enc.Latin1.stringify(plaintextArray);

      return output_plaintext;
    },
  },
  created() {
    console.log('entrou')
    console.log(this.$route.query.token)
    if (this.$route.query.token) {
      this.$store
        .dispatch("auth/login", [
          this.user,
          this.decrypt(this.$route.query.token),
        ])
        .then(
          () => {
            this.$router.push("/home");
          },
          () => {
            this.$store.dispatch("auth/logout");
          }
        );
    } else if (this.loggedIn) {
      this.$router.push("/home");
    }
  },

};
</script>

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
