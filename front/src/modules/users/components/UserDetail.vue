<template>
    <div class="userdetails" @click='sendMessages($route.params.id)' style="cursor: pointer">
    <p><span>Email</span>: {{ user.email }}</p>
    <p><span>Role</span>: {{ user.role }}</p>
  </div>
</template>

<script>
import swal from "sweetalert2";
export default {
  name: "userDetail",
  data() {
    return {
      title: "Here are the userDetail",
      user: {
        _id: "",
        username: "",
        firstName: "",
        lastName: ""
      }
    };
  },
  methods: {
    getTheUser(id) {
      this.$http
        .get("/users/" + id)
        .then(res => {
          this.user = res.data.content;
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
    sendMessages(idToSendTo) {
      this.$router
        .push({
          name: "sendMessages",
          params: { userID: idToSendTo }
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
  beforeMount() {
    if (this.$route.params.user == undefined) {
      this.getTheUser(this.$route.params.id);
    } else {
      this.user = this.$route.params.user;
    }
  }
};
</script>

<style scoped>
</style>
