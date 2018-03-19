<template>
  <div>
    <h1>{{ msg }}</h1>
    <datePicker></datePicker>
    <availabilitySetting></availabilitySetting>

  </div>
</template>

<script>
/* eslint-disable */
import availabilitySetting from "./components/availabilitySetting";
import datePicker from "./components/datePicker";

export default {
  name: "calendar",
  data() {
    return {
      msg: "Calendar Vue"
    };
  },
  components: {
    availabilitySetting,
    datePicker
  },
  methods: {}
};
</script>

<style scoped>
</style>
