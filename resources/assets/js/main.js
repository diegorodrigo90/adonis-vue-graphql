import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import Argon from '@/plugins/argon-kit'
import '@/registerServiceWorker'
import VueSwal from 'vue-swal'
import store from '@/store'
import axiosApi from 'axios'

import { ACCESS_TOKEN } from '@/config'

Vue.use(VueSwal)

// get token in store
const axios = axiosApi.create({ headers: { common: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` || '' } } })

// put axios to be used globaly
window.axios = axios

Vue.use(Argon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

store
  .dispatch('checkLogin').catch(error => router.push({ name: 'login' }).catch(error => { }))
