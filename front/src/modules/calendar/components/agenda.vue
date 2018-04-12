<template>
	<div>
		<h5>{{ msg }}</h5>
		<div class="agenda">
			<div class="agendaHeader">
				agendaHeader
			</div>
			<div class="agendaBodyLeftPanel">
				<div class="hour" v-for="hour in hourList">
					{{hour}}
				</div>
			</div>
			<table class="agendaBody">
				<thead class="agendaBodyDays">
					<tr class="day" v-for="(day,index) in agendaRangeProp" :key="index">
						{{day | dateFormatText}}
					</tr>
				</thead>
				<tbody class="agendaBodySlots">
					<tr class="buttonSlots" v-for="(day,index) in agendaRangeProp" :key="index">
						<ul>
							<li><b-button variant="outline-primary">1</b-button></li>
							<li><b-button variant="outline-primary">2</b-button></li>
							<li><b-button variant="outline-primary">3</b-button></li>
							<li><b-button variant="outline-primary">4</b-button></li>
							<li><b-button variant="outline-primary">5</b-button></li>
						</ul>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- <div class="col-md-2 col-sm-6 col-xs-12" v-for="day in agendaRangeProp"> -->
						<!-- <tbody>
							<tr v-for="slot in agendaSlotProp" v-if="slotIsInDay(day,agendaSlotProp)">
								day: {{day | dateFormatFull}}
								slot.isInDay: {{slot.isInDay | dateFormatFull}}
							</tr>
						</tbody> -->
						<!-- 	</div> -->
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
	props:['agendaRangeProp', 'agendaSlotProp'],
	data() {
		return {
			msg: "agenda Vue",
			day:'',
      		agendaRangeInA: '',
      		slotsInA:[],
      		slotsInAFiltered:[],
      		hourList:['8:00','9:00','10:00','11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00' ],
      		}
	},
	components: {},
	updated(){
		this.startDateInA = this.startDateProp;
		this.endDateInA = this.endDateProp;
		this.agendaRangeInA = this.agendaRangeProp;
		this.slotsInA = this.agendaSlotProp
	},
	methods: {
		slotIsInDay: function(day,agendaSlotProp){
			let slotsInAFiltered = agendaSlotProp.filter(function(sl){
				let moment1 = moment(sl.isInDay);
				let moment2 = moment(day);
				return moment1.isSame(moment2, 'day');
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

.agenda{
	display: flex;  
  	flex-flow: row wrap;
}
 
.agendaHeader{
	background-color: pink;
	width: 100%;
}


.agendaBodyLeftPanel{
	/*background-color: blue;*/
	flex-direction:column;
	width: 9%;
	margin-top: 10vw;
}

.hour{
	float: left;
	padding: 10px;
	text-align: left;
}
	

.agendaBody{
	/*background-color: green;*/
	/*flex-direction:row;*/
	width: 91%
}

.agendaBodyDays{
	/*background-color: yellow;*/
	display: flex;
	flex-direction:row;
	text-align: center;
	height: 10vw;
}

.day{
	width:13%;
	padding: 10px;
}

.agendaBodySlots{
	display: flex;
	flex-direction:row;
	text-align: center;
}

.buttonSlots{
	width:13%;
	padding: 10px;
}

ul{
	list-style:none;
}

button{
	border-color: #e5e5e5;
	background-color: none;
}

</style>