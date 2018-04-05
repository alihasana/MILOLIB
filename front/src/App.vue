<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import Login from "@/modules/auth/Login";
import dashboard from "@/modules/dashboard/dashboard";
import Users from "@/modules/users/Users";
import profileUser from "@/modules/profileUser/profileUser";
import calendar from "@/modules/calendar/calendar";
import example from "@/sharedComponents/example";

export default {
  name: "App",
  components: {
    Login,
    dashboard,
    Users,
    profileUser,
    calendar,
    example
  }
};


</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
