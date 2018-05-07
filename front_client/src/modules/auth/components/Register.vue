<template>
  <div class="register">
   <form v-on:submit.prevent>
    <div class="row login__row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 class="heading-primary">{{ title }}</h1>
        <hr>
        <div class="form-group">
          <label for="nom">Nom </label>
          <input v-model="user.lastName" id="lastName" class="form-control" name="lastName" type="text" placeholder="Rabbit" required>
        </div>
        <div class="form-group">
          <label for="prénom">Prénom </label>
          <input v-model="user.firstName" id="firstName" class="form-control" name="firstName" type="text" placeholder="Roger" required>
        </div>
        <div class="form-group">
          <label for="téléphone">Téléphone </label>
          <input v-model="user.phone" id="phone" class="form-control" name="phone" type="tel" placeholder="0123456789" required>
        </div>
        <div class="form-group">
          <label for="email">Email </label>
          <input v-model="user.email" id="email" class="form-control" name="email" type="text" placeholder="email@example.com" required>
        </div>
        <br>
        <div class="form-group">
          <b-form-checkbox id="checkbox1"
                          v-model="user.descolarise"
                          value="true"
                          unchecked-value="false">
            J'ai moins de 26 ans
          </b-form-checkbox>
          <div>State: <strong>{{user.descolarise}}</strong></div>
          <br>
          <b-form-checkbox id="checkbox2"
                          v-model="user.infAge"
                          value="true"
                          unchecked-value="false">
            Je suis descolarisé
          </b-form-checkbox>
          <div>State: <strong>{{user.infAge}}</strong></div>
        </div>
        <br>
        <div>
          <b-form-select v-model="user.commune" :options="options" class="mb-3" required>
            <template slot="first">
              <!-- this slot appears above the options from 'options' prop -->
              <option :value="null" disabled>-- Votre commune --</option>
            </template>
            <!-- these options will appear after the ones from 'options' prop -->
            <option value="Cesson">Cesson</option>
            <option value="Combs-la-Ville">Combs-la-Ville</option>
            <option value="Lieusaint">Lieusaint</option>
            <option value="Moissy-Cramayel">Moissy-Cramayel</option>
            <option value="Nandy">Nandy</option>
            <option value="Réau">Réau</option>
            <option value="Savigny-le-Temple">Savigny-le-Temple</option>
            <option value="St-Pierre-du-Perray">St-Pierre-du-Perray</option>
            <option value="Tigery">Tigery</option>
            <option value="Vert-St-Denis">Vert-St-Denis</option>
          </b-form-select>
          <div>commune: <strong>{{ user.commune }}</strong></div>
        </div>
        <br>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="user.password" id="password" class="form-control" name="password" type="password" placeholder="Enter your password" required>
        </div>
        <!-- <div class="form-group">
          <label for="confirmPassword">Confirm password</label>
          <input v-model="user.confirmPassword" id="confirmPassword" class="form-control" name="confirmPassword" type="password" placeholder="Confirm your password" required>
        </div> -->
        <br>
        <div>
          <b-form-checkbox id="checkbox3"
                          v-model="status3"
                          value="true"
                          unchecked-value="false" required>
            I accept the terms and use
          </b-form-checkbox>
          <div>State: <strong>{{status3}}</strong></div>
        </div>
        <br>
        <button class="btn btn-lg btn--white" v-on:click="signIn">Register</button>
      </div>
    </div>
  </form>
  <br>
  <button class="btn btn-lg btn--white" v-on:click="goToLogin">Retourner à l'authentification</button>
</div>
</template>

<script>
import swal from "sweetalert2";
import http from '../../../helpers/http'

export default {
  name: "register",
  data() {
    return {
      title: "Register",
      descolarise: 'false',
      infAge: 'false',
      status3: 'false',
      commune: null,
      // options: [
      //   { value: 'A', text: 'Tatooine' },
      //   { value: 'B', text: 'L\'étoile de la mort (ou l\'étoile noire osef)'},
      //   { value: 'C', text: 'Dagobah' },
      //   { value: 'D', text: 'Coruscant (n\'existe plus lol)' }
      // ],
      user: {
        lastName: "",
        firstName: "",
        phone: "",
        email: "",
        descolarise: "",
        infAge: "",
        commune: "",
        password: "",
        // confirmPassword: ""
      }
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/");
    },
    signIn() {
      // console.log(user.password);
      // console.log(user.confirmPassword);
      // if (user.password === user.confirmPassword) {
         http
        .post("/clientsAuth/signup", this.user)
        .then(res => {
          swal({
              type: "success",
              title: "Votre compte a bien été créé !",
              text: res.data.message
            });
          this.$router.push("/");
        })
        .catch(error => {
          swal({
            type: "error",
            title: "Oups ! Une erreur s'est produite !",
            text: error.response.data.message
          });
        });
      // } else {
      //   swal({
      //       type: "error",
      //       title: "Oups ! Les mots de passes sont différents !",
      //       text: error.response.data.message
      //     });
      // }
    }
  },
};
</script>

<style scoped>
</style>
