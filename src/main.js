import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vue3GoogleLogin from 'vue3-google-login'
import VueCryptojs from 'vue-cryptojs'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vue3GoogleLogin, {
    clientId: '286554998545-hsatr3tkmeskks4r3r4eb7vcfsbv25h7.apps.googleusercontent.com'
  })
app.use(vuetify)
app.use(VueCryptojs)
app.mount('#app')
