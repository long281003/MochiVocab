import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "vue3-toastify/dist/index.css";
import { apiMixin } from './Mixin/MixinAPI'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import Vue3Toastify from 'vue3-toastify';
import VOtpInput from "vue3-otp-input";
const app = createApp(App)

app.use(router)
app.use(store)
app.use(Vue3Toastify, {
    autoClose: 2000,
    position: "top-right"
})
app.use(VueAwesomePaginate)
app.mixin(apiMixin)
app.component('v-otp-input', VOtpInput)
app.mount('#app')
