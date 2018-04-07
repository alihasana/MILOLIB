<template>
    <div class="hello">
    <router-view></router-view>
    <create-user @createNewUser='createNewUser($event)'></create-user>
   </div>
</template>

<script>
import CreateUser from "./components/CreateUser";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";

export default {
  name: "Users",
  components: {
    UserDetail,
    UserList,
    CreateUser
  },
  data() {
    return {
      title: "users"
    };
  },
  methods: {
    //Create user method
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
