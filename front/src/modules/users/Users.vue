<template>
    <div class="hello">
    <router-view></router-view>
   </div>
</template>

<script>
import CreateUser from "./components/CreateUser"
import UserDetail from "./components/UserDetail"
import UserList from "./components/UserList"

export default {
  name: "Users",
   data() {
      return {

      }
    },
  components: {
    UserDetail,
    UserList,
    CreateUser
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
