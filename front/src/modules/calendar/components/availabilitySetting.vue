<template>
	<div>
		<h5>{{ msg }}</h5>
		<b-form>
			<b-form-group label="Mes disponibilités dans la semaine">
				<b-form-checkbox-group id="disposInWeek" name="disposInWeek" v-model="selected">
					<b-list-group>
						<b-list-group-item class="disposInDay" v-for="(day,index) in weekDays" :key="index">
							<b-row>
								<b-col sm="2">
									<b-form-checkbox 
									:value="day.dayname">{{day.dayname}}</b-form-checkbox>
								</b-col>
								<label for="input-morning-start">de:</label>
								<b-col sm="2">
									<b-form-input size="sm" id="input-morning-start" v-model="day.startMorningTime" type="time"></b-form-input>
								</b-col>
								<label for="input-morning-end">à:</label>
								<b-col sm="2">
									<b-form-input size="sm" id="input-morning-end" v-model="day.endMorningTime" type="time"></b-form-input>
								</b-col>
								<label for="input-afternoon-start">Et de:</label>
								<b-col sm="2">
									<b-form-input  size="sm" id="input-afternoon-start" v-model="day.startAfternoonTime" type="time"></b-form-input>
								</b-col>
								<label for="input-afternoon-end">à:</label>
								<b-col sm="2">
									<b-form-input size="sm" id="input-afternoon-end" v-model="day.endAfternoonTime" type="time"></b-form-input>
								</b-col>
							</b-row>
						</b-list-group-item>
					</b-list-group>
				</b-form-checkbox-group>
			</b-form-group>
			<hr>
			<b-button variant="outline-primary" v-on:click="getDisposInWeek(selected)" type="button">Mettre à jour mes dispos sur mon Agenda</b-button>
			<hr>
			<div>Selected: <strong>{{ selected }}</strong></div>
		</b-form>
	</div>
</template>

<script>
/* eslint-disable */
import moment from 'moment';
import 'moment/locale/fr';
import * as cHelpers from '.././calendarHelpers';

//description of component
	//This component anable to pre-set availabilities periods recurrent in the week
	//from the period selected in the datePicker:
	//it will convert all the selected days and available times to slots with status'available',
	//it will return:
	//- a list of days ( moment object) in which the conseiller will have availabilities
	//- a list of slots objects of 15 minutes, with status 'available'

//To do:
// - this component should open only after clicking on create my agenda in datePicker component
// - the hours selection should only be visible when the day is selected
// - Should the hours selection pre-filled?
// - error handeling: if the range not suitable


export default {
	name: "availabilitySetting",
	props:['agendaRangeProp'],
	data() {
		return {
			msg: "availabilitySetting Vue",
			day:'',
			weekDays:[
				{ dayname:'Lundi', index:0, startMorningTime:'', endMorningTime: '', startAfternoonTime: '', endAfternoonTime:'' },
				{ dayname:'Mardi', index:1, startMorningTime:'', endMorningTime: '', startAfternoonTime: '', endAfternoonTime:'' },
				{ dayname:'Mercredi', index:2, startMorningTime:'', endMorningTime: '', startAfternoonTime: '', endAfternoonTime:'' },
				{ dayname:'Jeudi', index:3, startMorningTime:'', endMorningTime: '', startAfternoonTime: '', endAfternoonTime:'' },
				{ dayname:'Vendredi', index:4, startMorningTime:'', endMorningTime: '', startAfternoonTime: '', endAfternoonTime:'' },
				{ dayname:'Samedi', index:5, startMorningTime:'', endMorningTime: '', startAfternoonTime: '', endAfternoonTime:'' },
				{ dayname:'Dimanche', index:6, startMorningTime:'', endMorningTime: '', startAfternoonTime: '', endAfternoonTime:'' }
			],
			selected:[],
			agendaRangeInAS:[],
			agendaRangeFilteredInAS:[],
			slotsInAS:[],
		}
	},
	components: {},
	updated(){
		this.agendaRangeInAS = this.agendaRangeProp;
	},
	methods: {
		getDisposInWeek: function(sel) {
			if(sel.length){
				//if at least one day is selected, i check if this day is in the agendaRange.
				for (let i=0; i<sel.length; i++){
					for(let j=0; j<this.agendaRangeInAS.length; j++){
						let dayName = cHelpers.getNameOfDay(this.agendaRangeInAS[j]);
						if (dayName == sel[i].toLowerCase()) {
							console.log('dayName matching:', dayName);
							// if so i push the matching date in agendaRangeFiltered.
							this.agendaRangeFilteredInAS.push(this.agendaRangeInAS[j]);
							//and i create slots of availabilities for these days:
								//for this i need to get starting and ending for eachperiod in Day
								// and for this i need convert string collected in input to duration in minutes
								if(this.weekDays[i].startMorningTime && this.weekDays[i].endMorningTime){
									let startAM = moment(this.agendaRangeInAS[j]).startOf('day').add(cHelpers.convertTimeInMinutes(this.weekDays[i].startMorningTime), 'minutes');
									let endAM = moment(this.agendaRangeInAS[j]).startOf('day').add(cHelpers.convertTimeInMinutes(this.weekDays[i].endMorningTime), 'minutes');
									// console.log('startAM:', startAM);
									// console.log('endAM:', endAM);
									this.slotsInAS.push(cHelpers.setSlotsArray(startAM,endAM,15,cHelpers.Available));
								}
								if(this.weekDays[i].startAfternoonTime && this.weekDays[i].endAfternoonTime){
									let startPM = moment(this.agendaRangeInAS[j]).startOf('day').add(cHelpers.convertTimeInMinutes(this.weekDays[i].startAfternoonTime), 'minutes');
									let endPM = moment(this.agendaRangeInAS[j]).startOf('day').add(cHelpers.convertTimeInMinutes(this.weekDays[i].endAfternoonTime), 'minutes');
									// console.log('startPM:', startPM);
									// console.log('endPM:', endPM);
									this.slotsInAS.push(cHelpers.setSlotsArray(startPM,endPM,15,cHelpers.Available));
								}
						}
					}
				}
			}
			console.log('agendaRangeFilteredInAS:', this.agendaRangeFilteredInAS);
			console.log('slotsInAS:', this.slotsInAS)
			// pass the this.slotsInAS to backend, so that backend check that these slots are not already booked.
		}
		
	}

		
};

</script>

<style scoped>

.disposInDay{

text-align: left;
}

</style>
