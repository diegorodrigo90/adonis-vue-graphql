import AppHeader from "@/layout/AppHeader";
import AppFooter from "@/layout/AppFooter";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Components from "@/views/Components.vue";
import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";

import store from "@/store";
import router from "@/router";

export default [
  {
    path: "/",
    name: "components",
    components: {
      header: AppHeader,
      default: Components,
      footer: AppFooter
    }
  },
  {
    path: "/landing",
    name: "landing",
    components: {
      header: AppHeader,
      default: Landing,
      footer: AppFooter
    }
  },
  {
    path: "/profile",
    name: "profile",
    components: {
      header: AppHeader,
      default: Profile,
      footer: AppFooter
    }
  },
  {
    path: "/login",
    name: "login",
    components: {
      header: AppHeader,
      default: Login,
      footer: AppFooter
    }
  },
  {
    path: "/register",
    name: "register",
    components: {
      header: AppHeader,
      default: Register,
      footer: AppFooter
    }
  }
];
