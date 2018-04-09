<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- Create user Form -->
    <div class="form">
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
    <hr>
  </div>
</template>

<script>
  /* eslint-disable */
  import axios from "axios"
  
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
        newUser: {
          email: String, 
          role: String, 
          pswd: String
        }
      }
    },
    methods: {
   createUser: function() { 
        const newUser = {
          email: this.form.userName,
          role: this.form.userRole,
          pswd: this.form.userPassword
        }
        //emit sends data to parent file
        this.$emit('createNewUser', newUser)
        console.log('Object from child: newUser:', newUser);
      }
    }
  }
</script>

<style scoped>
  .form {
    margin: auto;
    width: 50vw;
    margin-top: 3vw;
  }
  
  hr {
    margin: auto;
    width: 40vw;
    margin-top: 3vw;
    margin-bottom: 3vw;
  }
</style>
