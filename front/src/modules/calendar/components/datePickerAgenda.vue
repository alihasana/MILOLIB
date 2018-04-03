<template>
	<div>
		<h5>{{msg}}</h5>
		<div class="datepicker_agenda">
			<div class="datepicker_agenda_header">
				<div class="datepicker_agenda_year">
					{{now | dateFormatYear}}
				</div>
				<div class="datepicker_agenda_datetext">
					{{now | dateFormatText}}
				</div>
			</div>
			<div class="datepicker_agenda_body">
				<div class="datepicker_agenda_week">
					<div v-for="day in days" track-by="$index" class="datepicker_agenda_weekdays">
						{{day}}
					</div>
					<div class="datepicker_agenda_daysInMonth" v-for="dayNumber in daysInMonth">
						<!-- <div class="datepicker_agenda_daysInMonth" v-bind:class="{selected: isSelected(now)}" v-for="dayNumber in daysInMonth"> -->
						<div class="spacer" v-bind:style="{ width: spacer}"></div>
						<span class="datepicker_agenda_daysInMonth_effect"></span>
						<span class="datepicker_agenda_daysInMonth_text">{{dayNumber | dateFormatDayNumber}}</span>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */

import moment from 'moment';
// import 'moment-timezone';
// moment.tz.setDefault('Europe/Paris');
import * as cHelpers from '.././calendarHelpers';



export default {

	name: "datePickerAgenda",
	data() {
		return {
			msg: "datePickerAgenda Vue",
			now: '',
			days: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
			startDayInMonth: '',
			endDayInMonth: '',
			daysInMonth: '',
			WeekFirstDayPosition:'',
			spacer: ''
		}
	},
	components: {},
    created(){
    	this.now = cHelpers.getCurrentDate();
    		console.log('this.now', this.now);
    	this.startDayInMonth = cHelpers.getMonthFirstDate(this.now);
    		console.log('this.startDayInMonth:', this.startDayInMonth);
    	this.endDayInMonth = cHelpers.getMonthLastDate(this.now);
    		console.log('this.endDayInMonth:', this.endDayInMonth);
    	this.daysInMonth = cHelpers.getDaysOfTheTimeRange(this.startDayInMonth,this.endDayInMonth);
    		console.log('this.daysInMonth:', this.daysInMonth);
    	this.WeekFirstDayPosition = cHelpers.getWeekFirstDayPosition(this.now);
    		console.log('this.WeekFirstDayPosition:', this.WeekFirstDayPosition);
    	this.spacer = this.getSpacer();
    	},
	methods: {
		moment: function (){
    		return moment();
    	},
    	// le spacer ne fonctionne pas pour l instant // this.WeekFirstDayPosition is undefined
    	getSpacer: function(){
    		let s = this.WeekFirstDayPosition;
    		console.log(s);
    		let space = this.WeekFirstDayPosition*41;
    		console.log('space:', space);
    		return this.spacer = space+'px';
    		console.log('this.spacer: ', this.spacer);
    	}
    	// ICI on veut une méthode qui vérifie que le jour (entré dans l'input) affiché dans le header du date picker apparaisse bien comme sélectionné en bleu.
    	// attention pour l'instant c'est now qui s'affiche ds la header. il faudra le changer en date quand l'input sera fonctionnel
    	// isSelected: function(this.now){
    	// 	return this.dayNumber.unix() === this.now.unix();
    	// },
    	//ICI on veut une méthode qui permet de sélectionner un nouveau jour.
    	// on mettra un événement on click dans le v-for auquel on ratachera cette méthode,
    	// la date sera également changée dans le header
	},
	//creer un fichier filters, que l'on pourra utiliser dans toute l'app.
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
		dateFormatDayNumber: function (date) {
    return moment(date).format('D');
		}
	}
};


</script>




<style scoped>

.datepicker_agenda {
	position: absolute;
	/*top:100%;*/
	z-index: 5;
	background-color: #fff;
	box-shadow: 0 14px 45px rgba(0,0,0,0.25), 0 10px 18px rgba(0,0,0,0.22);
	width: 315px;
}

.datepicker_agenda_header {
	background-color: #195DA8;
	color: #fff;
	padding: 20px;
}

.datepicker_agenda_year {
	opacity: 0.7;
	margin-bottom: 10px;
	font-size: 16px;
	line-height: 16px;
}

.datepicker_agenda_datetext {
	font-size: 24px;
	line-height: 24px;
}

.datepicker_agenda_body{
	margin: 10px;
}


.datepicker_agenda_week {
	font-size: 12px;
	line-height: 12px;
	color: rgba(0,0,0, 0.8);
	/*padding: 14px;*/
}

.datepicker_agenda_weekdays {
	float: left;
	width: 41px;
	text-align: center;
	padding: 14px;
}

.datepicker_agenda_daysInMonth {
	position: relative;
	float: left;
	text-align: center;
	width: 41px;
	padding: 14px;
	cursor: pointer;
	transition: all 450ms cubic-bezier(0.25,1,0.32,1);
}

.datepicker_agenda_daysInMonth_effect {
	position: absolute;
	background-color: #195DA8;
	width: 36px;
	height: 36px;
	border-radius: 50%;
	top:2px;
	left:2px;
	transition: all 450ms cubic-bezier(0.25,1,0.32,1);
	/*transform: scale(0);*/
	opacity: 0;
}

.datepicker_agenda_daysInMonth_text {
	position: relative;
}

.datepicker_agenda_daysInMonth:hover{
	color: #FFF;
}

.datepicker_agenda_daysInMonth_effect:hover{
	transform: scale(1);
	opacity: 0.6;
}

/*.selected {
	il faut lui appliquer un style particulier lorsqu'il est sélected. tuto grafikart min 57
}*/

</style>