import Vue from "vue";
import Router from "vue-router";

import store from "@/store";


import routes from '@/router/routes.map';


Vue.use(Router);

const router = new Router({
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const authenticated = store.state.auth.authenticated;
  if (requiresAuth && !authenticated) {
      return router.push({ name: 'login' }).catch(err => { });
  } else if (requiresAuth && authenticated) {
      next();
  } else {
      next();
  }
})

export default router;

