<template>
  <div>
   <form v-on:submit.prevent>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 class="heading-primary">{{ title }}</h1>
        <hr>
        <div class="form-group">
          <label for="email">Email </label>
          <input v-model="user.email" id="email" class="form-control" name="email" type="text" placeholder="email@example.com" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="user.password" id="password" class="form-control" name="password" type="password" placeholder="Enter your password" required>
        </div>
        <button class="btn btn-lg btn--white" v-on:click="signUp">Login</button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import swal from "sweetalert2";
import http from '../../helpers/http'

export default {
  name: "login",
  data() {
    return {
      title: "Login",
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signUp() {
      http
        .post("/auth/login", this.user)
        .then(res => {
          let token = res.data.content.token;
          let role = res.data.content.role;
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          console.log(res.data.content);
          // localStorage.setItem("User", this.user.username);
          // localStorage.getItem("role");
          swal({
            type: "success",
            text: "It's working"
          });
          if (token) this.$router.push("/dashboard");
        })
        .catch(error => {
          swal({
            type: "error",
            title: "Oh no ...",
            text: error.response.data.message
          });
        });
    }
  },
  created() {
    this.user.email = "admin";
    this.user.password = "admin";
  }
};
</script>

<style scoped>
</style>
