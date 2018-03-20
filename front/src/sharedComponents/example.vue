<template>
  <div class="container">
    <h1>{{ content }}</h1>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "example",
  data() {
    return {
      content: "Example of sharedComponent",
      loginStatus: true
    };
  }
};
</script>

<style scoped>
</style>
