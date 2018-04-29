import Vue from 'vue'
import Router from 'vue-router'
import Auth from "@/modules/auth/Auth";
import Login from "@/modules/auth/components/Login";
import Register from "@/modules/auth/components/Register";
import Dashboard from "@/modules/dashboard/Dashboard";
import Rdv from "@/modules/rdv/Rdv";
import calendar from "@/modules/rdv/calendar";
import Header from "@/sharedComponents/Header";

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: "/",
    name: "auth",
    components: {
      default: Auth
    },
    children: [
    {
      path: "",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }
    ]
  },  
  {
    path: "/dashboard",
    name: "dashboard",
    components: {
      default: Dashboard,
      header: Header
    }
  },
  {
    path: "/rdv",
    name: "rdv",
    components: {
      default: Rdv,
      header: Header
    }
  },
  {
    path: "/calendar",
    name: "calendar",
    components: {
      default: calendar,
      header: Header
    }
  }
  ]
});