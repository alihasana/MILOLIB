	<template>
		<div>
			<h5>{{ msg }}</h5>
			<b-form>
				<b-form-group label="Paramétrage de mes disponibilités dans une semaine type">
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

import _ from 'underscore';

import * as cHelpers from '.././calendarHelpers';
import http from '../../../helpers/http';

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
// - Should the hours selection pre-filled? or maybe the conseiller could tick a default checkbox to prefill all days with opening hours?
// - error handeling: if the range not suitable // what about if they select hour like 3:18?
//what about one slot is not complete?


export default {
	name: "availabilitySetting",
	props:['agendaRangeProp', 'agendaSlotProp'],
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
	created(){
		this.slotsInAs = this.agendaSlotProp;
	},
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
							// console.log('dayName matching in i boucle:', dayName);
							// if so i push the matching date in agendaRangeFiltered.
							this.agendaRangeFilteredInAS.push(this.agendaRangeInAS[j]);
						}
					}
				}
				//and i create slots of availabilities for these days:
					//for this i need to get starting and ending for each period in Day:  i need convert string collected in input to duration in minutes
					//and i need also to get the weekDays matching as well to get back the relevant rangetime.
				let allDaysSlots = [];
				let daySlots = [];
				for (let l=0; l<this.agendaRangeFilteredInAS.length; l++){
					let daySlotsAM = [];
					let daySlotsPM = [];
					let dayNamebis = cHelpers.getNameOfDay(this.agendaRangeFilteredInAS[l]);
					for(let k=0; k<this.weekDays.length; k++){
						if(dayNamebis == this.weekDays[k].dayname.toLowerCase()){
							// console.log('dayName matching in K boucle:', dayNamebis);
							if(this.weekDays[k].startMorningTime && this.weekDays[k].endMorningTime){
								let startAM = moment(this.agendaRangeFilteredInAS[l]).startOf('day').add(cHelpers.convertTimeInMinutes(this.weekDays[k].startMorningTime), 'minutes');
								let endAM = moment(this.agendaRangeFilteredInAS[l]).startOf('day').add(cHelpers.convertTimeInMinutes(this.weekDays[k].endMorningTime), 'minutes');
								// console.log('startAM:', startAM);
								// console.log('endAM:', endAM);
								daySlotsAM.push(cHelpers.setSlotsArray(startAM,endAM,15,cHelpers.Available));
								// console.log('daySlotsAM', daySlotsAM);
								daySlots.push(daySlotsAM);
								// console.log('daySlots: ', daySlots);

							}
							if(this.weekDays[k].startAfternoonTime && this.weekDays[k].endAfternoonTime){
								let startPM = moment(this.agendaRangeFilteredInAS[l]).startOf('day').add(cHelpers.convertTimeInMinutes(this.weekDays[k].startAfternoonTime), 'minutes');
								let endPM = moment(this.agendaRangeFilteredInAS[l]).startOf('day').add(cHelpers.convertTimeInMinutes(this.weekDays[k].endAfternoonTime), 'minutes');
								// console.log('startPM:', startPM);
								// console.log('endPM:', endPM);
								daySlotsPM.push(cHelpers.setSlotsArray(startPM,endPM,15,cHelpers.Available));
								// console.log('daySlotsPM', daySlotsPM);
								daySlots.push(daySlotsPM);
								// console.log('daySlots: ', daySlots);
							}
						}
					}
				}
				allDaysSlots.push(_.flatten(daySlots));
				this.slotsInAS = _.flatten(allDaysSlots);
				this.$emit('slotsAreReady', this.slotsInAS)
				// console.log('allDaysSlots:', allDaysSlots);
				console.log('slotsInAS:', this.slotsInAS);
				console.log('agendaRangeFilteredInAS:', this.agendaRangeFilteredInAS);
			
				this.checkAvailability(this.slotsInAS);

		}
	},
	checkAvailability: function(availableSlots){
		console.log('j\'envoie mes données au back pour vérifier que les plages choisies sont bien dispoibles');
		//back end should check if the sent slots are not in conflict with booked slots
		let postBody = availableSlots;
		console.log('postBody: ', postBody);
		http.post('/calendar', postBody)
					.then(
						res => {
						console.log('res:',res);
							//here will call a function update calendar that will update the actual calendar with new rangetime/availabilities
							this.$router.push('calendar');
						})
					.catch(
						error => {
					    console.log('error:', error);
					    //should display message to user that the selected period/range time has already 'booked' slots
					});
	}

}
	
};

</script>

<style scoped>

.disposInDay{

text-align: left;
}

</style>
