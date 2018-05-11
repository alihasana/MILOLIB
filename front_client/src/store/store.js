import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import 'moment/locale/fr';
import twix from 'twix';
import _ from 'underscore';
import AsyncComputed from 'vue-async-computed';
import cal from '../helpers/calendar';

moment.locale('fr');


Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		hourList: [],
	//data from rdv
		selectedAptType:{
			name:'',
			duration:null
		},
	//data from backend
		calendarId: '',
		calendarSlots: '',
		appointmentTypes: []
	},
	getters: {
		calculateSelectedAptTypeDuration: (state) => {
			for (let i=0; i< state.appointmentTypes.length; i++){
				if (state.appointmentTypes[i].name == state.selectedAptType.name){
					return state.selectedAptType.duration = cal.filterInt(state.appointmentTypes[i].duration);
				}
			}
		},
		calendarSlots: (state) => {
			return state.calendarSlots;
		},
		calendarId: (state) => {
			return state.calendarId;
		},
		selectedApt: (state) => {
			return state.selectedAptType
		},
	},
	mutations: {
		getselectedAptTypeName: (state, selected) => {
			state.selectedAptType.name = selected;
		},
		getCalendarId: (state, monId  ) => {
			return state.calendarId = monId;
		},
		getSlots: (state, mesSlots ) => {
			return state.calendarSlots = mesSlots;
		},
		getappointmentType: (state, mesAppointmentTypes) => {
			return state.appointmentTypes = mesAppointmentTypes;
		}
	},
})
