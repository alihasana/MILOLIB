<template>
  <div>
    <div>
      <h1>{{ title }}</h1>
      <!-- Create user Form -->
      <div>
        <b-form class="createUser" @submit="createUser">
        <!-- Name -->
          <b-form-group id="">
            <b-form-input id="" v-model="form.lName" required placeholder="Entrer le nom du nouvel utilisateur">
            </b-form-input>
          </b-form-group>
          <!-- Firstname -->
          <b-form-group id="">
            <b-form-input id="" v-model="form.fName" required placeholder="Entrer le prénom du nouvel utilisateur">
            </b-form-input>
          </b-form-group>
          <!-- Username/E-mail -->
          <b-form-group id="">
            <b-form-input id="" type="email" v-model="form.userEmail" required placeholder="Entrer l'adresse e-mail du nouvel utilisateur">
            </b-form-input>
          </b-form-group>
          <!-- User role -->
          <b-form-group id="">
            <b-form-select id="" :options="userRole" required v-model="form.userRole">
            </b-form-select>
          </b-form-group>
          <!-- workPlace -->
          <b-form-group label="Indiquer le lieu d'exercice du nouvel utilisateur">
            <b-form-checkbox-group id="workPlace" name="workPlace" v-model="form.place" :options="workPlace">
            </b-form-checkbox-group>
          </b-form-group>
          <!-- Password -->
          <b-form-group>
            <b-form-input v-model="form.userPassword" placeholder="Entrer un mot de passe"></b-form-input>
          </b-form-group>
          <!-- Admin's actions buttons -->
          <b-button-group>
            <b-button type="submit" variant="success">Enregistrer</b-button>
          </b-button-group>
        </b-form>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
/* eslint-disable */
import swal from "sweetalert2";
import http from "../../../helpers/http";

export default {
  name: "createUser",
  data() {
    return {
      title: "Créer le profil d'un nouvel utilisateur",
      form: {
        lName: '',
        fName: '',
        userEmail: '',
        userPassword: '',
        userRole: null,
        place: null,
      },
      userRole: [{
        text: 'Assigner un rôle au nouvel utilisateur',
        value: null
      },
      'Administrateur', 'Administrateur/Conseiller', 'Conseiller', 'Chargé d\'accueil', 'Invité'
      ],
      workPlace: [
        {text: 'MDEF', value: 'MDEF'},
        {text: 'Combs-La-Ville', value: 'Combs-La-Ville'},
        {text: 'Saint-Pierre-Du-Perray', value: 'Saint-Pierre-Du-Perray'},
        {text: 'Tigéry', value: 'Tigéry'}
      ]
    }
  },
  methods: {
     createUser(evt) {
      evt.preventDefault();
      console.log('welcome to createUser function')
      const User = {
        lastName: this.form.lName, 
        firstName: this.form.fName,
        email: this.form.userEmail,
        role: this.form.userRole,
        password: this.form.userPassword, 
        workPlace: this.form.place
      }
      console.log('Object from CreateUser component: ', User)
      http.post('/users', User)
      .then(res => {
      console.log('profil créé: ', User)
        swal({
              type: "success",
              title: "L'utilisateur a bien été créé !",
              text: res.data.message
            });
        this.$router.push('/users')
        console.log('Bingo', res);
      })
      .catch(function(error) {
        swal({
            type: "error",
            title: "Oups ! Une erreur s'est produite !",
            text: error.response.data.message
          });
        console.log("Error", error)
      })
    },
  }
};
</script>

<style scoped>
</style>
