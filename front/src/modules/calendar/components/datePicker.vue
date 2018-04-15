<template>
	<div>
		<h5>{{msg}}</h5>
		<b-form>
			<b-form-group label="Période de paramétrage de mon agenda">
				<b-list-group>
					<b-list-group-item class="disposInDay">
						<b-row class="periode">
							<label :for="startDateInDP">Date de départ:</label>
							<b-col sm="3"><b-form-input id="startDateInDP" v-model ="startDateInDP" type="date"></b-form-input></b-col>
							<label :for="endDateInDP">Date de fin:</label>
							<b-col sm="3"><b-form-input id="endDateInDP" v-model ="endDateInDP" type="date"></b-form-input></b-col>
						</b-row>
					</b-list-group-item>
				</b-list-group>
				<b-button variant="outline-primary" v-on:click="createAgendaRange()" type="button">Creer mon Agenda</b-button>
			</b-form-group>
		</b-form>
		<div class="availabilitySetting">
			<availabilitySetting :agendaRangeProp="agendaRangeInDP" agendaSlotProp="agendaSlotPropInDP" v-on:slotsAreReady="getSlotsFromAS($event)"></availabilitySetting>
		</div>
	</div>
</template>

<script>
/* eslint-disable */

//importing momentJs library //
import moment from 'moment';
import 'moment/locale/fr';

import * as cHelpers from '.././calendarHelpers';

import availabilitySetting from "./availabilitySetting";
import agenda from "./agenda";

//setting local format and language
moment.locale('fr');


export default {

	//description of component
	//This component anable to select a range pariod, and on clik, it generates:
	//- a list of days ( moment object)
	// this list is passed to availabilitySetting to mass set the days/hours available for the selected range time

	name: "datePicker",
	props:['agendaRangeProp', 'agendaSlotProp'],
	data() {
		return {
			msg: "datePicker Vue",
			startDateInDP: '',
			endDateInDP:'',
			agendaRangeInDP:'',
			agendaSlotInDP:[],
			agendaRangeFromC:'',
			agendaSlotFromC:[]
		};
	},
	components: {
		agenda,
		availabilitySetting
	},
	created(){
		this.agendaRangeFromC = this.agendaRangeProp;
		this.agendaSlotFromC = this.agendaSlotProp;
	},
	methods:{
		createAgendaRange : function(){
			console.log('je vais créer mon agenda de', this.startDateInDP, 'à', this.endDateInDP );
			return this.agendaRangeInDP = cHelpers.getDaysOfTheTimeRange(this.startDateInDP,this.endDateInDP);
		},
		getSlotsFromAS : function(slots){
			this.agendaSlotInDP = slots;
			console.log('je suis dans le component DatePicker et je récupère les slots du component availabiltySetting', this.agendaSlotInDP);
			this.$emit('newTimeRangeToDisplay', this.agendaRangeInDP)
			this.$emit('newSlotsToDisplay', this.agendaSlotInDP );
		}
	}	
};

</script>


<style scoped>

.periode {
	margin: auto;
	text-align: center;
	justify-content: center;
}

</style>
