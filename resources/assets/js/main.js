import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import Argon from "@/plugins/argon-kit";
import '@/registerServiceWorker'
import VueSwal from "vue-swal";
import store from '@/store';

Vue.use(VueSwal);


Vue.config.productionTip = false;
Vue.use(Argon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// store
//     .dispatch("checkLogin")
//     .then(() => router.push({ name: "dashboard" }))
//     .catch(error => router.push({ name: "login" }));
