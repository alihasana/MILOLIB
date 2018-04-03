	<template>
		<div>
			<h5>{{msg}}</h5>
			<b-form>
				<b-form-group label="Période de paramétrage de mon agenda">
					<b-list-group>
						<b-list-group-item class="disposInDay">
							<b-row class="periode">
								<label :for="startDate">Date de départ:</label>
								<b-col sm="3"><b-form-input id="startdate" v-on:change="getStartDate()" v-model ="startDate" type="date"></b-form-input></b-col>
								<label :for="endDate">Date de fin:</label>
								<b-col sm="3"><b-form-input id="enddate" v-on:change="getEndDate()" v-model ="endDate" type="date"></b-form-input></b-col>
							</b-row>
						</b-list-group-item>
					</b-list-group>
					<p>{{startDate}}</p>
					<p>{{endDate}}</p>
					<button v-on:click="createAgendaRange()" type="button">Creer mon Agenda</button>
				</b-form-group>
			</b-form>
			<div>
				<agenda :agendaRangeProp="agendaRangeInDP" :startDateProp="startDate" :endDateProp="endDate"></agenda>
			</div>
		</div>
	</template>

<script>
/* eslint-disable */

//importing momentJs library //
import moment from 'moment';
import 'moment/locale/fr';
import * as cHelpers from '.././calendarHelpers';
import agenda from "./agenda";

//setting our local timezone
moment.locale('fr');


export default {


	name: "datePicker",
	props: {
	},
	data() {
		return {
			msg: "datePicker Vue",
			startDate: '',
			endDate:'',
			agendaRangeInDP:'',
			slot:''
		};
	},
	components: {
		agenda
	},
	methods:{
		getStartDate: function(){
			console.log('this.startDate:', this.startDate);
		},
		getEndDate: function(){
			console.log('this.endDate:', this.endDate);
		},
		createAgendaRange : function(){
			console.log('je vais créer mon agenda de', this.startDate, 'à', this.endDate );
			return this.agendaRangeInDP = cHelpers.getDaysOfTheTimeRange(this.startDate,this.endDate);
			//il faudra faire une fonction pour interdir de paramétrer en masse le calendrier
			// lorsque celui ci a déjà des rdv sur la plage définie.
			//voir aussi affichage de la semaine en cours, et update uniquement à partir des jours où il n'y a pas de rdv.
			
		}
	}
};
</script>



<style scoped>

.periode {
}

</style>
