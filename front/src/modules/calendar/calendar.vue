  <template>
    <div class="container">
      <router-view :agendaRangeProp="agendaRangeInC" :agendaSlotProp="agendaSlotInC" :agendaRangePropC="agendaRangeInC" :agendaSlotPropC="agendaSlotInC" v-on:newTimeRangeToDisplay="getNewTimeRangeToDisplay($event)" v-on:newSlotsToDisplay="getNewSlotsToDisplay($event)"></router-view>
       <!-- <router-view></router-view> -->
      <!-- <div class="agenda">
        <agenda :agendaRangePropC="agendaRangeInC" :agendaSlotPropC="agendaSlotInC"></agenda>
      </div> -->
      <!-- <div class="datePicker">
        <datePicker :agendaRangeProp="agendaRangeInC" :agendaSlotProp="agendaSlotInC" v-on:newTimeRangeToDisplay="getNewTimeRangeToDisplay($event)" v-on:newSlotsToDisplay="getNewSlotsToDisplay($event)"></datePicker>
      </div> -->
      <!-- <div class="eventTypeSetting">
        <eventTypeSetting></eventTypeSetting>
      </div> -->
    </div>
  </template>

<script>

/* eslint-disable */
import agenda from "./components/agenda";
import datePicker from "./components/datePicker";
import eventTypeSetting from "./components/eventTypeSetting";


import * as cHelpers from './calendarHelpers';

//component description: this component is the main component of the calendar module.
//it will display by default the agenda.
//it gather datas from the datePicker, and AvailanilitySettings

//WORK IN PROGRESS: How to display the components that have props with view-router?


export default {
  name: "calendar",
  data() {
    return {
      msg: "Calendar Vue",
      agendaRangeInC:[],
      agendaSlotInC:[]
    };
  },
  components: {
    datePicker,
    eventTypeSetting,
    agenda
  },
  methods: {
    getNewTimeRangeToDisplay: function(timeRange){
      this.agendaRangeInC = timeRange;
      console.log('je suis dans le component Calendar et je récupère la time range du datePicker', this.agendaRangeInC);
    },
    getNewSlotsToDisplay: function(slots){
      this.agendaSlotInC = slots;
      console.log('je suis dans le component Calendar je récupère les slots du datePicker', this.agendaSlotInC);
    }
  }
};

</script>



<style scoped>

.container {
  display: block;
}

</style>
