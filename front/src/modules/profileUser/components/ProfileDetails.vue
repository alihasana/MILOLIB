<template>
  <div>
    <h1>{{ profileDetails }}</h1>
    <div class="form">
      <!-- User profile details -->
      <div>
        <b-form-group>
          <b-form-input v-model="profileForm.name" type="text" placeholder="Nom"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input v-model="profileForm.firstname" type="text" placeholder="Prénom"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input v-model="profileForm.phone" type="text" placeholder="Téléphone"></b-form-input>
        </b-form-group>
      </div>
      <!-- User change password -->
      <div class="passwordForm">
        <h1>{{ changePassword }}</h1>
        <b-form-group>
          <b-form-input v-model="profileForm.password" type="password" placeholder="Nouveau mot de passe"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input v-model="profileForm.confirmPassword" type="password" placeholder="Confirmer le nouveau de passe"></b-form-input>
        </b-form-group>
        <!-- User's actions buttons -->
        <b-button-group>
          <b-button v-on:click="userProfileDetails" type="submit" variant="success">Enregistrer</b-button>
          <b-button type="submit" variant="primary">Modifier</b-button>
          <b-button type="submit" variant="danger">Supprimer</b-button>
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import http from '../../../helpers/http'
  export default {
    name: "ProfileDetails",
    data() {
      return {
        profileDetails: "Détails du profil utilisateur",
        changePassword: "Modifier le mot de passe",
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
    components: {},
    methods: {
      userProfileDetails: function() {
        const userDetails = {
          name: this.profileForm.name,
          firstname: this.profileForm.firstname,
          phone: this.profileForm.phone,
          password: this.profileForm.password,
          confirmPassword: this.profileForm.confirmPassword
        }
        //emit sends data to parent file
        this.$emit('completeProfile', userDetails)
        console.log(userDetails)

      }
    }
  };
</script>

<style scoped>
  .form {
    margin: auto;
    width: 50vw;
    margin-top: 3vw;
  }

  .passwordForm {
    margin-top: 3vw;
  }
</style>
