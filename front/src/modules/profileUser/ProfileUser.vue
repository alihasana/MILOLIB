<template>
  <div>
    <!-- <create-user @userCreated='createNewUser($event)'></create-user> -->
    <profileDetails @completeProfile="updateUserProfile($event)"></profileDetails>
    <!-- <user-profile @completeProfile="updateUserProfile($event)"></user-profile> -->
  </div>
</template>

<script>
  /* eslint-disable */
  // import createUser from "./components/createUser";
  import ProfileDetails from "./components/ProfileDetails";
 import http from '../../helpers/http'


  export default {
    name: "ProfileUser",
    data() {
      return {
        msg: "Hello main profileUser message"
      };
    },
    methods: {
      //save details

      //update profile details
      updateUserProfile: function(updateProfile) {
        http.post('http://localhost:1407/users/self', updateProfile)
          .then(function(res) {
            console.log('New user created:', res.data);
          })
          .catch(function(error) {
            console.log("Error", error)
          })
      }
    },
    components: {
      // createUser,
      ProfileDetails
    }
  }
</script>

<style scoped>
  /* import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-vue/dist/bootstrap-vue.css'; */
</style>
