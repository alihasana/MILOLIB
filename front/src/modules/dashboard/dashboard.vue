<template>
  <!-- <div id="background"> -->
  <div class="app-background">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Dashboard",
  data() {
    return {
      msg: "Welcome to your dashboard !"
    };
  },
  components: {},
};
</script>

<style scoped>
/* #background {
  height: 100vh;
  margin:0;
  padding:0;
  background: url("https://wallpaperscraft.com/image/squirrel_stands_grass_animal_blur_120316_1280x1024.jpg") no-repeat center fixed; 
  -webkit-background-size: cover; 
  background-size: cover; 
} */
.app-background {
  height: 100vh;
  margin:0;
  padding:0;
}
</style>