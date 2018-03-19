<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import auth from "@/modules/auth/auth";
import dashboard from "@/modules/dashboard/dashboard";
import listUser from "@/modules/listUser/listUser";
import profileUser from "@/modules/profileUser/profileUser";
export default {
  name: "App",
  components: {
    auth,
    dashboard,
    listUser,
    profileUser
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
  margin-top: 60px;
}
</style>
