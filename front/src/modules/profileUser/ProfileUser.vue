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

             <!-- Workplace -->
            <b-form-group>
              <b-form-input type="text" v-model="profile.workPlace" placeholder="Rôle" v-if="show" readonly></b-form-input>
              <div v-else>LIEU(X) D'EXERCICE : {{ profile.workPlace }} </div>
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
            <b-form-input type="password" v-model="profile.oldPswd" placeholder="Ancien mot de passe"></b-form-input>
          </b-form-group>
          <!--New password-->
          <b-form-group>
            <b-form-input type="password" v-model="profile.password" placeholder="Nouveau mot de passe"></b-form-input>
          </b-form-group>
          <!--Confirm new password-->
          <b-form-group>
            <b-form-input type="password" v-model="profile.confirmPassword" placeholder="Confirmer le nouveau de passe"></b-form-input>
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
import swal from "sweetalert2";
import http from '../../helpers/http';

export default {
  name: "ProfileUser",
  data() {
    return {
      titre1: "Mettre à jour votre profil",
      titre2: "Mettre à jour votre mot de passe",
        // profile: [],
        profile: {
            role: '', 
            workPlace: '', 
            lastName: '', 
            firstName: '', 
            email: '', 
            oldPswd: '', 
            password: '', 
            confirmPassword: '', 
        }, 
        show: false
      };
    },
    created() {
      //Retrieve user profile
      http.get('/profile')
      .then(res => {
        this.profile = res.data.content;
        // server response
        console.log('Profil récupéré: ', res.data.content)
      })
      .catch(err => {
        console.log(err)
      })
    },
    methods: {
      updateUserProfile() {
        // check new and confirm new password here
        if (this.profile.password === this.profile.confirmPassword) {
          // send only new and old
          console.log('pswd sent data: ', this.profile);
          http.put('/profile', this.profile)
          .then(res => {
            console.log('res', res);
            swal({
                  type: "success",
                  title: "Modification du profile: ",
                  text: "Les modifications demandées ont bien été executées"
                  });
            this.$router.push({name: 'users'});
            })
          .catch(
            error => {
              console.log('error:', error.response.data);
              swal({
                  type: "error",
                  title: "Modification du profile: ",
                  text:error.response.data
                  });
            })
        }
      }
    }


  };
  </script>

  <style scoped>
  /* import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css'; */
  </style>
