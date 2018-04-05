//importing momentJs library //
import moment from 'moment';

//local setting
import 'moment/locale/fr';
moment.locale('fr');

//using twix to get range time
import twix from 'twix';



// ----- Our Helpers for calendar components -----

// return moment object current day
function getCurrentDate (){
	return moment();
};

//return moment object for a date given as parameter. the date is string or moment
function getDate(date) {
	return moment(date);
};

//return the number of the days in the month of the date given as parameter
function getDaysNumberInMonth(date){
	return moment(date).daysInMonth();
};

// return the starting day (moment object) of the month for a date given as parameter
function getMonthFirstDate(date){
	return moment(date).startOf('month');
};

//return the last day of the month(moment object) for a date given as parameter
function getMonthLastDate(date){
	return moment(date).endOf('month');
}

// return the first day (moment object) of the week for a date given as parameter
function getWeekFirstDate(date){
	return moment(date).startOf('week');
};

//return the day of the date moment object.
function getDayFirstHour(date){
	return moment(date).startOf('day');
}

//return the day position in the week of the 1st day of the month
function getWeekFirstDayPosition(date){
	let wd = getMonthFirstDate(date);
	return wd.day();
}

// return the week number (number) for a date given as parameter
function getWeekNumber(date){
	return moment().format('ww');
};

//return object containing the starting day and final day of the duration ( 'day, week, month, year), 
// starting with a given date
function getTimeRange(nb, duration, date) {
	let tR = moment.duration(nb, duration);
	return tR.afterMoment(date);
};


//return an array with days as moment object for a given time range
function getDaysOfTheTimeRange(start,end){
	 var arr = moment(start).twix(end).toArray('days');
	 return arr;
}

//create a slot Object 
function createSlotObject(start){
	let slotObject = Object.create(null);
	slotObject.isInDay = getDayFirstHour(start);
	slotObject.start = moment(start);
	slotObject.end = moment(start).add(15, 'minutes');
	slotObject.status = 'NotAvailable';
	slotObject.conseillerCalendar = 'usernameWhatever';
	return slotObject;
}

export {
	getCurrentDate,
	getDate,
	getDaysNumberInMonth,
	getMonthFirstDate,
	getMonthLastDate,
	getWeekFirstDate,
	getDayFirstHour,
	getWeekNumber,
	getTimeRange,
	getDaysOfTheTimeRange,
	getWeekFirstDayPosition,
	createSlotObject

}


