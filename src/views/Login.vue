<template>
  <div class="wrapper">
    <div class="welcome">
      <h2>Welcome to</h2>
      <img alt="JEEC" src="@/assets/jeec_logo_darkmode.svg" />
    </div>

    <div class="login">
      <p>Login to our Webapp</p>
      <!-- <p>App under development!</p> -->
      <div class="button_wrapper">
        <GoogleLogin :callback="callback" />
        <p>v3.0</p>
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