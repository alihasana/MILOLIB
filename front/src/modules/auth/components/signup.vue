<template>
  <div class="hello">
    <form>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>{{ title }}</h1>
          <hr>
          <div class="form-group">
            <label for="username">Username <span>*</span> </label>
            <input v-model="user.username" id="username" class="form-control" name="username" type="email" placeholder="email@example.com" required>
          </div>
          <!-- <input v-model="user.password" id="password" name="password" type="password" placeholder="password" pattern=".{5,10}" title="5 to 10 characters" required><br><br> -->
          <div class="form-group" >
            <label for="password">Password <span>*</span> </label>
            <input v-model="user.password" id="password" class="form-control" name="password" type="password" placeholder="Enter a valid password" required>
          </div>
          <div class="form-group">
            <label for="firstName">FirstName   </label>
            <input v-model="user.firstName" id="firstName" class="form-control" name="firstName" type="text" placeholder="...">
          </div>
          <div class="form-group">
            <label for="lastName">LastName   </label>
            <input v-model="user.lastName" id="lastName" class="form-control" name="lastName" type="text" placeholder="...">
          </div>
          <button class="btn btn-lg btn-primary" v-on:click="switching">Login</button>
          <button class="btn btn-lg btn-primary" v-on:click="post">Sign In</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "signup",
  props: {
    test: {
      type: Boolean
      // default: function(value) {
      //   return (test = !test);
      // }
    }
  },
  data() {
    return {
      title: "Signup to OurAwesomeApp",
      user: {
        username: "",
        email: "",
        password: "",
        message: ""
      }
    };
  },
  methods: {
    switching() {
      this.$emit("switching");
    },
    post: function() {
      this.$http
        .post("http://localhost:8000/auth/signup", {
          username: this.user.username,
          password: this.user.password,
          firstName: this.user.firstName,
          lastName: this.user.lastName
        })
        .then(function(res) {
          if (res) this.$router.push("/");
          else alert("You need to fill all the informations");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
 {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
0 {
  color: #42b983;
}
</style>
