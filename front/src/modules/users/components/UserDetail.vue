<template>
  <b-form class="userdetails" @submit.prevent='updateUserProfile' style="cursor: pointer">

  <!-- Lastname input -->
    <b-container fluid>
    <b-row class="my-2" >
      <b-col v-if="show" sm="6" class="text-sm-left">
        <label>Nom : </label><br>
        <b-form-input type="text" v-model="user.lastName" placeholder="Nom" >
        </b-form-input></b-col>
      <b-col v-else sm="6" class="text-sm-left"><span class="userdetails__textTitle">Nom : </span><span>{{ user.lastName }}</span></b-col>
    </b-row>
  </b-container>

    <!-- Firstname input -->
  <b-container fluid>
    <b-row class="my-2" >
      <b-col v-if="show" sm="6" class="text-sm-left">
        <label>Prénom: </label><br>
        <b-form-input type="text" v-model="user.firstName" placeholder="Prénom" >
        </b-form-input></b-col>
      <b-col v-else sm="6" class="text-sm-left"><span class="userdetails__textTitle">Prénom : </span><span>{{ user.firstName }}</span></b-col>
    </b-row>
  </b-container>

    <!-- E-mail input -->
     <b-container fluid>
    <b-row class="my-2" >
      <b-col v-if="show" sm="6" class="text-sm-left">
        <label>E-mail: </label><br>
        <b-form-input type="text" v-model="user.email" placeholder="E-mail" >
        </b-form-input></b-col>
      <b-col v-else sm="6" class="text-sm-left"><span class="userdetails__textTitle">E-mail : </span><span>{{ user.email }}</span></b-col>
    </b-row>
  </b-container>

    <!-- Role input -->
    <b-container fluid>
    <b-row class="my-2" >
      <b-col v-if="show" sm="6" class="text-sm-left">
        <label>Rôle: </label><br>
        <b-form-input type="text" v-model="user.role" placeholder="Rôle" >
        </b-form-input></b-col>
      <b-col v-else sm="6" class="text-sm-left"><span class="userdetails__textTitle">Rôle : </span><span>{{ user.role }}</span></b-col>
    </b-row>
  </b-container>

    <!-- Workplace input -->
    <b-container fluid>
    <b-row class="my-2" >
      <b-col v-if="show" sm="6" class="text-sm-left">
        <label>Lieu(x) d'exercice: </label><br>
        <b-form-checkbox-group id="workPlace" name="workPlace" v-model="user.workPlace" :options="workPlace">
        </b-form-checkbox-group>
        </b-col>
      <b-col v-else sm="6" class="text-sm-left"><span class="userdetails__textTitle">Lieu(x) d'exercice: </span><span>{{ user.workPlace }}</span></b-col>
    </b-row>
  </b-container>

  <!-- action buttons -->
  <b-container>
    <b-col sm="6" v-if="show">
      <group-button>
      <b-button variant="success" type="submit">Enregistrer les modifications</b-button>
      <b-button variant="" @click="cancel">Annuler</b-button>
      </group-button>
    </b-col>
    <b-col sm="6" v-else>
      <b-button class="userdetails__button" variant="primary" @click="show=!show">Modifier le profil de cet utilisateur</b-button>
    </b-col>
  </b-container>  
  </b-form>
</template>

<script>
  import swal from "sweetalert2";
  import http from "../../../helpers/http";
  export default {
    name: "userDetail",
    data() {
      return {
        title: "Here are the userDetail",
        user: {},
        show: false, 
        workPlace: [
        {text: 'MDEF', value: 'MDEF'},
        {text: 'Combs-La-Ville', value: 'Combs-La-Ville'},
        {text: 'Saint-Pierre-Du-Perray', value: 'Saint-Pierre-Du-Perray'},
        {text: 'Tigéry', value: 'Tigéry'}
      ]
      };
    },
    methods: {
      getTheUser(id) {
        http
          .get("/users/" + id)
          // id corresponds to this.params.id
          // console.log("retrieved user id", id)
          .then(res => {
            this.user = res.data.content;
            console.log("retrieved user : ", res.data.content)
          })
          .catch(error => {
            if (error)
              swal({
                type: "error",
                title: "Oh no ...",
                text: error.response.data.message
              });
          });
      },
      updateUserProfile() {
        console.log('Sent data: ', this.user);
        // this.profile.password = undefined
        http.put('/users/' + this.$route.params.id, this.user)
          .then(res => {
            console.log('réponse then: ', res.data)
            if (res.data) {
               swal({
                type: "success",
                title: "Modifications",
                text: "Les informations de l'utilisateur ont bien été modifiées"
              });
              console.log('User details have been updated')
              this.$router.push('/users')
            }
          })
          .catch(err => {
            console.log(err)
             swal({
                type: "error",
                title: "Erreur",
                text: "Une erreur est survenue."
              });
          })
      },
      cancel() {
        location.reload();
      }
    },
    beforeMount() {
      // if don't find any user
      if (this.$route.params.user == undefined) {
        // get the user with this id 
        this.getTheUser(this.$route.params.id);
      } else {
        // user = user object
        this.user = this.$route.params.user;
      }
    }
  };
</script>

<style scoped>
</style>
