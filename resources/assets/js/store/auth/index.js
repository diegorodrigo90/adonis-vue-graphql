import axios from "axios";
import { URL_BASE, ACCESS_TOKEN } from "@/config";

const RESOURCE = "auth/";

const state = {
    token: localStorage.getItem(ACCESS_TOKEN) || "",
    authenticated: !!localStorage.getItem(ACCESS_TOKEN),
    user: {}
};

const mutations = {
    AUTH_USER_TOKEN(state, token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        state.token = token;
        state.authenticated = true;
    },
    AUTH_USER(state, user) {
        state.user = user;
    },
    AUTH_USER_LOGOUT(state) {
        state.user = null;
        state.token = null;
        localStorage.removeItem(ACCESS_TOKEN);
        state.authenticated = false;
    }
};

const actions = {
    login({ commit, dispatch}, formData) {
        commit("LOADING", true);
        return new Promise((resolve, reject) => {
            axios
              .post(`${URL_BASE}`, {
                query: `
                mutation{
                  login(email: "${formData.email}"
                  password: "${formData.ṕassword}")
                }
                ` })
                .then(response => {
                    commit("AUTH_USER_TOKEN", response.data.access_token);
                    localStorage.setItem(
                        ACCESS_TOKEN,
                        response.data.access_token
                        );
                        axios.defaults.headers.common[
                            "Authorization"
                        ] = `Bearer ${response.data.access_token}`;

                    dispatch("checkLogin").catch(error => {
                        commit("AUTH_USER_LOGOUT");
                        reject(error);
                    });


                    resolve();
                })
                .catch(error => {
                    commit("AUTH_USER_LOGOUT");
                    reject(error);
                })
                .finally(() => commit("LOADING", false));
        });
    },

    logout({ commit }) {
        commit("AUTH_USER_LOGOUT");
    },

    checkLogin({ commit }) {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);

        return new Promise((resolve, reject) => {
            if (!accessToken) {
                commit("AUTH_USER_LOGOUT");
                return reject();
            }

            return axios
                .post(`${URL_BASE}`)
                .then(response => {
                    commit("AUTH_USER", response.data);
                    return resolve();
                })
                .catch(error => {
                    commit("AUTH_USER_LOGOUT");

                    return reject(error);
                });
        });
    }
};

export default {
    state,
    mutations,
    actions,
};
