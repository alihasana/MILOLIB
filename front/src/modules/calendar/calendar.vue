  <template>
    <div class="container">
      <div class="datePicker">
        <datePicker></datePicker>
      </div>
      <div class="eventTypeSetting">
        <eventTypeSetting></eventTypeSetting>
      </div>
    </div>
  </template>

<script>

/* eslint-disable */

import datePicker from "./components/datePicker";
import eventTypeSetting from "./components/eventTypeSetting";

import * as cHelpers from './calendarHelpers';


export default {
  name: "calendar",
  data() {
    return {
      msg: "Calendar Vue"
    };
  },
  components: {
    datePicker,
    eventTypeSetting
  },
  methods: {}
};

</script>



<style scoped>

.container {
  display: block;
}

</style>
