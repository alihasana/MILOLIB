<template>
  <div class="calendar">
    <b-card>
      <b-card-header class="card__head">
        <b-card class="title card__title">Sélectionnez votre RDV</b-card>
      </b-card-header>
      <b-card-body>

        <table class="calendar">
          <thead class="calendar__head">
            <b-button class="calendar__navicon"v-on:click="getPreviousDays()">
              <i class="material-icons">navigate_before</i class="material-icons">
            </b-button>
            <!-- affichage de la date -->
            <tr class="calendar__headDays" v-for="(day,index) in dayRangeToDisplay">
              <ul class="calendar__headDayUl">
                <li class="calendar__headDayLi">{{day | dateFormatDayName}}</li>
                <li class="calendar__headDayLi">{{day | dateFormatDayNumberAndMonth}}</li>
              </ul>
            </tr>
            <b-button class="calendar__navicon" v-on:click="getNextDays()">
              <i class="material-icons">navigate_next</i class="material-icons">
            </b-button>
          </thead>
          <tbody class="calendar__body">
            <!-- affichage des boutons heures -->
            <tr class="calendar__bodyDay" v-for="(day,index) in dayRangeToDisplay" :key="index">
              <!-- <ul class="calendar__bodyUl"v-for="(hour, index) in hourList" :key="index">
                <li class="calendar__bodyLi"><b-button v-on:click="selectTime(hour,day)">{{hour}}</b-button></li> -->
                <ul class="calendar__bodyUl"v-for="(button, index) in btnIdToDisplay" v-if="buttonIdIsInDay(day,button)" :key="index">
                <li class="calendar__bodyLi"><b-button v-on:click="bookApt(button)">{{hour}}{{button.id}}</b-button></li>
              </ul>
            </tr>
          </tbody>
        </table>
      </b-card-body>
    </b-card>
  
</div>
</template>

<script>
/* eslint-disable */
import swal from "sweetalert2";
import http from '../../helpers/http';
import cal from '../../helpers/calendar';
import moment from 'moment';
import 'moment/locale/fr';
import twix from 'twix';


export default {
  name: 'calendar',
  // props:['visibleProp'],
  data () {
    return {
      duration:30,
      // duration:'',
      hourList:[],
      //the hours will be dynamically generated from the duration of the appointments.
      //the duration will be retreived from the store, for now it has been set in an arbitrary
      hour:'',
      day:'',
      beginDisplay:0,
      button:'',
      buttonIdList:[],
      filteredButtonIdList: [],
      matchingInitalSlot:''
    }
  },
  computed:{
    getCurrentDay(){
      return moment();
    },
    getDaysRange(){
      let start= this.getCurrentDay;
      let end = this.getCurrentDayPlus2month(moment(start));
      return this.getDaysOfTheTimeRange(start, end);
      //actually, the time range should be defined by the availabilities.
      //we will need to get the slots from the store for this and manipulate them to get the time range
    },
    // getSlots(){
    //   return this.$store.state.calendarSlots;
    // },
    // getDurationOfApt(){
    //the duration will come from the store.
    //   this.duration = this.$store.state.appointmentTypes.duration;
    // },
    // getHourList(){
    //   // this.hourList = this.generateHourList(this.getDurationOfApt);
    //   this.hourList = this.generateHourList(this.duration);
    // },
    endDisplay(){
      return this.beginDisplay+3;
    },
    dayRangeToDisplay(){
      return this.getDaysRange.slice(this.beginDisplay,this.endDisplay);
    },
    btnIdToDisplay(){
      return this.filterButtonIdToDisplay(this.dayRangeToDisplay, this.buttonIdList);
    }
  },
  created(){
    this.hourList = this.generateHourList(this.duration);
    this.createButtonId(this.getDaysRange);
  },
  methods:{
    getCurrentDayPlus2month(now){
      return moment(now).add(1,'month');
    },
    getDaysOfTheTimeRange(start,end){
      let arr = moment(start).twix(end).toArray('days');
      return arr;
    },
    getNextDays(){
      if (this.beginDisplay>=0){ this.beginDisplay += 3};
      this.filteredButtonIdList = [];
    },
    getPreviousDays(){
      if (this.beginDisplay>=3){this.beginDisplay -= 3}
      this.filteredButtonIdList = [];
    },
    generateHourList(duration){
      //this function, from a duration will generate an array with the list of hours to display
      //in the calendar for each day
        let list = []
        let initialHour = moment(this.getCurrentDay.startOf('day').add(8,'hour'));
        // console.log(initialHour);
        let lastHour = moment(this.getCurrentDay.startOf('day').add(18,'hour'));
        // console.log(lastHour);
        for (let i=initialHour; i.isBefore(lastHour); i.add(duration,'minutes')){
          let hour = moment(i).format('HH:mm');
          // console.log('moment (i):', hour);
          list.push(hour);}
        console.log('list:', list);
        return list;
    },
    buttonIdIsInDay: function(day,btn){
      // this is a conditional function, called in V-for to display under the day only the button with ID matching the day
      let a = moment(day).format('YYYY-MM-DD').toString();
      let b = btn.id.slice(0,10);
      if(a == b) {
        return true;
      }
    },
    createButtonId: function(timeRange){
      //based on a timeRange of days, and based on the hours to display in calendar
      //this function create buttons with Id representatives of the date, hour.
      //by default, they also represent status N( Non available)
      let reg = /:/;
      for (let i=0; i<timeRange.length; i++){
        for(let j=0; j<this.hourList.length; j++){
          let id;
          id = moment(timeRange[i]).format('YYYY-MM-DD').toString()+ '-' + this.hourList[j]+ '-' +'N';
          id = id.replace(reg, '-');
          let button = {
            id: id,
            class:'N'
          }
          this.buttonIdList.push(button);
        }
      }
      console.log('buttonIdList:', this.buttonIdList);
      return this.buttonIdList;
    },
    updateButtonId: function(slots, idList){
      //this function will update ButtonID based on slots status, and modify the buttonsID accordingly
      for (let i=0; i<slots.length; i++){
        for (let j=0; j<idList.length; j++){
          let sl = moment(slots[i].start).format('YYYY-MM-DD-HH-mm').toString();
          let id = idList[j].id.slice(0,16);
          if (sl == id) {
            if(slots[i].available === true){
              idList[j].id = idList[j].id.slice(0,16)+'-'+'A';
              idList[j].class = 'A';
            }
            if(slots[i].available === false){
              idList[j].id = idList[j].id.slice(0,16)+'-'+'B';
              idList[j].class = 'B';
            }
          }
        }
      }
      console.log('les boutons ont bien été updatés avec les slots');
      console.log('buttonIdList:', this.buttonIdList);
      return this.buttonIdList;
    },
    filterButtonIdToDisplay: function(timeRange, btnIdList){
      for (let i=0; i<timeRange.length; i++){
        let trday
        trday = moment(timeRange[i]).format('YYYY-MM-DD').toString();
        for (let j=0; j<btnIdList.length; j++){
          let btnid = btnIdList[j].id.slice(0,10);
          if (trday == btnid){
            this.filteredButtonIdList.push(btnIdList[j]);
          }
        }
      }
      console.log('this.filteredButtonIdList:', this.filteredButtonIdList)
      return this.filteredButtonIdList;
    },
    bookApt(button){
      console.log('je clique sur le btn :', button);
      this.getmatchingInitalSlot(button, this.getSlots);
    },
    getmatchingInitalSlot: function(btn, slots){
      console.log('j actionne le buttonId', btn);
        for (let i=0; i<slots.length; i++){
          let sl = moment(slots[i].start).format('YYYY-MM-DD-HH-mm').toString();
          let id = btn.id.slice(0,16);
          if (sl == id){
            this.matchingInitalSlot = slots[i];
            console.log('the matching slot is:', this.matchingInitalSlot);
          }
        }
    },
    getSlotsInRange: function(slotList,start,end){
      for (let i=0; i<slotList.length; i++){
        if (moment(slotList[i].start).isBetween(start, end, null, '[)')){
          this.formRDV.allSlots.push(slotList[i]);
        }
      }
    },
  },
  filters:{
    dateFormatDayName: function(date) {
      return moment(date).format('dddd');
    },
    dateFormatDayNumberAndMonth: function(date) {
      return moment(date).format('D MMM');
    },
    dateFormatFullDayHour: function(date){
      return moment(date).format('LLLL');
    }
  }
};

</script>

<style scoped>

.calendar__navicon {
    color:#212121;
  }

  .card__head{
    padding: 0;
  }

  .card__title{
    padding: 0;
    margin: auto;
    /*font-weight: bold;*/
  }

  .calendar{
    width:100%;
    margin-top: 0;
  }

  .calendar__head{
    display: flex;
    flex-direction:row;
    width: 70%;
    margin-top: 0;
    justify-content: center;
    border-bottom: 2px solid #673AB7;
    margin: auto;
  }

  .calendar__headDays{
    font-size: 14px;
    margin-bottom: 5px;
    margin-top:5px;
  }

  .calendar__headDayUl{
    width: 100px;
  }

  .calendar__headDayLi{
    padding: 0px;
    margin: 0px;
    list-style:none;
    width: 100%;
  }

  .calendar__body{
    display: flex;
    flex-direction:row;
    width: 70%;
    padding-top: 10px;
    justify-content: center;
    margin: auto;
  }

  .calendar__bodyLi{
    list-style:none;
    width: 100px;
  }
</style>