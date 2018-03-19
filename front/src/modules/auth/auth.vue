<template>
  <div>
  <login  v-on:switching="loginStatus = !loginStatus" v-if="loginStatus"/>
  <signup v-on:switching="loginStatus = !loginStatus" v-else/>
  </div>
</template>

<script>
/* eslint-disable */
import signup from "./components/signup";
import login from "./components/login";

export default {
  name: "auth",
  data() {
    return {
      content: "Login",
      loginStatus: true
    };
  },
  components: {
    signup,
    login
  },
  methods: {
    functionDEmerde: function() {
      console.log("loginStatus");
      loginStatus = false;
    }
  }
};
</script>

<style scoped>
</style>
