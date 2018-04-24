<template>
	<div>
		<!-- <h5>{{$store.state.hello}}</h5>
				<h5>Today: {{$store.state.now | dateFormatFull}}</h5>
				<h5>DefaultTimeRange: {{$store.state.agendaRangeTime}}</h5> -->
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
					<tr class="day" v-for="(day,index) in TimeRangeToDisplay" :key="index">
						<p class="dayName">{{day | dateFormatDayName}}</p>
						<p class="dayNumber">{{day | dateFormatDayNumberAndMonth}}</p>
					</tr>
				</thead>
				<tbody class="agendaBodySlots">
					<tr class="buttonSlots" v-for="(day,index) in TimeRangeToDisplay" :key="index">
						<ul class="slotUl" v-on:buttonsIdsUpdated="updateButtons($event)" v-for="(buttonId, index) in buttonIdList" v-if="buttonIdIsInDay(day,buttonId)" :key="index">
							<li class="slotLi">
								<b-button v-bind:class="changeClassButton(buttonId)" v-bind:id="buttonId" v-on:click="setAppointment(buttonId,getSlots)">{{buttonId}}</b-button>
							</li>
							<!-- <li class="slotLi"><b-button v-bind:class="changeClassButton(buttonId)" v-bind:id="buttonId" v-on:click="setAppointment(buttonId,agendaSlotPropC)">{{buttonId}}</b-button></li> -->
	
						</ul>
					</tr>
				</tbody>
			</table>
		</div>
	
	
		<!-- RDV POP-UP-->
		<div>
						<!-- button -->
			<b-btn v-b-modal.modalPrevent>Fixer un RDV</b-btn>
						<!-- Modal Component -->
			<b-modal id="modalPrevent" ref="modal" title="Fixer un nouveau rendez-vous" @ok="handleOk" @shown="clearName">
				<form @submit.stop.prevent="handleSubmit">
					<b-form-input type="text" placeholder="Heure du rdv" v-model="name" disabled=""></b-form-input>
						<!-- list -->
					<b-form-group id="" label="Type de rdv:" label-for="">
						<b-form-select id="" :options="rdv" required v-model="form.rdv">
						</b-form-select>
					</b-form-group>
						<!-- inputs -->
					<b-form-input type="text" placeholder="Nom" v-model="name"></b-form-input>
					<b-form-input type="text" placeholder="Prénom" v-model="name"></b-form-input>
					<b-form-input type="text" placeholder="Téléphone" v-model="name"></b-form-input>
					<b-form-input type="email" placeholder="E-mail" v-model="name"></b-form-input>
						<!-- comment -->
					<b-form-textarea type="text" placeholder="Ajouter un commentaire" :rows="6" :max-rows="6">
					</b-form-textarea>
	
				</form>
			</b-modal>
		</div>
	
	</div>
</template>

<script>
	/* eslint-disable */
	import moment from 'moment';
	import 'moment/locale/fr';
	import {
		store
	} from '../../../store/store';
	import * as cHelpers from '.././calendarHelpers';
	import http from '../../../helpers/http';
	import _ from 'underscore';
	
	
	//description of component
	//This component will display the conseiller agenda.
	// by default, 
	//the agenda is filled in with buttons with NonAvailable ids, for the next month
	// when the agenda get the 'available' rangeTime and slots from backend,
	//it will update the display on the current agenda if no conflict
	
	//! WORK IN PROGRESS
	
	// TODO
	
	export default {
	
		name: "agenda",
		props: ['agendaSlotPropC'],
		computed: {
			getTimeRange() {
				return this.$store.state.agendaRangeTime;
			},
			endDisplay() {
				return cHelpers.limitDisplay('week', this.beginDisplay);
			},
			TimeRangeToDisplay() {
				return this.getTimeRange.slice(this.beginDisplay, this.endDisplay)
			},
			week() {
				return cHelpers.getWeekNumber(this.$store.state.now);
			},
			// getSlots(){
			// 	return this.$store.commit('updateSlots',agendaSlots);
			// }
		},
		data() {
			return {
				hourList: ['08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45',
					'10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00'
				],
				day: '',
				weekNumber: '',
				beginDisplay: '',
				buttonId: '',
				buttonIdList: [],
				newButtonIdList: [],
				buttonClass: '',
				slotsInA: [],
				form: {
					rdv: null
				},
				rdv: [{
						text: 'Choisir un type de rendez-vous',
						value: null
					},
					'Suivi emploi', 'Suivi formation', 'Suivi projet pro', 'Aides financières', 'Apprentisage', 'Autres'
				]
	
			};
		},
		created() {
			console.log('this week:', this.week)
			this.beginDisplay = 0;
			this.weekNumber = cHelpers.filterInt(this.week);
			// this.slotsInA = this.getSlots;
			// this.slotsInA = this.agendaSlotPropC;
			this.updateAgenda(this.getTimeRange, this.slotsInA);
			//for now only to test we will get back the slots from Calendar component.
			//as soon as route ok, we will retreive the slots from back end
			http.get('/calendar')
				.then(
					res => {
						console.log('res:', res);
						// this.slotsInA = res.data;
						//here we will get the back the slots and launch an update agenda function
					})
				.catch(
					error => {
						console.log('error:', error);
						//should display message to user that there is an error
					});
		},
		methods: {
			updateAgenda: function(timeRange, slots) {
				//this function will take timeRange and Slots as parameters, and will be launched after hhtp.GET
				if (slots) {
					this.createButtonId(timeRange);
					this.updateButtonId(slots, this.buttonIdList);
				} else {
					this.createButtonId(timeRange);
				}
			},
			createButtonId: function(timeRange) {
				//is launched in updateAgenda
				//based on a timeRange of days, and based on the hours to display in agenda
				//this function create buttons with Id representatives of the date, hour.
				//by default, they also represent status N( Non available)
				let reg = /:/;
				for (let i = 0; i < timeRange.length; i++) {
					for (let j = 0; j < this.hourList.length; j++) {
						let id;
						id = moment(timeRange[i]).format('YYYY-MM-DD').toString() + '-' + this.hourList[j] + '-' + 'N';
						this.buttonId = id.replace(reg, '-');
						this.buttonIdList.push(this.buttonId);
					}
				}
				console.log('buttonIdList:', this.buttonIdList);
				return this.buttonIdList;
			},
			buttonIdIsInDay: function(day, id) {
				// this is a conditional function, called in V-for to display under the day only the button with ID matching the day
				let a = moment(day).format('YYYY-MM-DD').toString();
				let b = id.slice(0, 10);
				if (a == b) {
					return true;
				}
			},
			updateButtonId: function(slots, idList) {
				//this function will update ButtonID based on slots status.
				for (let i = 0; i < slots.length; i++) {
					for (let j = 0; j < idList.length; j++) {
						let sl = moment(slots[i].start).format('YYYY-MM-DD-HH-mm').toString();
						let id = idList[j].slice(0, 16);
						if (sl == id) {
							console.log('here are the buttonsIds that should be modified:', idList[j]);
							if (slots[i].status == 'Available') {
								idList[j] = idList[j].slice(0, 16) + '-' + 'A';
							}
							if (slots[i].status == 'NonAvailable') {
								idList[j] = idList[j].slice(0, 16) + '-' + 'N';
							}
							if (slots[i].status == 'Booked') {
								idList[j] = idList[j].slice(0, 16) + '-' + 'B';
							}
						}
					}
				}
				this.$emit('buttonsIdsUpdated', idList);
				console.log('les buttonId sont updatés!:', idList);
			},
			updateButtons: function(newList) {
				//this function enable to update the display further to listening the event'buttonsIdsUpdated'
				this.buttonIdList = newList;
			},
			changeClassButton: function(btnId) {
				// console.log('je veux changer la classe de mes boutons!');
				if (btnId.charAt(btnId.length - 1) == 'A') {
					this.buttonClass = 'Available';
					// console.log(' buttonClass: ', this.buttonClass);
					return this.buttonClass;
				}
				if (btnId.charAt(btnId.length - 1) == 'B') {
					this.buttonClass = 'Booked';
					// console.log(' buttonClass: ', this.buttonClass);
					return this.buttonClass;
				} else {
					this.buttonClass = 'NonAvailable';
					// console.log(' buttonClass: ', this.buttonClass);
					return this.buttonClass;
				}
			},
			getNextDays: function() {
				this.beginDisplay += 7;
				this.weekNumber += 1;
			},
			getPreviousDays: function() {
				this.beginDisplay -= 7;
				this.weekNumber -= 1;
			},
			setAppointment: function(btnId, slots) {
				console.log('je souhaite prendre RDV, j actione le buttonId', btnId);
				let matchingSlot = '';
				//et je vais envoyer au back le slot correspondant, en lui demandant de vérifier
				//s'il est bien disponible. Si oui il le passe en booked avant de me le renvoyer
				if (btnId.charAt(btnId.length - 1) == 'A') {
					for (let i = 0; i < slots.length; i++) {
						let sl = moment(slots[i].start).format('YYYY-MM-DD-HH-mm').toString();
						let id = btnId.slice(0, 16);
						if (sl == id) {
							matchingSlot = slots[i];
							console.log('the matching slot is:', matchingSlot);
							let postBody = matchingSlot;
							console.log('postBody: ', postBody);
							http.post('/???', postBody)
							// 		.then(
							// 			res => {
							// 			console.log('res:',res);
							// 			//display message that the booking is OK
							// this.updateButtonId(res.data,btnId);
							// this.changeClassButton (btnId);
							// 			})
							// 		.catch(
							// 			error => {
							// 		    console.log('error:', error);
							// 		    //should display message to user that the selected period/range time has already 'booked' slots
							// 		});
							let newBtnId = btnId.slice(0, 16) + '-' + 'B';
							let newButtonIdList = _.without(this.buttonIdList, btnId);
							console.log('old buttonId:', btnId);
							console.log('new ButtonID is:', newBtnId);
							newButtonIdList.push(newBtnId);
							newButtonIdList.sort();
							this.$emit('buttonsIdsUpdated', newButtonIdList);
							console.log('newbuttonIdList:', newButtonIdList);
							this.updateAgenda(this.agendaRangeInA, this.slotsInA);
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
	
	.agenda {
		display: flex;
		flex-flow: row wrap;
	}
	
	.agendaHeader {
		background-color: #007bff;
		width: 100%;
	}
	
	.agendaBodyLeftPanel {
		/*background-color: blue;*/
		flex-direction: column;
		width: 7%;
		margin-top: 5vw;
	}
	
	.agendaBodyDays {
		display: flex;
		flex-direction: row;
		text-align: center;
		height: 5vw;
	}
	
	.agendaBody {
		/*flex-direction:row;*/
		width: 93%
	}
	
	.agendaBodySlots {
		display: flex;
		flex-direction: row;
		text-align: center;
	}
	
	
	/*******Agenda header *******/
	
	.nav {
		display: flex;
		flex-direction: row;
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
	
	.weekNumber {
		font-weight: bold;
		font-size: 14px;
		color: white;
	}
	
	
	/*******Agenda left hours *******/
	
	.hour {
		float: left;
		width: 100%;
		text-align: middle;
	}
	
	.hourli {
		list-style: none;
		padding-top: 6px;
		height: 22px;
		margin-bottom: 0px;
		margin-top: 0px;
		vertical-align: center;
	}
	
	
	/*******Agenda top days *******/
	
	.day {
		width: 12%;
		padding: 0px;
		margin-bottom: 0px;
	}
	
	.dayName {
		font-weight: bold;
		font-size: 14px;
		margin-bottom: 0px;
		margin-top: 8px;
	}
	
	.dayNumber {
		font-weight: bold;
		font-size: 11px;
		margin-bottom: 0px;
	}
	
	
	/*******Agenda button slots *******/
	
	.buttonSlots {
		width: 12%;
		padding: 0px;
		margin: 0px;
		/*height: 800px;*/
	}
	
	.slotUl {
		list-style: none;
		margin: 0;
	}
	
	.slotLi {
		margin: 0;
		width: 100%;
		padding: 0;
	}
	
	.Available {
		border-top: 1px dotted #e5e5e5;
		border-bottom: 1px dotted #e5e5e5;
		border-left: 1px solid #d4d4d4;
		border-right: 1px solid #d4d4d4;
		background-color: pink;
		color: grey;
		border-radius: 0;
		width: 100%;
		height: 8px;
		margin-bottom: 0px;
		margin-top: 0px;
	}
	
	.NonAvailable {
		border-top: 1px dotted #e5e5e5;
		border-bottom: 1px dotted #e5e5e5;
		border-left: 1px solid #d4d4d4;
		border-right: 1px solid #d4d4d4;
		background-color: #F8F8F8;
		color: #888888;
		border-radius: 0;
		width: 100%;
		height: 8px;
		margin-bottom: 0px;
		margin-top: 0px;
	}
	
	.Booked {
		border-top: 1px dotted #e5e5e5;
		border-bottom: 1px dotted #e5e5e5;
		border-left: 1px solid #d4d4d4;
		border-right: 1px solid #d4d4d4;
		background-color: #9900FF;
		border-radius: 0;
		width: 100%;
		height: 8px;
		margin-bottom: 0px;
		margin-top: 0px;
	}
</style>