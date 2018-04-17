<template>
  <div class="userlist">
    <h2 class="heading-secondary">Here is your AwesomeUserList</h2>
    <div class="row userlist__row">
          <!--Il faudrait plutôt mettre des boutons, car le lien doit permettre de modifier, supprimer, accéder au calendrier, et accéder au détails de l'utilisateur-->
      <router-link tag="div" class="userlist__list col-xs-6 col-lg-3" :to="{name:'userDetail' , params: {id:user._id , user: user}}" style="cursor: pointer" v-for='user in users' :key="user._id">
        <p>{{ user.email }}</p>
        <!-- <button v-on:click="redirectToUserList">Modifier</button> -->
      </router-link>
    </div>
  </div>
</template>

<script>
  import swal from "sweetalert2";
  import http from '../../../helpers/http'
  export default {
    name: "userList",
    data() {
      return {
        title: "Your are on userList",
        users: []
      };
    },
    methods: {
      getListUser() {
        http
          .get("/users", {})
          .then(res => {
            this.users = res.data.content;
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
      // redirectToUserList() {
      //   this.$router.push('ProfileUser')
      // }
    },
    created() {
      this.getListUser();
    }
  };
</script>

<style scoped>
  
</style>
