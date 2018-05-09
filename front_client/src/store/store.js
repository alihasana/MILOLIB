import Vue from 'vue'
import Vuex from 'vuex'
// import * as cHelpers from '.././modules/calendar/calendarHelpers'

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
import twix from 'twix';
import _ from 'underscore';


Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		// rdv: {
		// 	_id: '',
		// 	appointmentTypes: '',
		// 	slots: '',
		// 	updatedAt: '',
		// 	userId: '',
		// 	createdAt: '',
		// }

		// test: 'turlututu',
		calendarId: '',
		calendarSlots: '',
		appointmentTypes: '',


	},
	mutations: {
		// getRdv: (state) => {
		// 	return state.rdv;
		// }
		// getRdv: (state) => state.rdv,
		// getRdv: (state) => state.rdv.userId,

		// getTest: (state, monTest ) => {
		// 	return state.test = monTest;
		// },
		getCalendarId: (state, monId  ) => {
			return state.calendarId = monId;
		},
		getSlots: (state, mesSlots ) => {
			return state.calendarSlots = mesSlots;
		},
		getappointmentType: (state, mesAppointmentTypes) => {
			return state.appointmentTypes = mesAppointmentTypes;
		},

		// getSlots: (state) => {
		// 	return state.calendarSlots;
		// },
		// getappointmentType: (state) => {
		// 	return state.appointmentTypes;
		// },
	},
	// mutations: {
	// 	CalendarId: (state) => {
	// 		state.calendarId = "lol";
	// 	 },
	// 	Slots: (state) => {
	// 		state.calendarSlots = "lool";
	// 	},
	// 	appointmentType: (state) => {
	// 		state.appointmentTypes = "loool";
	// 	},
 // 	}
})
// export const store = new Vuex.Store({
//  	state: {
 	//----User datas---------
 		// role: '',
 	//----Calendar Datas-----
 		//--initialization of the calendar
 		// now: cHelpers.getCurrentDate(),
 		// agendaRangeTime:cHelpers.InitializeDefaultTimeRange(),
 		// agendaRangeTime:'',
 		// minTimeEndFromSlot:'',
 		//--data from db
 		// agendaSlots:[],
 		// eventTypes:[]
 	// },
 	// getters:{
 	// 	updateRangeTime(state) {
 	// 		let nowStartWeek= cHelpers.getWeekFirstDate(state.now);
 	// 		let end = cHelpers.addTwoMonth(state.minTimeEndFromSlot);
 	// 		return cHelpers.getDaysOfTheTimeRange(nowStartWeek,end);
 	// 	}
 	// },
//  	mutations:{
//  		getSlotsAvailables(state, slots){
//  			state.agendaSlots = slots;
//  		},
//  		getMinTimeRange(state, mTimeRange){
//  			state.minTimeEndFromSlot = mTimeRange.end;
//  			let nowStartWeek= cHelpers.getWeekFirstDate(state.now);
//  			let end = cHelpers.addTwoMonth(state.minTimeEndFromSlot);
//  			return state.agendaRangeTime = cHelpers.getDaysOfTheTimeRange(nowStartWeek,end);
//  		},
//  		getEventTypes(state, eventTypes){
//  			state.eventTypes = eventTypes;
//  		}
//  	}
//  })
