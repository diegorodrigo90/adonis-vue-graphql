
import { ACCESS_TOKEN, REFRESH_TOKEN, URL_BASE } from '@/config'


const state = {
  token: localStorage.getItem(ACCESS_TOKEN) || '',
  authenticated: !!localStorage.getItem(ACCESS_TOKEN),
  user: {}
}

const mutations = {
  AUTH_USER_TOKEN (token, refreshToken) {
    localStorage.setItem(ACCESS_TOKEN, `Bearer ${token}`)
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
    state.token = token
    state.refreshToken = refreshToken
    state.authenticated = true
  },
  AUTH_USER (user) {
    state.user = user
  },
  AUTH_USER_LOGOUT () {
    state.user = {}
    state.token = null
    localStorage.removeItem(ACCESS_TOKEN)
    state.authenticated = false
  }
}

const actions = {
  login ({ commit }, formData) {
    commit('LOADING', true)
    return new Promise((resolve, reject) => {
      axios
        .post(`${URL_BASE}`, {
          query: `
        mutation{
          login(email: "${formData.email}"
          password: "${formData.password}"){
            type
            token
            refreshToken
          }
        }
        `
        })
        .then(response => {
          if (response.data.errors) {
            reject(response.data.errors)
          }
          commit('AUTH_USER_TOKEN', response.data.data.login.token, response.data.data.login.refreshToken)
          localStorage.setItem(
            ACCESS_TOKEN, response.data.data.login.token
          )

          const setAuthorizationHeader = token => {
            axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : ''
          }

          setAuthorizationHeader((response.data.data.login.token).toString())

          resolve()
        })
        .catch(error => {
          commit('AUTH_USER_LOGOUT')
          reject(error)
        })
        .finally(() => commit('LOADING', false))
    })
  },

  logout ({ commit }) {
    commit('AUTH_USER_LOGOUT')
  },

  checkLogin ({ commit }) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    return new Promise((resolve, reject) => {
      if (!accessToken) {
        commit('AUTH_USER_LOGOUT')
        return reject()
      }

      return axios
        .post(`${URL_BASE}`, {
          query: `
          {
            me {
              id
              username
              email
            }
          }
          `
        })
        .then(response => {
          console.log(axios.defaults.headers.common)

          console.log(response.data.data)
          // console.log(axios.defaults.headers.common.Authorization)

          if (response.data.errors) {
            commit('AUTH_USER_LOGOUT')
            return reject(response.data.errors)
          }
          commit('AUTH_USER', response.data.data.me)
          return resolve()
        })
        .catch(error => {
          commit('AUTH_USER_LOGOUT')

          return reject(error)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
