<template>
  <div class="createUser">
    <div class="createUser__row">
      <h1>{{ title }}</h1>
      <!-- Create user Form -->
      <div class="createUser__form">
        <b-form>
          <!-- Username/E-mail -->
          <b-form-group id="">
            <b-form-input id="" type="email" v-model="form.userName" required placeholder="Entrer l'adresse e-mail d'un nouvel utilisateur">
            </b-form-input>
          </b-form-group>
          <!-- User role -->
          <b-form-group id="">
            <b-form-select id="" :options="userRole" required v-model="form.userRole">
            </b-form-select>
          </b-form-group>
          <!-- Password -->
          <b-form-group>
            <b-form-input v-model="form.userPassword" placeholder="Entrer un mot de passe"></b-form-input>
          </b-form-group>
          <!-- Admin's actions buttons -->
          <b-button-group>
            <b-button v-on:click="createUser" type="submit" variant="success">Enregistrer</b-button>
          </b-button-group>
        </b-form>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
/* eslint-disable */
import http from "../../../helpers/http";

export default {

  name: "createUser",
  data() {
    return {
      title: "Créer le profil d'un nouvel utilisateur",
      form: {
        userName: '',
        userPassword: '',
        userRole: null
      },
      userRole: [{
        text: 'Assigner un rôle au nouvel utilisateur',
        value: null
      },
      'Administrateur', 'Conseiller', 'Chargé d\'accueil', 'Invité'
      ],
      User: {
        email: String,
        role: String,
        password: String
      }
    }
  },
  methods: {
    createUser: function(newUser) {
      const User = {
        email: this.form.userName,
        role: this.form.userRole,
        password: this.form.userPassword
      }
      console.log('Object from parent: ', User)
      http.post('users', User)
      .then(res => {
        this.$router.push('/users/')
        console.log('Bingo', res);
      })
      .catch(function(error) {
        console.log("Error", error)
      })
    },
  }
}
</script>

<style scoped>
</style>
