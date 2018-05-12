<template>
    <b-container fluid>
    <b-row>
    <b-col cols="4">
   <form v-on:submit.prevent>
    
      <div class="login__row">
        <!-- titles -->
        <h1 class="login__headingPrimary">
          <span style="color: black;">MILO</span>
          <span style="color: #195DA8;">LIB</span>
          </h1>
        <h5 v-html="subTitle"></h5>
        <!-- form inputs -->
        <div class="login__formGroup">
        <div>
          <label for="email">Email </label>
          <input v-model="user.email" id="email" class="form-control" name="email" type="text" placeholder="email@example.com" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="user.password" id="password" class="form-control" name="password" type="password" placeholder="Enter your password" required>
        </div>
        </div>
        <b-button variant="primary" v-on:click="signUp">Se connecter</b-button>
      </div>
  
  </form>
        </b-col>
        <b-col cols="8">
        <b-img height="650"
        :src="require('../../assets/images/milolib_blue_opacity_image.jpg')" />
        </b-col>
    </b-row>
</b-container>

</template>

<script>
import swal from "sweetalert2";
import http from '../../helpers/http'

export default {
  name: "login",
  data() {
    return {
      subTitle: "Entrez vos identifiants pour vous connecter au back-office", 
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
          let role = res.data.content.user;
          localStorage.setItem("role", role);
          localStorage.setItem("token", token);
          console.log("res du login: ", token, "res pour le role: ", role);
          // this.$store.state.role = role;
          if (token) {
            if (role === "Administrateur" || role === "Chargé d'accueil") {
              this.$router.push("/users/");
            } else if (role === "Conseiller" || role === "Administrateur/Conseiller") {
              this.$router.push("/calendar");
            } else {
              this.$router.push("/dashboard");
              console.log(role);
            }
          }
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
