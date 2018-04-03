<template>
  <div>
    <create-user @userCreated='createNewUser($event)'></create-user>
    <user-profile @completeProfile="updateUserProfile($event)"></user-profile>
  </div>
</template>

<script>
  /* eslint-disable */
  import createUser from "./components/createUser";
  import userProfile from "./components/userProfile";
  import axios from "axios";
  
  
  export default {
    name: "profileUser",
    data() {
      return {
        msg: "Hello main profileUser message"
      };
    },
    methods: {
      createNewUser: function(newUser) {
        console.log(newUser.email, newUser.role);
        axios.post('http://localhost:1407/users', newUser)
          .then(function(res) {
            console.log('New user created:', res.data);
          })
          .catch(function(error) {
            console.log("Error", error)
          })
      }, 
      updateUserProfile: function(updateProfile) {
        axios.post('http://localhost:1407/users/self', updateProfile)
          .then(function(res) {
            console.log('New user created:', res.data);
          })
          .catch(function(error) {
            console.log("Error", error)
          })
      } 
    },
    components: {
      createUser,
      userProfile
    }
  }
</script>

<style scoped>
  /* import 'bootstrap/dist/css/bootstrap.css'; 
  import 'bootstrap-vue/dist/bootstrap-vue.css'; */
</style>
