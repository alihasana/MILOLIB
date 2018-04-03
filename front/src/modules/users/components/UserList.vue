<template>
  <div class="userlist" >
    <h2 class="heading-secondary">Here is your AwesomeUserList</h2>
    <div class="row userlist__row">
      <router-link tag="div"  class="userlist__list col-xs-6 col-lg-3" :to="{name:'userDetail' , params: {id:user.username , user: user}}" style="cursor: pointer" v-for='user in users' :key="user.username">
        <p>{{ user.email }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
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
      this.$http
        .get("/users", {})
        .then(res => {
          this.users = res.data.content;
          console.log("ICI", this.users);
        })
        .catch(error => {
          if (error)
            swal({
              type: "error",
              title: "Oh no ...",
              text: error.response.data.message
            });
        });
    }
  },
  created() {
    this.getListUser();
  }
};
</script>

<style scoped>
</style>
