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
							<tr class="slotIsInDay(day)" v-for="slot in slotsInA" >
								<!-- <tr v-for="slot in slotsInA" v-if="day == slot.isInDay"> -->
								day: {{day | dateFormatFull}}
								slot.isInDay: {{slot.isInDay | dateFormatFull}}
								slot.start {{ slot.start | formatDayHour}}
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

export default {

	name: "agenda",
	props:['agendaRangeProp', 'startDateProp', 'endDateProp', 'agendaSlotProp'],
	data() {
		return {
			msg: "agenda Vue",
			day:'',
      		days: '',
      		startDateInA: '',
      		endDateInA:'',
      		slotsInA:[]
		}
	},
	computed:{
		slotIsInDay: function(){
			return this.agendaRangeProp.filter(function(sl) {
        	return sl.isInDay == this.day;
			})
		}
	},
	components: {},
	created (){
		//before created, check with backend that the range time has not already been booked.
		// requete axios, j'envoie dans le back la rangeTime, 
		// le back vérifie if there is not 'booked' status'
		// if no 'booked status': set up agenda
		// if any 'booked status' display message that the time range has already booking, (give which one)
		//and that user should handle them before planning new settings
	},
	updated(){
		this.startDateInA = this.startDateProp;
		this.endDateInA = this.endDateProp;
		this.days = this.agendaRangeProp;
		this.slotsInA = this.agendaSlotProp;
	},
	methods: {
		
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