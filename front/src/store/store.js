import Vue from 'vue'
import Vuex from 'vuex'
import * as cHelpers from '.././modules/calendar/calendarHelpers'

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
import twix from 'twix';


Vue.use(Vuex)

export const store = new Vuex.Store({
 	state: {
 	//----User datas---------
 		// role: '',
 	//----Calendar Datas-----
 		hello:'hello',
 		//--initialization of the calendar
 		now: cHelpers.getCurrentDate(),
 		agendaRangeTime:cHelpers.InitializeDefaultTimeRange(),
 		agendaSlots:[]
 	},
 	mutations:{
 		slotsAvailables(state, slots){
 			state.agendaSlots = slots;
 		}
 	}
 })
