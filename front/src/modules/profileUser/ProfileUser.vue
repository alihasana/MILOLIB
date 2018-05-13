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
              <div v-else> <span class="profileUser__textTitle"> RÔLE : </span> {{ profile.role }} 
                </div>
            </b-form-group>

             <!-- Workplace -->
            <b-form-group>
              <b-form-input type="text" v-model="profile.workPlace" placeholder="Lieu(x) d'exercice" v-if="show" readonly></b-form-input>
              <div v-else> <span class="profileUser__textTitle"> LIEU(X) D'EXERCICE : </span> {{ profile.workPlace }} </div>
            </b-form-group>

            <!-- Name -->
            <b-form-group>
              <b-form-input type="text" v-model="profile.lastName" placeholder="Nom" v-if="show"></b-form-input>
              <div v-else> <span class="profileUser__textTitle"> NOM : </span> {{ profile.lastName }}</div>
            </b-form-group>

            <!-- Firstname -->
            <b-form-group>
              <b-form-input type="text" v-model="profile.firstName" placeholder="Prénom" v-if="show"></b-form-input>
              <div v-else> <span class="profileUser__textTitle"> PRENOM : </span> {{ profile.firstName }}</div>
            </b-form-group>

            <!-- E-mail -->
            <b-form-group>
              <b-form-input type="text" v-model="profile.email" placeholder="E-mail" v-if="show"></b-form-input>
              <div v-else> <span class="profileUser__textTitle"> E-MAIL : </span> {{ profile.email }}</div>
            </b-form-group>

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
            <b-form-input type="password" v-model="profile.confirmNewPassword" placeholder="Confirmer le nouveau de passe"></b-form-input>
          </b-form-group>
        </div>
        <div v-else></div>
        <!-- User's actions buttons -->
        <b-container>
        <b-col sm="6" class="class row profileUser__button" v-if="show">
          <group-button>
          <b-button variant="success" type="submit">Enregistrer les modifications</b-button>
          <b-button variant="" @click="cancel">Annuler</b-button>
          </group-button>
        </b-col>
        <b-col sm="6" v-else>
          <b-button class="userdetails__button" variant="primary" @click="show=!show">Modifier votre profil</b-button>
        </b-col>
  </b-container>  
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
            password: '', 
            oldPassword: '', 
            confirmNewPassword: '', 
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
        let profile = this.profile; 
          http.put('/profile', profile)
          .then(res => {
            console.log('res', res.data);
            swal({
                  type: "success",
                  title: "Modification du profile: ",
                  text: "Votre profil a été modifié"
                  });
                  setTimeout( () => location.reload(), 1500);
            })
          .catch(
            error => {
              console.log('error:', error.response.data);
              swal({
                  type: "error",
                  title: "Modification du profile: ",
                  text:error.response.data.message
                  });
            })
        
      },
      cancel() {
        location.reload();
      }
    }


  };
  </script>

  <style scoped>
  </style>
