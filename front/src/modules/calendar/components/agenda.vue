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
							<tr v-for="slot in slots">
							<!-- <tr v-for="hour in day.hours" class="hour" :class="{ selected: hour.selected }">
								<td v-on:click="select(hour)">>{{hour.index}}</td> -->
							</tr>
						</tbody>
					</table>
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
	props:['agendaRangeProp', 'startDateProp', 'endDateProp'],
	data() {
		return {
			msg: "agenda Vue",
			day:'',
      		days: '',
      		startDateInA: '',
      		endDateInA:'',
      		slots:[]
  //     		.map(
  //     			dayname => ({
  //     				name: dayname._d,
  //       	// Each hour has an index and a selected property.
		// 			hours: Array(13).fill(0)
		// 			.map(
		// 				(e, i) => ({
		// 					index: i + 8,
		// 					selected: false})
		// 				)
  //     			})
  //     		)
		}
	},
	components: {},
	updated(){
		this.startDateInA = this.startDateProp;
		this.endDateInA = this.endDateProp;
		this.days = this.agendaRangeProp;
		console.log('this.days:', this.days);
		// this.setSlots();


	},
	methods: {
		// setSlots: function(){
		// 	let start = moment(this.startDateInA);
		// 	let end = moment(this.endDateInA);

		// 	for (let i=start; i.isBefore(end); i.add(15,'minutes')){
		// 		console.log(i.format('llll'));
		// 		let slotObject = cHelpers.createSlotObject(i);
		// 		this.slots.push(slotObject);
		// 		}
		// 	}
  		// select(e) {
    // e.selected = !e.selected;
  		// }
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