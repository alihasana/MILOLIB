<template>
	<div>
		<h5>{{ msg }}</h5>
		<div class="panel-body">
			<div class="row">
				<div class="col-md-2 col-sm-6 col-xs-12" v-for="day in agendaRangeProp">
					
					<table class="table table-hover">
						<thead>
							<tr>
								<th>{{day | dateFormatText}}</th>
							</tr>
						</thead>
						<tbody>
							<!-- <tr class="slotIsInDay(day)" v-for="slot in slotsInA" > -->
							<!-- <tr v-for="slot in slotsInA" v-if="slotIsInDay(day, slot)">
								day: {{day | dateFormatFull}}
								slot.isInDay: {{slot.isInDay | dateFormatFull}}
							</tr> -->
							<!-- <tr v-for="slot in slotsInA" :key="slot.isInDay">
								<template v-if="slotIsInDay(day,slotsInA)">
								day: {{day | dateFormatFull}}
								slot.isInDay: {{slot.isInDay | dateFormatFull}}
								</template>
							</tr> -->
							<tr v-for="slot in slotsInAFiltered" >
								day: {{day | dateFormatFull}}
								slot.isInDay: {{slot.isInDay | dateFormatFull}}
							</tr>
						</tbody>
					</table>
				<!-- 	<button v-on:click="slotIsInDay(day)">click me</button> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import moment from 'moment';
import 'moment/locale/fr';
import * as cHelpers from '.././calendarHelpers';


//description of component
	//This component vill set up an agenda, 
	// - sets the days list in the agenda onclik action in datePicker component
	// - sets the available slots in the agenda onclick action in availabilitySetting component
	
	//! WORK IN PROGRESS filter to display below each day the corresponding slots

export default {

	name: "agenda",
	props:['agendaRangeProp', 'startDateProp', 'endDateProp', 'agendaSlotProp'],
	data() {
		return {
			msg: "agenda Vue",
			day:'',
      		agendaRangeInA: '',
      		startDateInA: '',
      		endDateInA:'',
      		slot:'',
      		slotsInA:[],
      		slotsInAFiltered:[]
		}
	},
	components: {},
	created (){
		// console.log('this.slotsInA at created:' , this.slotsInA)
		//before created, check with backend that the range time has not already been booked.
		// requete axios, j'envoie dans le back la rangeTime, 
		// le back vérifie if there is not 'booked' status'
		// if no 'booked status': set up agenda
		// if any 'booked status' display message that the time range has already booking, (give which one)
		//and that user should handle them before planning new settings
	},
	mounted(){
		// console.log('this.slotsInA at mounted:' , this.slotsInA)
	},
	beforeUpdate(){
		// console.log('this.slotsInA at mounted:' , this.slotsInA)
	},
	updated(){
		this.startDateInA = this.startDateProp;
		this.endDateInA = this.endDateProp;
		this.agendaRangeInA = this.agendaRangeProp;
		this.slotsInA = this.agendaSlotProp;
		console.log('this.slotsInA at updated:' , this.slotsInA);
	// 	slotIsInDay(this.day,this.slotsInA);
	},
	methods: {
		// slotIsInDay: function(day,slot){
		// 	console.log('japl slotIsInDay');
		// 	return this.slotsInA.filter(function(day,slot) {
		// 		// console.log('this.slotsInA:' , this.slotsInA);
		// 		// console.log('slot.isInDay:' , this.slot.isInDay);
		// 		// console.log('day:' , this.day);
  //       	return this.slot.isInDay === this.day;
		// 	})
		// }
		slotIsInDay: function(day,slotsInA){
			console.log('japl slotIsInDay');
			let slotsInAFiltered = slotsInA.filter(function(slot){
				return this.slot.isInDay == day;
			});
			console.log('slotsInAFiltered: ', slotsInAFiltered);
		}
	},
	filters: {
		dateFormatFull : function (date) {
    return moment(date).format('DD/MM/YYYY');
		},
		dateFormatYear : function (date) {
    return moment(date).format('YYYY');
		},
		dateFormatText : function (date) {
    return moment(date).format('dddd DD MMM');
		},
		dateFormatDayNumber : function (date) {
    return moment(date).format('D');
		},
		formatTime : function(date) {
	return moment(date).format('LT');
		},
		formatDayHour : function(date){
	return moment(date).format('lll');
		}
	}
};


</script>

<style scoped>

.hour {
	color: #bbb;
	cursor: pointer;
}
.selected {
	background-color: #0aa8ce;
	color: white;
}
.table > tbody > tr.selected > td {
	border-top: 1px solid #0aa8ce;
}
.selected td:hover {
	background-color: #0a89af;
	color: white;
}
</style>