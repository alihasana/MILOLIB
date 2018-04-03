<template>
    <div class="hello">
     <router-view></router-view>
   </div>
</template>

<script>
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
export default {
  name: "Users",
  components: {
    UserDetail,
    UserList
  },
  data() {
    return {
      title: "users"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
