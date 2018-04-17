<template>
  <div class="profileUser">
    <div class="profileUser__row">
      <h1>{{ titre1 }}</h1>
      <div class="profileUser__form">
        <b-form @submit.prevent="updateUserProfile">
          <!-- User profile details -->
          <div>
            <!-- Role -->
            <!-- IL faudrait affichcer le role lors du GET sans l'inclure aprés dans la requéte PUT -->
            <b-form-group>
              <b-form-input type="text" v-model="profile.role" placeholder="Rôle" v-if="show" readonly></b-form-input>
              <div v-else>RÔLE : {{ profile.role }} </div>
            </b-form-group>

            <!-- Name -->
            <b-form-group>
              <b-form-input type="text" v-model="profile.lastName" placeholder="Nom" v-if="show"></b-form-input>
              <div v-else>NOM : {{ profile.lastName }}</div>
            </b-form-group>

            <!-- Firstname -->
            <b-form-group>
              <b-form-input type="text" v-model="profile.firstName" placeholder="Prénom" v-if="show"></b-form-input>
              <div v-else>PRENOM : {{ profile.firstName }}</div>
            </b-form-group>

            <!-- E-mail -->
            <b-form-group>
              <b-form-input type="text" v-model="profile.email" placeholder="E-mail" v-if="show"></b-form-input>
              <div v-else>E-MAIL: {{ profile.email }}</div>

            </b-form-group>
            <!-- Phone -->
            <!-- <b-form-group>
            <b-form-input type="text" v-model="profile.phone" placeholder="Numéro de téléphone" v-if="show"></b-form-input>
            <div v-else>NUMERO DE TELEPHONE: {{ profile.phone }}</div>
          </b-form-group> -->

        </div>
        <!-- User change password -->
        <div class="passwordForm" v-if="show">
          <h3>{{ titre2 }}</h3>
          <!--Former password-->
          <b-form-group>
            <b-form-input type="password" placeholder="Ancien mot de passe"></b-form-input>
          </b-form-group>
          <!--New password-->
          <b-form-group>
            <b-form-input type="password" placeholder="Nouveau mot de passe"></b-form-input>
          </b-form-group>
          <!--Confirm new password-->
          <b-form-group>
            <b-form-input type="password" placeholder="Confirmer le nouveau de passe"></b-form-input>
          </b-form-group>
        </div>
        <div v-else></div>
        <!-- User's actions buttons -->
        <div class="class row">
          <b-button variant="success" type="submit" v-if="show">Enregistrer les modifications</b-button>
          <b-button variant="primary" @click="show=!show" v-else>Modifier votre profil</b-button>

        </div>


      </b-form>
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
      titre1: "Mettre à jour votre profil",
      titre2: "Mettre à jour votre mot de passe",
        // profile: [],
        profile: {},
        show: false
      };
    },
    created() {
      //Retrieve user profile
      http.get('/profile')
      .then(res => {
        this.profile = res.data.content;
        console.log('voici le res.data.content: ', res.data.content)
      })
      .catch(err => {
        console.log(err)
      })
    },
    methods: {
      updateUserProfile() {
        console.log('Sent data: ', this.profile);
        this.profile.password = undefined
        http.put('/profile', this.profile)
        .then(res => {
          console.log('réponse then: ', res.data)
          if (res.data) {
            console.log('User details have been updated')
            this.$router.push('/users')
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
    }
  }
  </script>

  <style scoped>
  /* import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css'; */
  </style>
