<template>
	<div class="availabilityDatePicker">
		<b-form>
			<b-form-group class="title" label="Période de paramétrage de mon agenda">
				<b-list-group>
					<b-list-group-item class="disposInDay">
						<b-row class="availabilityDatePicker__periode">
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
		<availabilitySetting v-if="visible" :planNewRangeProp="agendaRangeInDP" planNewSlotProp="InDP"></availabilitySetting>
		</div>
	</div>
</template>

<script>
/* eslint-disable */

import moment from 'moment';
import 'moment/locale/fr';
import swal from "sweetalert2";
import * as cHelpers from '.././calendarHelpers';
import { store } from '../../../store/store';
import availabilitySetting from "./availabilitySetting";

//setting local format and language
moment.locale('fr');


export default {

	//description of component
	//This component anable to select a range pariod, and on clik, it generates:
	//- a list of days ( moment object)
	// this list is passed to availabilitySetting to mass set the days/hours available for the selected range time

	name: "availabilityDatePicker",
	props:['planNewRangeProp', 'planNewSlotProp'],
	data() {
		return {
			startDateInDP: '',
			endDateInDP:'',
			agendaRangeInDP:'',
			agendaSlotInDP:[],
			visible:false
		};
	},
	components: {
		availabilitySetting
	},
	methods:{
		createAgendaRange : function(){
			if (moment(this.startDateInDP).isAfter(this.$store.state.now) && moment(this.endDateInDP).isAfter(this.startDateInDP)) {
				console.log('je vais créer mon agenda de ( before)', this.startDateInDP, 'à', this.endDateInDP );
				this.startDateInDPlessOne = moment(this.startDateInDP).subtract(1,'day').format("YYYY-MM-DD");
   				console.log('je vais créer mon agenda de (after)', this.startDateInDPlessOne, 'à', this.endDateInDP );
				this.agendaRangeInDP = cHelpers.getDaysOfTheTimeRange(this.startDateInDPlessOne,this.endDateInDP);
				this.visible=!this.visible;
			} else {
				swal({
		            type: "error",
		            title: "Dates non valides",
		            text: "Merci de vérifier les dates! Vous ne pouvez pas planifier des disponibilités sur des dates antérieures à aujourd'hui inclus, ni sélectionner une date de fin antérieure à la date de début!"
		          	});
			}
		}
	}
};

</script>

<style scoped>

.availabilityDatePicker{
	font-size: 12px;
}

.form-group{
	margin-top: 10px;
}

.title{
	font-size: 14px;
	font-weight: bold;
}

.list-group{
	margin: 10px;
}

.disposInDay{
	display: flex; 
	font-size: 12px;
	font-weight: normal;
}

.availabilityDatePicker__periode {
	width:100%;
	justify-content: center;
	margin: auto;
}

</style>
