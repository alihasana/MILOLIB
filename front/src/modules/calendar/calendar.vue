  <template>
    <div class="container">
       <router-view></router-view>
    </div>
  </template>

<script>

/* eslint-disable */
import agenda from "./components/agenda";
import availabilityDatePicker from "./components/availabilityDatePicker";
import eventTypeSetting from "./components/eventTypeSetting"

import * as cHelpers from './calendarHelpers';

//component description: this component is the main component of the calendar module.
//it will display by default the agenda.
//it gather datas from the availabilityDatePicker, and AvailanilitySettings

//WORK IN PROGRESS: How to display the components that have props with view-router?


export default {
  name: "calendar",
  data() {
    return {
    };
  },
  components: {
    availabilityDatePicker,
    agenda
  },
  methods: {
  }
};

</script>



<style scoped>

.container {
  display: block;
}

</style>

</style>

