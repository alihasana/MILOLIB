<template>
	<div>
		<h5>{{ msg }}</h5>
		<b-form>
			<b-form-group label="Mes disponibilités dans la semaine">
				<b-form-checkbox-group id="disposInWeek" name="disposInWeek" v-model="selected">
					<b-list-group>
						<b-list-group-item class="disposInDay">
							<b-row>
								<b-col sm="2">
								<b-form-checkbox value="lundi">Lundi</b-form-checkbox>
								</b-col>
									<label for="input-morning-start">de:</label>
								
								<b-col sm="2">
									<b-form-input size="sm" id="input-morning-start" v-model ="startMorningTime" type="time"></b-form-input>
								</b-col>
								
									<label for="input-morning-end">à:</label>
								
								<b-col sm="2">
									<b-form-input size="sm" id="input-morning-end" v-model ="endMorningTime" type="time"></b-form-input>
								</b-col>
								
									<label for="input-afternoon-start">Et de:</label>
								
								<b-col sm="2">
									<b-form-input  size="sm" id="input-afternoon-start" v-model ="startAfternoonTime" type="time"></b-form-input>
								</b-col>
								
									<label for="input-afternoon-end">à:</label>
								
								<b-col sm="2">
									<b-form-input size="sm" id="input-afternoon-end" v-model ="endAfternoonTime" type="time"></b-form-input>
								</b-col>
							</b-row>
						</b-list-group-item>
						<b-list-group-item class="disposInDay">
							<b-form-checkbox value="mardi">Mardi</b-form-checkbox>
						</b-list-group-item>
						<b-list-group-item class="disposInDay">
							<b-form-checkbox value="mercredi">Mercredi</b-form-checkbox>
						</b-list-group-item>
						<b-list-group-item class="disposInDay">
							<b-form-checkbox value="jeudi">Jeudi</b-form-checkbox>
						</b-list-group-item>
						<b-list-group-item class="disposInDay">
							<b-form-checkbox value="vendredi">Vendredi</b-form-checkbox>
						</b-list-group-item>
						<b-list-group-item class="disposInDay">
							<b-form-checkbox value="samedi">Samedi</b-form-checkbox>
						</b-list-group-item>
						<b-list-group-item class="disposInDay">
							<b-form-checkbox value="dimanche">Dimanche</b-form-checkbox>
						</b-list-group-item>
					</b-list-group>
				</b-form-checkbox-group>
			</b-form-group>
			<hr>
			<button v-on:click="getDisposInWeek()" type="button">Mettre à jour mes dispos sur mon Agenda</button>
			<div>Selected: <strong>{{ selected }}</strong></div>
		</b-form>
	</div>
</template>

<script>
/* eslint-disable */

export default {
	name: "availabilitySetting",
	data() {
		return {
			msg: "availabilitySetting Vue",
			selected:[],
			startMorningTime:'',
			endMorningTime: '',
			startAfternoonTime: '',
			endAfternoonTime:''

		};
	},
	components: {},
	methods: {
		getDisposInWeek: function(){
			console.log('here are the availabilities selected:', this.selected);
			console.log('startMorningTime:',this.startMorningTime)
		}
	}
};
</script>

<style scoped>

.disposInDay{

text-align: left;
}

</style>
