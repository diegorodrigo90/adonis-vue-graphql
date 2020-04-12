import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'


import routes from '@/router/routes.map'


Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active',
  routes,
  mode: 'history',
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    store.dispatch('checkLogin').catch(error => router.push({ name: 'login' }).catch(error => { }))
  }

  next()
})

export default router
