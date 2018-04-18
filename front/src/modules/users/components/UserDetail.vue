<template>
  <b-form class="userdetails" @submit.prevent='updateUserProfile' style="cursor: pointer">
    <!-- Email input -->
    <b-form-input type="text" v-model="user.email" placeholder="Rôle" v-if="show"></b-form-input>
    <p v-else><span>Email</span>: {{ user.email }}</p>
  
  <!-- Role input -->
    <b-form-input type="text" v-model="user.role" placeholder="Rôle" v-if="show"></b-form-input>
    <p v-else><span>Role</span>: {{ user.role }}</p>
  
    <div class="class row">
      <b-button variant="success" type="submit" v-if="show">Enregistrer les modifications</b-button>
      <b-button variant="primary" @click="show=!show" v-else>Modifier le profil de l'utilisateur</b-button>
    </div>

    <!-- <b-button-group>
    <b-button variant="success">Voir le calendrier de l'utilisateur</b-button>
    <b-button variant="danger">Supprimer le profil de l'utilisateur</b-button>
    </b-button-group> -->
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
      };
    },
    methods: {
      getTheUser(id) {
        http
          .get("/users/" + id)
          // id corresponds to this.params.id
          // console.log("retrieved user id", id)
          .then(res => {
            this.users = res.data.content;
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
              console.log('User details have been updated')
              this.$router.push('/users')
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
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
