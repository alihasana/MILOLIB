import Vue from 'vue'
import Vuex from 'vuex'
import * as cHelpers from '.././modules/calendar/calendarHelpers'

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
import twix from 'twix';
import _ from 'underscore';


Vue.use(Vuex)

export const store = new Vuex.Store({
 	state: {
 	//----User datas---------
 		// role: '',
 	//----Calendar Datas-----
 		//--initialization of the calendar
 		now: cHelpers.getCurrentDate(),
 		agendaRangeTime:cHelpers.InitializeDefaultTimeRange(),
 		// agendaRangeTime:'',
 		minTimeEndFromSlot:'',
 		//--data from db
 		agendaSlots:[],
 		eventTypes:[]
 	},
 	// getters:{
 	// 	updateRangeTime(state) {
 	// 		let nowStartWeek= cHelpers.getWeekFirstDate(state.now);
 	// 		let end = cHelpers.addTwoMonth(state.minTimeEndFromSlot);
 	// 		return cHelpers.getDaysOfTheTimeRange(nowStartWeek,end);
 	// 	}
 	// },
 	mutations:{
 		getSlotsAvailables(state, slots){
 			state.agendaSlots = slots;
 		},
 		getMinTimeRange(state, mTimeRange){
 			state.minTimeEndFromSlot = mTimeRange.end;
 			let nowStartWeek= cHelpers.getWeekFirstDate(state.now);
 			let end = cHelpers.addTwoMonth(state.minTimeEndFromSlot);
 			return state.agendaRangeTime = cHelpers.getDaysOfTheTimeRange(nowStartWeek,end);
 		},
 		getEventTypes(state, eventTypes){
 			state.eventTypes = eventTypes;
 		}
 	}
 })
