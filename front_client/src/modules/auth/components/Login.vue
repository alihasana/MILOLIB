<template>
  <div class="login">
   <form v-on:submit.prevent>
    <div class="row login__row">
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
  <br>
  <button class="btn btn-lg btn--white" v-on:click="goToRegister">Créer un compte</button>
</div>
</template>

<script>
import swal from "sweetalert2";
import http from '../../../helpers/http'

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
    goToRegister() {
      this.$router.push("/register");
    },
    signUp() {
      http
        .post("/clientsAuth/login", this.user)
        .then(res => {
          let token = res.data.content.token;
          localStorage.setItem("token", token);
          if (token) {
            swal({
              type: "success",
              title: "Vous êtes connecté !",
              text: res.data.message
            });
            this.$router.push("/rdv");
          }
        })
        .catch(error => {
          swal({
            type: "error",
            title: "Oups ! Une erreur s'est produite !",
            text: error.response.data.message
          });
        });
    }
  },
  created() {
    this.user.email = "client";
    this.user.password = "client";
  }
};
</script>

<style scoped>
</style>
