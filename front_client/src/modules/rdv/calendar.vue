<template>
  <div calendarContainer>
    <b-card class="calendarContainer__card">
      <b-card-header class="cardhead">
        Sélectionnez votre RDV
      </b-card-header>
      
      <b-card-body class="cardbody">
        <b-container class="calendar">
          <b-row class="calendar__head">
            <b-button class="calendar__navicon"v-on:click="getPreviousDays()">
              <i class="material-icons">navigate_before</i class="material-icons">
              </b-button>
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
                <b-col class="calendar__bodyDay" v-for="(day,index) in dayRangeToDisplay" :key="index">
                <ul class="calendar__bodyUl"v-for="(button, index) in btnIdToDisplay" v-if="buttonIdIsInDay(day,button)" :key="index">
                  <li class="calendar__bodyLi"><b-button v-bind:class="classId[index]" v-bind:id="button" v-on:click="bookApt(button,calendarSlots)">{{button.id | buttonIdFormat}}</b-button></li>

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
import _ from 'underscore';

import { mapGetters } from 'vuex'

//setting local format and language
moment.locale('fr');


export default {
  name: 'calendar',
  // asyncComputed: {
  //   duration:{
  //     get(){
  //       return new Promise((resolve, reject)=>{
  //         setTimeout(() => resolve(this.$store.getters.selectedApt.duration), 1000);
  //       })
  //     },
  //     default:60
  //   }
  // },
  computed:{
    ...mapGetters([
      'calendarSlots', 'calendarId', 'selectedApt', 'calculateSelectedAptTypeDuration'
    ]),
    getDaysRange(){
      let start= this.getCurrentDay;
      let end = this.getCurrentDayPlus2month(moment(start));
      return this.getDaysOfTheTimeRange(start, end);
        //actually, the time range should be defined by the availabilities.
        //we will need to get the slots from the store for this and manipulate them to get the time range
        //similar function has already been implemented in back-office calendar
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
    return moment(this.apt.initialHour).add(this.selectedApt.duration, 'minute');
  }
  },
  data () {
    return {
      duration:null,
      hourList:[],
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
          duration:''
        }
      }
    }
  },
  mounted(){
    // console.log('je monte le component');
    // console.log('this.getDaysRange at mounted', this.getDaysRange);
    // console.log('this.calendarSlots at mounted', this.calendarSlots);
    // console.log('this.selectedApt at created', this.selectedApt.duration);
    // console.log('calculateSelectedAptTypeDuration at created', this.calculateSelectedAptTypeDuration);
    // console.log('this.duration at created', this.duration);
    this.generateHourList(this.calculateSelectedAptTypeDuration);
    this.displayCalendar();
  },
  methods: {
    displayCalendar: async function(){
      // this.createButtonId(this.getDaysRange)
      // .then(function () {
      //   this.updateButtonId(this.calendarSlots, this.buttonIdList)
      //   })
      // .catch(function (error) { 
      //   console.log(error)
      //   })
      await this.createButtonId(this.getDaysRange)
      //this is not ideal but at least it works for demo
      // setTimeout(this.updateButtonId(this.calendarSlots, this.buttonIdList), 5000);
      await this.updateButtonId(this.calendarSlots, this.buttonIdList)
    },
    getCurrentDayPlus2month: function(now){
      return moment(now).add(1,'month');
    },
    getDaysOfTheTimeRange: function(start,end){
      let arr = moment(start).twix(end).toArray('days');
      return arr;
    },
    getNextDays: function(){
      if (this.beginDisplay>=0){ this.beginDisplay += 3};
      this.filteredButtonIdList = [];
    },
    getPreviousDays: function(){
      if (this.beginDisplay>=3){this.beginDisplay -= 3}
      this.filteredButtonIdList = [];
    },
    generateHourList: function(duration){
      //this function, from a duration will generate an array with the list of hours to display
      //in the calendar for each day
        this.hourList = []
        let initialHour = moment(moment().startOf('day').add(8,'hour'));
        console.log(initialHour);
        let lastHour = moment(moment().startOf('day').add(18,'hour'));
        console.log(lastHour);
        for (let i=initialHour; i.isBefore(lastHour); i.add(duration, 'minute')){
          let hour = moment(i).format('HH:mm');
         this.hourList.push(hour);}
        console.log('this.hourList:', this.hourList);
        return this.hourList;
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
      if(this.hourList){
        console.log('jpl createButtonId');
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
      }
      else{
        console.log('sorry to keep you waiting');
      }
    },
    updateButtonId: function(slots, idList){
       // console.log('jpl updateButtonId');
       // console.log('slots:', slots);
       // console.log('idList: ', idList);
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
      // console.log('jpl filterButtonIdToDisplay');
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
    bookApt: function(button, slotlist){
      console.log('je clique sur le btn :', button);
      //si l'horaire est dispo( en classe A)
      //i need to call getmatchingInitial slots  
      //then duration so that i can gather all the slots and send them to back-end
      if (button.id.charAt(button.id.length - 1) == 'A'){
        this.apt.calendarId = this.calendarId;
        this.apt.appointmentType = this.selectedApt;
        this.getmatchingInitalSlot(button, this.calendarSlots);
        this.calendarSlotsInRange(slotlist,this.apt.initialHour,this.apt.endHour)
        let postBody = {
          calendarId:this.apt.calendarId,
          slotsId: _.pluck(this.apt.allSlots, '_id'),
          appointmentType:this.apt.appointmentType.name
          //voir avec Luke si OK ou s'il veut tout l'objet
        };
        console.log('postBody:', postBody);
        http.post('clients/appointment', postBody)
        .then(
            res => {
            console.log('res:',res);
            swal({
                  type: "success",
                  title: "Confirmation du RDV",
                  text: "Votre RDV a bien été confirmé, vous allez recevoir un mail de confirmation (fonctionnalité non effective pour l'instant"
                  });
            this.apt.allSlots = [];
            })
          .catch(
            error => {
              console.log('error:', error);
              swal({
                  type: "error",
                  title: "Confirmation du RDV",
                  text: "Votre RDV n'a pas pu être confirmé"
                  });
              });
            this.apt.allSlots = [];
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
            this.apt.endHour = this.getAptendHour
            console.log('this.apt.initialHour:', this.apt.initialHour);
            console.log('this.getAptendHour:', this.getAptendHour);
          }
        }
    },
    calendarSlotsInRange: function(slotList,start,end){
      for (let i=0; i<slotList.length; i++){
        if (moment(slotList[i].start).isBetween(start, end, null, '[)')){
          this.apt.allSlots.push(slotList[i]);
        }
      }
    }
  },
  filters:{
    dateFormatDayName (date) {
      return moment(date).format('dddd');
    },
    dateFormatDayNumberAndMonth (date) {
      return moment(date).format('D MMM');
    },
    dateFormatFullDayHour (date){
      return moment(date).format('LLLL');
    },
    buttonIdFormat (buttonID){
      let reg = /-/;
      let cutId = buttonID.slice(11,16);
      return cutId.replace(reg, ':');
    },
  }

};
</script>


<style scoped>
</style>