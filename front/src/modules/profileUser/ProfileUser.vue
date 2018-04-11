<template>
  <div>
    <p> Hello from Profile Use </p>
    <div class="form">
      <!-- User profile details -->
      <div>
        <b-form-group>
          <b-form-input type="text" v-model="profileForm.name" placeholder="Nom"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="text" v-model="profileForm.firstname" placeholder="Prénom"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="text" v-model="profileForm.phone" placeholder="Téléphone"></b-form-input>
        </b-form-group>
      </div>
      <!-- User change password -->
      <div class="passwordForm">
        <b-form-group>
          <b-form-input type="password" v-model="profileForm.password" placeholder="Nouveau mot de passe"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="password" v-model="profileForm.confirmPassword" placeholder="Confirmer le nouveau de passe"></b-form-input>
        </b-form-group>
        <!-- User's actions buttons -->
        <b-button-group>
          <b-button type="submit" v-on:click="saveNewProfile" variant="success">Enregistrer</b-button>
          <b-button type="submit" variant="primary">Modifier</b-button>
          <b-button type="submit" variant="danger">Supprimer</b-button>
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import http from '../../helpers/http'
  export default {
    name: "ProfileUser",
    data() {
      return {
        msg: "Mettre à jour votre profil", 
        profileForm: {
          name: '', 
          firstname: '', 
          phone: '', 
          password: '', 
          confirmPassword: ''
        }, 
   userDetails: {
          name: String,
          firstname: String,
          phone: String,
          password: String,
          confirmPassword: String
        }
      };
    },
  methods: {
    saveNewProfile: () => {
      const userDetails = {
          name: this.profileForm.name,
          firstname: this.profileForm.firstname,
          phone: this.profileForm.phone,
          password: this.profileForm.password,
          confirmPassword: this.profileForm.confirmPassword
      }
      console.log("UserDetails : ", userDetails);
    }
  }
  }
</script>

<style scoped>
  /* import 'bootstrap/dist/css/bootstrap.css';
      import 'bootstrap-vue/dist/bootstrap-vue.css'; */
</style>
