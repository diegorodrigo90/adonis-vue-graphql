import Vue from "vue";
import Router from "vue-router";

import routes from '@/router/routes.map';


Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes,
  mode: 'history',
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
