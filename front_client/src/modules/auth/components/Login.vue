<template>

<b-container fluid>
  <b-row>
    <b-col cols="4">
   <form v-on:submit.prevent>
    <div class="row login__row">
      <div>
        <h1 class="login__headingPrimary">
          <span style="color: black;">MILO</span>
          <span style="color: #195DA8;">LIB</span>
          </h1>
          <h5>
            <span style="color: black;">Entrez vos identifiants pour vous connecter</span>
            <span style="color: #195DA8;"><b-link class="login__blink" to="register">ou créez un nouveau compte</b-link></span>
          </h5>
        <hr>
        <div class="login__formGroup">

        <div class="form-group">
          <label for="email">E-mail </label>
          <input v-model="user.email" id="email" class="form-control" name="email" type="text" placeholder="email@example.com" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input v-model="user.password" id="password" class="form-control" name="password" type="password" placeholder="Enter your password" required>
        </div>
        </div>
        <b-button variant="primary" v-on:click="signUp">Login</b-button>
      </div>
    </div>
  </form>
  <br>
  <!-- <b-button variant="primary" v-on:click="goToRegister">Créer un compte</b-button> -->
      
    </b-col>
    <b-col cols="8">
   <b-img height="650"
        :src="require('../../../assets/images/milolibSuiviBlue.jpg')" />
    </b-col>
  </b-row>

  <div class="login">
</div>
</b-container>
</template>

<script>
import swal from "sweetalert2";
import http from '../../../helpers/http'

export default {
  name: "login",
  data() {
    return {
      title: "Login",
      subTitle: "Entrez vos identifiants pour vous connecter",
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    // goToRegister() {
    //   this.$router.push("/register");
    // },
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
