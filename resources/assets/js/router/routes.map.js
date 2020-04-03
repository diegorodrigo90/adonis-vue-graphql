import AppHeader from "@/layout/AppHeader";
import AppFooter from "@/layout/AppFooter";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Components from "@/views/Components.vue";
import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";



export default [
  {
    path: "/",
    name: "components",
    meta: {
      requiresAuth: true
    },
    components: {
      header: AppHeader,
      default: Components,
      footer: AppFooter
    }
  },
  {
    path: "/landing",
    name: "landing",
    meta: {
      requiresAuth: true
    },
    components: {
      header: AppHeader,
      default: Landing,
      footer: AppFooter
    }
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      requiresAuth: true
    },
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
