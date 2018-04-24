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
						<ul class="slotUl" v-for="(buttonId, index) in buttonIdList" v-if="buttonIdIsInDay(day,buttonId)" :key="index">
							<li class="slotLi"><b-button v-bind:class="changeClassButton(buttonId)" v-bind:id="buttonId" v-on:click="setAppointment(buttonId,getSlots)">{{buttonId}}</b-button></li>
						</ul>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- RDV POP-UP-->
		<div>
			<!-- button -->
			<!-- <b-btn v-b-modal.modalPrevent>Fixer un RDV</b-btn> -->
			<!-- Modal Component -->
			<!-- <b-modal id="modalPrevent" ref="modal" title="Fixer un nouveau rendez-vous" @ok="handleOk" @shown="clearName">
				<form @submit.stop.prevent="handleSubmit">
					<b-form-input type="text" placeholder="Heure du rdv" v-model="name" disabled=""></b-form-input> -->
					<!-- list -->
					<!-- <b-form-group id="" label="Type de rdv:" label-for="">
						<b-form-select id="" :options="rdv" required v-model="form.rdv">
						</b-form-select>
					</b-form-group> -->
					<!-- inputs -->
					<!-- <b-form-input type="text" placeholder="Nom" v-model="name"></b-form-input>
					<b-form-input type="text" placeholder="Prénom" v-model="name"></b-form-input>
					<b-form-input type="text" placeholder="Téléphone" v-model="name"></b-form-input>
					<b-form-input type="email" placeholder="E-mail" v-model="name"></b-form-input> -->
					<!-- comment -->
					<!-- <b-form-textarea type="text" placeholder="Ajouter un commentaire" :rows="6" :max-rows="6">
					</b-form-textarea>
				</form>
			</b-modal> -->
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
		}
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
      		form: {
					rdv: null
				},
			rdv: [{
					text: 'Choisir un type de rendez-vous',
					value: null
				},
				'Suivi emploi', 'Suivi formation', 'Suivi projet pro', 'Aides financières', 'Apprentisage', 'Autres'
			]
      	}
	},
	created(){
		this.beginDisplay = 0;
		this.weekNumber = cHelpers.filterInt(this.week);
		// this.updateAgenda(this.timeRangeToDisplay, this.getSlots, this.buttonIdList);
		this.updateAgenda(this.getTimeRange, this.getSlots, this.buttonIdList);
		http.get('/calendar')
					.then(
						res => {
						console.log('res:',res);
						//here we will get the back the slots and pass them to the store
						// this.$store.commit('getSlotsAvailables', res.data);
						})
					.catch(
						error => {
					    console.log('error:', error.response.data.message);
					    swal({
			            type: "error",
			            title: "probleme de mise à jour",
			            text: "Votre agenda n'a pas pu être mis à jour"
			          	});
					});
	},
	methods: {
		updateAgenda: function(timeRange, slots, list){
			this.createButtonId(timeRange);
			// this.updateButtonId(slots, list)
		},
		createButtonId: function(timeRange){
			//is launched in updateAgenda
			//based on a timeRange of days, and based on the hours to display in agenda
			//this function create buttons with Id representatives of the date, hour.
			//by default, they also represent status N( Non available)
			let reg = /:/;
			for (let i=0; i<timeRange.length; i++){
				for(let j=0; j<this.hourList.length; j++){
					let id;
					id = moment(timeRange[i]).format('YYYY-MM-DD').toString()+ '-' + this.hourList[j]+ '-' +'N';
					id = id.replace(reg, '-');
					this.buttonIdList.push(id);
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
					let id = idList[j].slice(0,16);
					if (sl == id) {
						console.log('here are the buttonsIds that should be modified:', idList[j]);
						if(slots[i].available === true){
							idList[j]=idList[j].slice(0,16)+'-'+'A';
						}
						if(slots[i].available === false){
							idList[j]=idList[j].slice(0,16)+'-'+'B';
						}
					}
				}
			}
		},
		buttonIdIsInDay: function(day,id){
			// this is a conditional function, called in V-for to display under the day only the button with ID matching the day
			let a = moment(day).format('YYYY-MM-DD').toString();
			let b = id.slice(0,10);
			if(a == b) {
				return true;
			}
		},
		changeClassButton : function(btnId){
			// console.log('je veux changer la classe de mes boutons!');
			if (btnId.charAt(btnId.length - 1) == 'A'){
				this.buttonClass = 'Available';
				// console.log(' buttonClass: ', this.buttonClass);
				return this.buttonClass;
			}
			if (btnId.charAt(btnId.length - 1) == 'B'){
				this.buttonClass = 'Booked';
				// console.log(' buttonClass: ', this.buttonClass);
				return this.buttonClass;
			}
			else {
				this.buttonClass = 'NonAvailable';
				// console.log(' buttonClass: ', this.buttonClass);
				return this.buttonClass;
			}
		},
		getNextDays: function(){
			this.beginDisplay += 7;
			this.weekNumber +=1;
			// this.buttonIdList = [];
			// this.updateAgenda(this.timeRangeToDisplay, this.getSlots, this.buttonIdList);
		},
		getPreviousDays: function(){
			this.beginDisplay -= 7;
			this.weekNumber -=1;
			// this.buttonIdList = [];
			// this.updateAgenda(this.timeRangeToDisplay, this.getSlots, this.buttonIdList);
		},
		setAppointment: function(btnId, slots){
			console.log('je souhaite prendre RDV, j actione le buttonId', btnId);
			let matchingSlot = '';
			//et je vais envoyer au back le slot correspondant, en lui demandant de vérifier
			//s'il est bien disponible. Si oui il le passe en booked avant de me le renvoyer
			if (btnId.charAt(btnId.length - 1) == 'A'){
				for (let i=0; i<slots.length; i++){
					let sl = moment(slots[i].start).format('YYYY-MM-DD-HH-mm').toString();
					let id = btnId.slice(0,16);
					if (sl == id){
						matchingSlot = slots[i];
						console.log('the matching slot is:', matchingSlot);
						//il faudra aussi récupérer les infos du jeune(nom prenom mail)
						let postBody = matchingSlot;
						console.log('postBody: ', postBody);
						// http.post('/???', postBody)
						// 		.then(
						// 			res => {
						// 			console.log('res:',res);
						// 			swal({
						//             type: "success",
						//             title: "Votre RDV a bien été crée: OK!"
						//           	});
						// 			this.$router.push({name: 'agenda'});
						//			when redirected to agenda, a new http.get/calendar will be done, which will update the slots.
						// 			})
						// 		.catch(
						// 			error => {
						// 		    console.log('error:', error.response.data.message);
						// 		    swal({
						//             type: "error",
						//             title: "Votre RDV n'a pas été crée"
						//           	});
						// 		});

					}
				}
			}
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

.Available{
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

.NonAvailable{
	border-top: 1px dotted #e5e5e5;
	border-bottom:1px dotted #e5e5e5;
	border-left: 1px solid #d4d4d4;
    border-right: 1px solid #d4d4d4;
	background-color: #F8F8F8;
	color:#888888;
  	border-radius:0;
  	width: 100%;
    height: 8px;
    margin-bottom: 0px;
    margin-top: 0px;
}

.Booked{
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