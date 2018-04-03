<template>
  <div class="container">
  <div class="datePicker">
    <datePicker></datePicker>
    <!-- <datePickerAgenda class="datePickerAgenda"></datePickerAgenda> -->
  </div>
  <div class="availabilitySetting">
    <availabilitySetting></availabilitySetting>
  </div>
  <!-- <div class="agenda">
    <agenda></agenda>
  </div> -->
  </div>
</template>

<script>
/* eslint-disable */
import availabilitySetting from "./components/availabilitySetting";
import datePickerAgenda from "./components/datePickerAgenda";
import datePicker from "./components/datePicker";
import agenda from "./components/agenda";
import * as cHelpers from './calendarHelpers';


// ------------- these function are tests for now in console ---------------

// let now = cHelpers.getCurrentDate();
// console.log('now:', now);

// let tomorow = cHelpers.getDate("2018-03-24");
// console.log('tomorow:', tomorow);

// let numberOfDays = cHelpers.getDaysNumberInMonth("2018-03-24");
// console.log('numberOfDays:', numberOfDays);

// let monthFirstDate = cHelpers.getMonthFirstDate("2018-03-24");
// console.log('monthFirstDate:', monthFirstDate);

// let monthLastDate = cHelpers.getMonthLastDate("2018-03-24");
// console.log('monthLastDate:', monthLastDate);

// let WeekFirstDate = cHelpers.getWeekFirstDate("2018-03-24");
// console.log('WeekFirstDate:', WeekFirstDate);

// let WeekNumber = cHelpers.getWeekNumber("2018-03-24");
// console.log('WeekNumber:', WeekNumber);

// let rangeTimeWeek = cHelpers.getTimeRange(1,'week', "2018-03-26");
// console.log('rangeTimeWeek:', rangeTimeWeek);

// let daysOfTheTimeRange = cHelpers.getDaysOfTheTimeRange(monthFirstDate,monthLastDate);
// console.log('daysOfTheTimeRange:', daysOfTheTimeRange);



export default {
  name: "calendar",
  data() {
    return {
      msg: "Calendar Vue"
    };
  },
  components: {
    availabilitySetting,
    datePickerAgenda,
    datePicker,
    agenda
  },
  methods: {}
};
</script>

<style scoped>

.container {
  display: block;
}

.datePicker {
  /*position: absolute;
  float: left;*/
}

.datePickerAgenda {
 /* position: relative;*/
  /*float: left;*/
}

.agenda {
  margin-left: 20%;
  margin-top: 20%;
  /*float: right;*/
}
</style>
