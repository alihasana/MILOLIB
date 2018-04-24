<template>
  <div id="app" class="app-background">
    <router-view name="header"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
import Auth from "@/modules/auth/Auth";
import Dashboard from "@/modules/dashboard/Dashboard";
import Rdv from "@/modules/rdv/Rdv";

export default {
  name: "App",
  components: {
    Auth,
    Dashboard,
    Rdv
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>