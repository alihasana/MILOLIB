	<template>
		<div>
			<b-form>
				<b-form-group class="title" label="Paramétrage de mes disponibilités dans une semaine type">
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
			</b-form>
		</div>
	</template>

<script>
/* eslint-disable */
import moment from 'moment';
import 'moment/locale/fr';
import _ from 'underscore';
import swal from "sweetalert2";

import * as cHelpers from '.././calendarHelpers';
import http from '../../../helpers/http';

//description of component
	//This component anable to pre-set availabilities periods recurrent in the week
	//from the period selected in the datePicker:
	//it will convert all the selected days and available times to 15 minutes slots with property start and end. it will send these slots to backend which will return new slots objects with properties 'start' 'end' 'available':true, status
	// The list of days ( moment object) in which the conseiller will have availabilities will be passed to Store and add to timeRange if necessary

//To do:
// - this component should open only after clicking on create my agenda in datePicker component
// - Should the hours selection pre-filled? or maybe the conseiller could tick a default checkbox to prefill all days with opening hours?
// - error handeling: if the range not suitable // what about if they select hour like 3:18?
//what about one slot is not complete?


export default {
	name: "availabilitySetting",
	props:['planNewRangeProp', 'planNewRangeProp'],
	data() {
		return {
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
		this.slotsInAs = this.planNewSlotProp;
	},
	updated(){
		this.agendaRangeInAS = this.planNewRangeProp;
	},
	methods: {
		getDisposInWeek: function(sel) {
			if(sel.length){
				//if at least one day is selected, i check if this day is in the agendaRange.
				for (let i=0; i<sel.length; i++){
					for(let j=0; j<this.agendaRangeInAS.length; j++){
						let dayName = cHelpers.getNameOfDay(this.agendaRangeInAS[j]);
						if (dayName == sel[i].toLowerCase()) {
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
							if(this.weekDays[k].startMorningTime && this.weekDays[k].endMorningTime){
								let startAM = moment(this.agendaRangeFilteredInAS[l]).startOf('day').add(cHelpers.convertTimeInMinutes(this.weekDays[k].startMorningTime), 'minutes');
								let endAM = moment(this.agendaRangeFilteredInAS[l]).startOf('day').add(cHelpers.convertTimeInMinutes(this.weekDays[k].endMorningTime), 'minutes');
								daySlotsAM.push(cHelpers.setSlotsArray(startAM,endAM,15,cHelpers.Available));
								daySlots.push(daySlotsAM);
							}
							if(this.weekDays[k].startAfternoonTime && this.weekDays[k].endAfternoonTime){
								let startPM = moment(this.agendaRangeFilteredInAS[l]).startOf('day').add(cHelpers.convertTimeInMinutes(this.weekDays[k].startAfternoonTime), 'minutes');
								let endPM = moment(this.agendaRangeFilteredInAS[l]).startOf('day').add(cHelpers.convertTimeInMinutes(this.weekDays[k].endAfternoonTime), 'minutes');
								daySlotsPM.push(cHelpers.setSlotsArray(startPM,endPM,15,cHelpers.Available));
								daySlots.push(daySlotsPM);
							}
						}
					}
				}
				allDaysSlots.push(_.flatten(daySlots));
				this.slotsInAS = _.flatten(allDaysSlots);
				this.checkAvailability(this.slotsInAS);
		}
	},
	checkAvailability: function(availableSlots){
		console.log('j\'envoie mes données au back pour vérifier que les plages choisies sont bien disponibles et récupérer les slots avec toutes les propriétés. Pour l instant cela ne fonctionne pas et je travaille avec mes slots du front. les slots et la time range sont passés au store');
		let postBody = availableSlots;
		console.log('postBody: ', postBody);

		//this is for now
		this.$store.commit('getSlotsAvailables', this.slotsInAS);
		this.$store.commit('updateRangeTime', this.agendaRangeInAS)
		this.$router.push({name: 'agenda'});

		//this when the back-end OK
		// back end should check if the sent slots are not in conflict with booked slots and return new slots with properties start, end, available:false, status
		http.post('/calendar', postBody)
					.then(
						res => {
						console.log('res:',res);
						this.$store.commit('slotsAvailables', res.data);
						this.$store.commit('updateRangeTime', this.agendaRangeInAS)
						swal({
			            type: "success",
			            title: "paramétrage de vos disponibilités: OK!"
			          	});
						this.$router.push({name: 'agenda'});
						})
					.catch(
						error => {
					    console.log('error:', error.response.data.message);
					    swal({
			            type: "error",
			            title: "paramétrage de vos disponibilités: impossible, merci de vérifier que les plages sélectionnées ne comporte pas de RDV"
			          	});
					});
	}

}
	
};

</script>

<style scoped>

.disposInDay{
	font-size: 12px;
	font-weight: normal;
	text-align: left;
}

.form-group{
	margin-top: 10px;
}

.title{
	font-size: 14px;
	font-weight: bold;
}

.list-group{
	margin-top: 10px;
}

</style>
