<template>
  <div class="container">
  <div class="datePicker">
    <datePicker></datePicker>
  </div>
  </div>
</template>

<script>

/* eslint-disable */

import datePicker from "./components/datePicker";
import * as cHelpers from './calendarHelpers';


export default {
  name: "calendar",
  data() {
    return {
      msg: "Calendar Vue"
    };
  },
  components: {
    datePicker
  },
  methods: {}
};



</script>



<style scoped>

.container {
  display: block;
}

</style>
