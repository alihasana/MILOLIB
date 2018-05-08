<template>
  <div calendarContainer>
    <!-- <div>{{this.$store.state.test}}</div>
    <div>{{this.$store.state.calendarId}}</div>
    <div>{{this.$store.state.calendarSlots}}</div>
    <div>{{this.$store.state.appointmentTypes}}</div>
    <button class="btn btn-lg btn--white" v-on:click="updateStore()">updateStore</button> -->
    <b-card class="calendarContainer__card">
      <b-card-header class="cardhead">
        Sélectionnez votre RDV
        <!-- <div>
          display ID from computed: {{ getCalendarId }}
          <br>
          display Types from computed: {{ getappointmentType }}
          <br>
          display Slots from computed: {{ getSlots }}
        </div> -->
      </b-card-header>
      
      <b-card-body class="cardbody">
        <b-container class="calendar">
          <b-row class="calendar__head">
            <b-button class="calendar__navicon"v-on:click="getPreviousDays()">
              <i class="material-icons">navigate_before</i class="material-icons">
              </b-button>
              <!-- affichage de la date -->
              <b-col class="calendar__headDays" v-for="(day,index) in dayRangeToDisplay" :key="index">
                <ul class="calendar__headDayUl">
                  <li class="calendar__headDayLi">{{day | dateFormatDayName}}</li>
                  <li class="calendar__headDayLi">{{day | dateFormatDayNumberAndMonth}}</li>
                </ul>
              </b-col>
              <b-button class="calendar__navicon" v-on:click="getNextDays()">
                <i class="material-icons">navigate_next</i class="material-icons">
                </b-button>
              </b-row>
              <b-row class="calendar__body">
                <!-- affichage des boutons heures -->
                <b-col class="calendar__bodyDay" v-for="(day,index) in dayRangeToDisplay" :key="index">
                <ul class="calendar__bodyUl"v-for="(button, index) in btnIdToDisplay" v-if="buttonIdIsInDay(day,button)" :key="index">
                  <!-- <li class="calendar__bodyLi"><b-button v-bind:class="classId[index]" v-bind:id="button" v-on:click="bookApt(button)">{{button.id | buttonIdFormat}}</b-button></li> -->
                  <!-- A decommenter et prendre à la place du dessus quand getSlots fonctionne. -->
                  <li class="calendar__bodyLi"><b-button v-bind:class="classId[index]" v-bind:id="button" v-on:click="bookApt(button,getSlots)">{{button.id | buttonIdFormat}}</b-button></li>

                </ul>
              </b-col>
            </b-row>
          </b-container>
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
import { mapGetters } from 'vuex'

import { store } from '../../store/store';
//setting local format and language
moment.locale('fr');


export default {
  name: 'calendar',
  // props:['visibleProp'],
  data () {
    return {
      duration:30,
      // duration:'',
      hourList:[],
      //the hours will be dynamically generated from the duration of the appointments.
      //the duration and name of apointmentTypes will be retreived from the store, for now it has been set in an arbitrary
      hour:'',
      day:'',
      beginDisplay:0,
      button:'',
      buttonIdList:[],
      filteredButtonIdList: [],
      matchingInitalSlot:'',
      apt:{
        calendarId:'',
        initialHour:'',
        endHour:this.getAptendHour,
        allSlots:[],
        appointmentType:{
          name:'',
          duration:'',
        }
        
      }
    }
  },
  computed:{
    // getRdv() { 
    //   return this.$store.state.rdv
    // },
    // ...mapGetters(['getRdv']),
    getCurrentDay(){
      return moment();
    },
    getDaysRange(){
      let start= this.getCurrentDay;
      let end = this.getCurrentDayPlus2month(moment(start));
      return this.getDaysOfTheTimeRange(start, end);
      //actually, the time range should be defined by the availabilities.
      //we will need to get the slots from the store for this and manipulate them to get the time range
      //similar function has already been implemented in back-office calendar
    },
    getSlots(){
      return this.$store.state.calendarSlots;
    },
    getHourList(){
      this.hourList = this.generateHourList(this.this.apt.appointmentType.duration);
      this.hourList = this.generateHourList(this.duration);
    },
    getappointmentType(){
    // the duration and name will come from the store.
      return this.apt.appointmentType = this.$store.state.appointmentTypes;
    },
    getCalendarId(){
      // the calendarId will come from the store
        return this.apt.calendarId = this.$store.state.calendarId;
    },
    endDisplay(){
      return this.beginDisplay+3;
    },
    dayRangeToDisplay(){
      return this.getDaysRange.slice(this.beginDisplay,this.endDisplay);
    },
    btnIdToDisplay(){
      return this.filterButtonIdToDisplay(this.dayRangeToDisplay, this.buttonIdList);
    },
    classId(){
      return this.btnIdToDisplay.map(function(button){
        return button.class;
      });
    },
    getAptendHour(){
      return moment(this.apt.initialHour).add(this.apt.appointmentType.duration, minute)
    }
  },
  created(){
    this.hourList = this.generateHourList(this.duration);
    this.createButtonId(this.getDaysRange);
  },
  methods:{
    // updateStore(){
          //  this.$store.commit('getCalendarId', this.test);
        //   this.$store.commit('getCalendarId', this._id);
        //   this.$store.commit('getSlots', this.slots);
        //   this.$store.commit('getappointmentType', this.appointmentTypes);
        // },
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
    bookApt(button, slotlist){
      console.log('je clique sur le btn :', button);
      //si l'horaire est dispo( en classe A)
      //i need to call getmatchingInitial slots  
      //then duration so that i can gather all the slots and send them to back-end
      if (button.id.charAt(button.id.length - 1) == 'A'){
        this.getmatchingInitalSlot(button, this.getSlots);
        this.getSlotsInRange(slotList,this.apt.initialHour,this.apt.endHour)
        let postBody = {
          calendarId:this.apt.calendarId,
          slots:this.apt.allSlots,
          appointmentType:this.apt.appointmentType
        };
        console.log('postBody:', postBody);
        http.post('client/appointment', postBody)
        .then(
            res => {
            console.log('res:',res);
            swal({
                  type: "success",
                  title: "Confirmation du RDV",
                  text: "Votre RDV a bien été confirmé, vous allez recevoir un mail de confirmation (fonctionnalité non effective pour l'instant"
                  });
            })
          .catch(
            error => {
              console.log('error:', error.response.data.message);
              swal({
                  type: "error",
                  title: "Confirmation du RDV",
                  text: "Votre RDV n'a pas pu être confirmé"
                  });
              });


        //voir avec Anas que ces fonctions s'executent bien l'une quand l'autre est finie, car le résultat de la deuxième dépend de la premiere
      }
      
      
    },
    getmatchingInitalSlot: function(btn, slots){
      console.log('j actionne le buttonId', btn);
        for (let i=0; i<slots.length; i++){
          let sl = moment(slots[i].start).format('YYYY-MM-DD-HH-mm').toString();
          let id = btn.id.slice(0,16);
          if (sl == id){
            this.matchingInitalSlot = slots[i];
            console.log('the matching slot is:', this.matchingInitalSlot);
            this.apt.initialHour = this.matchingInitalSlot.start;
          }
        }
    },
    getSlotsInRange: function(slotList,start,end){
      for (let i=0; i<slotList.length; i++){
        if (moment(slotList[i].start).isBetween(start, end, null, '[)')){
          this.apt.allSlots.push(slotList[i]);
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
    },
    buttonIdFormat: function(buttonID){
      let reg = /-/;
      let cutId = buttonID.slice(11,16);
      return cutId.replace(reg, ':');
    }
  }
};

</script>

<style scoped>

</style>