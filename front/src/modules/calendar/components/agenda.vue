<template>
	<div>
		<h5>{{ msg }}</h5>
		<div class="agenda">
			<div class="agendaHeader">
				<b-navbar-nav>
      				<b-nav-form class="nav">
	      				<div class="navDisplay">
		      				<b-button variant="primary" size="sm" class="my-2 my-sm-0" type="submit"><i class="material-icons">today</i></b-button>
		      				<b-button variant="primary" size="sm" class="my-2 my-sm-0" type="submit"><i class="material-icons">view_week</i></b-button>
		      				<b-button variant="primary" size="sm" class="my-2 my-sm-0" type="submit"><i class="material-icons">view_module</i></b-button>
	      				</div>
	      				<div class="navNavigate">
		      				<b-button variant="primary" size="sm" class="my-2 my-sm-0" type="submit"><i class="material-icons">navigate_before</i></b-button>
		      				<span class="weekNumber">Semaine{{current}}</span>

	        			<b-button variant="primary" size="sm" class="my-2 my-sm-0" type="submit"><i class="material-icons">navigate_next</i></b-button>
	        			</div>
      				</b-nav-form>
    			</b-navbar-nav>
			</div>
			<div class="agendaBodyLeftPanel">
				<ul class="hour" v-for="hour in hourList">
					<li class="hourli">{{hour}}</li>
				</ul>
			</div>
			<table class="agendaBody">
				<thead class="agendaBodyDays">
					<tr class="day" v-for="(day,index) in agendaRangePropC" :key="index">
						<p class="dayName">{{day | dateFormatDayName}}</p>
						<p class="dayNumber">{{day | dateFormatDayNumberAndMonth}}</p>
					</tr>
				</thead>
				<tbody class="agendaBodySlots">
					<tr class="buttonSlots" v-for="(day,index) in agendaRangePropC" :key="index">
						<ul class="slotUl" v-on:buttonsIdsUpdated="updateButtons($event)" v-for="buttonId in buttonIdList" v-if="buttonIdIsInDay(day,buttonId)">
							<li class="slotLi"><b-button v-bind:class="changeClassButton(buttonId)" v-bind:id="buttonId">{{buttonId}}</b-button></li>
						</ul>
					</tr>
				</tbody>
			</table>
			<div>
				<button v-on:click="createButtonId(agendaRangePropC)">Click to create ButtonID</button>
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
	//This component will display the conseiller agenda.
	// by default, the agenda is filled in with buttons with NonAvailable ids
	// when the agenda get the 'available' rangeTime and slots from backend, 
		//it will update the display on the current agenda if no conflict
	
	//! WORK IN PROGRESS

	// TODO
	// the buttonID are well changed when slots 'available' are retreived, but the class is still not rendered in display.
	//create a function display agenda, that would take in parameter a time range, and slots, and that will then update the display.


export default {

	name: "agenda",
	props:['agendaRangePropC', 'agendaSlotPropC'],
	data() {
		return {
			msg: "agenda Vue will be displayed by default with calendar",
			day:'',
      		agendaRangeInA: '',
      		slotsInA:[],
      		hourList:['08:00','08:15','08:30','08:45','09:00','09:15', '09:30', '09:45',
      		'10:00','10:15','10:30','10:45','11:00','11:15','11:30','11:45','12:00','12:15','12:30','12:45','13:00','13:15','13:30','13:45','14:00','14:15','14:30','14:45', '15:00','15:15','15:30','15:45','16:00','16:15','16:30','16:45','17:00','17:15','17:30','17:45','18:00'],
      		current:'',
      		buttonId:'',
      		buttonClass : '',
      		buttonIdList:[]
      	};
	},
	components: {},
	created(){
		this.current = cHelpers.getWeekNumber('now');
		this.slotsInA = this.agendaSlotPropC;
		this.agendaRangeInA = this.agendaRangePropC;
		//for now only to test we will get back the slots from Calendar component.
		//as soon as route ok, we will retreive the slots from back end
		// http.get('url')
		// 			.then(
		// 				res => {
		// 				console.log('res:',res);
		// 				this.slotsInA = res.data.slots;
		// 				//here we will get the back the slots and launch an update agenda function
		// 				})
		// 			.catch(
		// 				error => {
		// 			    console.log('error:', error);
		// 			    //should display message to user that there is an error
		// 			});
	},
	updated(){
		this.updateButtonId(this.agendaSlotPropC,this.buttonIdList);
		this.changeClassButton(this.buttonId);
	},
	methods: {
		createButtonId: function(timeRange){
			let reg = /:/;
			for (let i=0; i<timeRange.length; i++){
				for(let j=0; j<this.hourList.length; j++){
					let id;
					id = moment(timeRange[i]).format('YYYY-MM-DD').toString()+ '-' + this.hourList[j]+ '-' +'N';
					this.buttonId = id.replace(reg, '-');
					this.buttonIdList.push(this.buttonId);
				}
			}
			console.log('buttonIdList:', this.buttonIdList);
			return this.buttonIdList;
		},
		buttonIdIsInDay: function(day,id){
			let a = moment(day).format('YYYY-MM-DD').toString();
			let b = id.slice(0,10);
			if(a == b) {
				return true;
			}
		},
		updateButtonId: function(slots, idList){
			for (let i=0; i<slots.length; i++){
				for (let j=0; j<idList.length; j++){
					let sl = moment(slots[i].start).format('YYYY-MM-DD-HH-mm').toString();
					let id = idList[j].slice(0,16);
					if (sl == id) {
						console.log('here are the buttonsIds that should be modified:', idList[j]);
						if(slots[i].status == 'Available'){
							idList[j]=idList[j].slice(0,16)+'-'+'A';
						}
						if(slots[i].status == 'NonAvailable'){
							idList[j]=idList[j].slice(0,16)+'-'+'N';
						}
						if(slots[i].status == 'Booked'){
							idList[j]=idList[j].slice(0,16)+'-'+'B';
						}
					}
				}
			}
			this.$emit('buttonsIdsUpdated', idList);
			console.log('les buttonId sont updatés!:', idList);

		},
		updateButtons: function(newList){
			this.buttonIdList = newList;
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
	},
	filters: {
		dateFormatFull : function (date) {
    return moment(date).format('DD/MM/YYYY');
		},
		dateFormatYear : function (date) {
    return moment(date).format('YYYY');
		},
		dateFormatDayName : function (date) {
    return moment(date).format('dddd');
		},
		dateFormatDayNumberAndMonth : function (date) {
    return moment(date).format('D MMM');
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
}

.navNavigate {
	float: right;
}

.navDisplay {
	float: left;
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