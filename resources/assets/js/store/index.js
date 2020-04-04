import Vue from 'vue'
import Vuex from 'vuex'

import preloader from '@/store/preloader/'
import auth from '@/store/auth/'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    preloader,
    auth
  }
})
