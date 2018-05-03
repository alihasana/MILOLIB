<template>
	<div>
		<div class="agenda">
			<div class="agendaHeader">
				<b-navbar-nav>
					<b-nav-form class="nav">
						<li class="navDisplay">
							<b-button variant="primary" size="sm" class="my-2 my-sm-0" type="submit"><i class="material-icons">today</i></b-button>
							<b-button variant="primary" size="sm" class="my-2 my-sm-0" type="submit"><i class="material-icons">view_week</i></b-button>
							<b-button variant="primary" size="sm" class="my-2 my-sm-0" type="submit"><i class="material-icons">view_module</i></b-button>
						</li>
						<li class="navNavigate">
							<b-button variant="primary" size="sm" class="my-2 my-sm-0" type="submit" v-on:click="getPreviousDays()"><i class="material-icons">navigate_before</i></b-button>
							<span class="weekNumber">Semaine {{weekNumber}}</span>
							<b-button variant="primary" size="sm" class="my-2 my-sm-0" type="submit" v-on:click="getNextDays()"><i class="material-icons">navigate_next</i></b-button>
						</li>
					</b-nav-form>
				</b-navbar-nav>
			</div>
			<div class="agendaBodyLeftPanel">
				<ul class="hour" v-for="(hour, index) in hourList" :key="index">
					<li class="hourli">{{hour}}</li>
				</ul>
			</div>
			<table class="agendaBody">
				<thead class="agendaBodyDays">
					<tr class="day" v-for="(day,index) in timeRangeToDisplay" :key="index">
						<p class="dayName">{{day | dateFormatDayName}}</p>
						<p class="dayNumber">{{day | dateFormatDayNumberAndMonth}}</p>
					</tr>
				</thead>
				<tbody class="agendaBodySlots">
					<tr class="buttonSlots" v-for="(day,index) in timeRangeToDisplay" :key="index">
						<ul class="slotUl" v-for="(button, index) in btnIdToDisplay" v-if="buttonIdIsInDay(day,button)" :key="index">
							<!-- <li class="slotLi"><b-button v-bind:class="classId[index]" v-bind:id="button" v-on:click="setAppointment(button,getSlots)">{{button.id}}</b-button></li> -->
							<li class="slotLi"><b-button v-b-modal.modalPrendreRDV v-on:click="getMatchingSlot(button,getSlots)" v-bind:class="classId[index]" v-bind:id="button" >{{button.id}}</b-button></li>
							<!-- il faudra faire en sorte qu'en fonction de la classe, la modal approprié s'ouvre pour proposer les fonctionalités, ou bien faire une modale multi action? -->
						</ul>
					</tr>
				</tbody>
			</table>
		</div>


		<!-- RDV POP-UP-->
		<div>
				<b-modal id="modalPrendreRDV" ref="modal" title="Creer un nouveau rendez-vous" v-bind:hide-footer="hideFooter" v-bind:cancel-disabled="cancelDisabled" v-bind:ok-disabled="okDisabled">
				<form @submit.stop.prevent="bookApt">
					<!-- heure du RDV -->
					<b-form-input type="text" v-model="matchingSlot.start" disabled=""></b-form-input>
					<!-- list -->
					<b-form-select v-model="formRDV.selectedTypeRDV" class="mb-3">
						<option value="" disabled>-- Sélectionnez un type de RDV --</option>
						<option v-for="eventType in getEventTypes"v-bind:value="eventType">{{eventType.name}}</option>
					</b-form-select>
					<div>Selected: <strong>{{ formRDV.selectedTypeRDV }}</strong></div>
					<!-- inputs -->
					<!-- <b-form-input type="text" placeholder="Nom" v-model="formRDV.lastNameRDV"></b-form-input>
					<b-form-input type="text" placeholder="Prénom" v-model="formRDV.firstNameRDV"></b-form-input>
					<b-form-input type="text" placeholder="Téléphone" v-model="formRDV.phoneRDV"></b-form-input> -->
					<b-form-input type="email" placeholder="E-mail" v-model="formRDV.mailRDV"></b-form-input>
					<!-- comment -->
					<b-form-textarea type="text" v-model="formRDV.textRDV" placeholder="Ajouter un commentaire" :rows="6" :max-rows="6">
					</b-form-textarea>
					<b-button type="submit" variant="primary">Submit</b-button>
      				<b-button type="reset" variant="danger">Reset</b-button>
				</form>
			</b-modal>
		</div> 

	</div>
</template>

<script>

/* eslint-disable */
import moment from 'moment';
import 'moment/locale/fr';
import { store } from '../../../store/store';
import * as cHelpers from '.././calendarHelpers';
import http from '../../../helpers/http';
import _ from 'underscore';
import swal from "sweetalert2";


//description of component
	//This component will display the conseiller agenda.
	// by default, 
	//the agenda is filled in with buttons with NonAvailable ids, for the next month
	// when the agenda get the 'available' or 'booked' slots from backend,
		//it will pass them to the store if no conflict
	//On click on some "available" button, a modal to create a RDV is opening


	//! WORK IN PROGRESS
	
	// TODO
	
export default {
	name: "agenda",
	computed:{
		getTimeRange(){
			return this.$store.state.agendaRangeTime;
		},
		endDisplay(){
			return cHelpers.limitDisplay('week', this.beginDisplay);
		},
		timeRangeToDisplay(){
			return this.getTimeRange.slice(this.beginDisplay, this.endDisplay)
		},
		getSlots(){
			return this.$store.state.agendaSlots;
		},
		week(){
			return cHelpers.getWeekNumber(this.$store.state.now);
		},
		btnIdToDisplay(){
			return this.filterButtonIdToDisplay(this.timeRangeToDisplay, this.buttonIdList);
		},
		classId(){
			return this.btnIdToDisplay.map(function(button){
				return button.class;
			});
		},
		getEventTypes(){
			return this.$store.state.eventTypes;
		},

	},
	data() {
		return {
      		hourList:['08:00','08:15','08:30','08:45','09:00','09:15', '09:30', '09:45',
      		'10:00','10:15','10:30','10:45','11:00','11:15','11:30','11:45','12:00','12:15','12:30','12:45','13:00','13:15','13:30','13:45','14:00','14:15','14:30','14:45', '15:00','15:15','15:30','15:45','16:00','16:15','16:30','16:45','17:00','17:15','17:30','17:45'],
      		day:'',
      		weekNumber:'',
      		beginDisplay:'',
      		buttonId:'',
      		buttonIdList:[],
      		buttonClass :'',
      		filteredButtonIdList: [],
      		matchingSlot:'',
      		eventType:{},
      		formRDV:{
      			selectedTypeRDV:'',
      			// lastNameRDV:'',
      			// firstNameRDV:'',
      			// phoneRDV:'',
      			mailRDV:'',
      			textRDV:'',
      			initialSlot:'',
      			allSlots:[]
      		},
      		cancelDisabled:true,
      		okDisabled:true,
      		hideFooter:true
      	}
	},
	created(){
		this.beginDisplay = 0;
		this.weekNumber = cHelpers.filterInt(this.week);
		http.get('/calendar')
					.then(
						res => {
						console.log('res:',res);
						this.$store.commit('getSlotsAvailables', res.data.content.slots);
						this.$store.commit('getEventTypes', res.data.content.appointmentTypes);
						this.buttonIdList =[];
						this.createButtonId(this.getTimeRange);
						this.updateButtonId(this.getSlots, this.buttonIdList);
						})
					.catch(
						error => {
					    // console.log('error:', error.response.data.message);
					    swal({
			            type: "error",
			            title: "probleme de mise à jour",
			            text: "Votre agenda n'a pas pu être mis à jour"
			          	});
					});
	},
	methods: {
		createButtonId: function(timeRange){
			//based on a timeRange of days, and based on the hours to display in agenda
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
		buttonIdIsInDay: function(day,btn){
			// this is a conditional function, called in V-for to display under the day only the button with ID matching the day
			let a = moment(day).format('YYYY-MM-DD').toString();
			let b = btn.id.slice(0,10);
			if(a == b) {
				return true;
			}
		},
		getNextDays: function(){
			this.beginDisplay += 7;
			this.weekNumber +=1;
			this.filteredButtonIdList = [];
		},
		getPreviousDays: function(){
			this.beginDisplay -= 7;
			this.weekNumber -=1;
			this.filteredButtonIdList = [];
		},
		getMatchingSlot: function(btn, slots){
			console.log('j actionne le buttonId', btn);
			// if (btn.id.charAt(btn.id.length - 1) == 'A'){
				for (let i=0; i<slots.length; i++){
					let sl = moment(slots[i].start).format('YYYY-MM-DD-HH-mm').toString();
					let id = btn.id.slice(0,16);
					if (sl == id){
						this.matchingSlot = slots[i];
						console.log('the matching slot is:', this.matchingSlot);
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
		bookApt(){
			//from the initial slot selected and the duration of the meeting, i create a time range and i check wich slots is belonging to this time range.
			this.formRDV.allSlots=[];
			this.formRDV.initialSlot = this.matchingSlot;
			let startRDV = moment(this.formRDV.initialSlot.start);
			let endRDV = moment(startRDV).add(this.formRDV.selectedTypeRDV.duration, 'minutes');
			this.getSlotsInRange(this.getSlots,startRDV,endRDV);
			let postBody = {
			  mailClient: this.formRDV.mailRDV,
			  slotsId: _.pluck(this.formRDV.allSlots, '_id'),
			  appointmentType: this.formRDV.selectedTypeRDV,
			  description: this.formRDV.textRDV
			}
			console.log('postBody: ', postBody);
			this.$refs.modal.hide()
			
			http.post('/calendar/appointment', postBody)
					.then(
						res => {
						console.log('res:',res);
						swal({
			            type: "success",
			            title: "Votre RDV a bien été crée: OK!"
			          	});
						this.$router.push({name: 'calendar'});
						// when redirected to agenda, a new http.get/calendar will be done, which will update the slots.
						})
					.catch(
						error => {
					    // console.log('error:', error.response.data.message);
					    swal({
			            type: "error",
			            title: "Votre RDV n'a pas été crée"
			          	});
					});
		}
	},
	filters: {
		dateFormatFull: function(date) {
			return moment(date).format('DD/MM/YYYY');
		},
		dateFormatYear: function(date) {
			return moment(date).format('YYYY');
		},
		dateFormatDayName: function(date) {
			return moment(date).format('dddd');
		},
		dateFormatDayNumberAndMonth: function(date) {
			return moment(date).format('D MMM');
		},
		formatTime: function(date) {
			return moment(date).format('LT');
		},
		formatDayHour: function(date) {
			return moment(date).format('lll');
		}
	}
};
</script>

<style scoped>
/*******Agenda structure*******/

.agenda{
	display: flex;
  	flex-flow: row wrap;
}

.agendaHeader{
	background-color: #007bff;
	width: 100%;
}

.agendaBodyLeftPanel{
	/*background-color: blue;*/
	flex-direction:column;
	width: 7%;
	margin-top: 5vw;
}

.agendaBodyDays{
	display: flex;
	flex-direction:row;
	text-align: center;
	height: 5vw;
}

.agendaBody{
	/*flex-direction:row;*/
	width: 93%
}

.agendaBodySlots{
	display: flex;
	flex-direction:row;
	text-align: center;
}

/*******Agenda header *******/

.nav{
	display: flex;
	flex-direction:row;
	justify-content: space-between;
}

.navNavigate {
	float: right;
	margin-right: 50px;
	/*background-color: yellow;
	padding: 5px;*/
}

.navDisplay {
	float: left;
	/*background-color: pink;
	padding: 5px;*/
}


.weekNumber{
	font-weight: bold;
	font-size: 14px;
	color: white;
}


/*******Agenda left hours *******/

.hour{
	float: left;
	width: 100%;
	text-align: middle;
}

.hourli{
	list-style:none;
	padding-top: 6px;
	height: 22px;
    margin-bottom: 0px;
    margin-top: 0px;
    vertical-align: center;
}


/*******Agenda top days *******/

.day{
	width:12%;
	padding: 0px;
	margin-bottom: 0px;
}

.dayName{
	font-weight: bold;
	font-size: 14px;
	margin-bottom: 0px;
	margin-top: 8px;
}

.dayNumber{
	font-weight: bold;
	font-size: 11px;
	margin-bottom: 0px;
}

/*******Agenda button slots *******/


.buttonSlots{
	width:12%;
	padding: 0px;
	margin:0px;
	/*height: 800px;*/
}

.slotUl{
	list-style:none;
	margin: 0;
}

.slotLi {
	margin: 0;
	width: 100%;
	padding: 0;
}

.A{
	border-top: 1px dotted #e5e5e5;
	border-bottom:1px dotted #e5e5e5;
	border-left: 1px solid #d4d4d4;
    border-right: 1px solid #d4d4d4;
	background-color: white;
	color:grey;
  	border-radius:0;
  	width: 100%;
    height: 8px;
    margin-bottom: 0px;
    margin-top: 0px;
}

.N{
	border-top: 1px dotted #e5e5e5;
	border-bottom:1px dotted #e5e5e5;
	border-left: 1px solid #d4d4d4;
    border-right: 1px solid #d4d4d4;
	background-color: #BEBEBE;
	color:#888888;
  	border-radius:0;
  	width: 100%;
    height: 8px;
    margin-bottom: 0px;
    margin-top: 0px;
}

.B{
	border-top: 1px dotted #e5e5e5;
	border-bottom:1px dotted #e5e5e5;
	border-left: 1px solid #d4d4d4;
    border-right: 1px solid #d4d4d4;
	background-color: #9900FF;
  	border-radius:0;
  	width: 100%;
    height: 8px;
    margin-bottom: 0px;
    margin-top: 0px;
}
</style>