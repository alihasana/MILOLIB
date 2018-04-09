//importing momentJs library //
import moment from 'moment';

//local setting
import 'moment/locale/fr';
moment.locale('fr');

//using twix to get range time
import twix from 'twix';


//-------------Our variables ----------------

let NotAvailable = 'NotAvailable';
let Available = 'Available';
let Booked = 'Booked';


// 'NotAvailable' means that the conseiller is not opening time for any booking
// 'Available' means that the conseiller is opening time for booking
//'Booked' means appointment is there



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

// return the name of the day of a moment date
function getNameOfDay(date){
	return moment(date).format('dddd');
}

//return object containing the starting day and final day of the duration ( 'day, week, month, year), 
// starting with a given date. the nb represents how many days, or week is the duration
function getTimeRange(nb, duration, date) {
	let tR = moment.duration(nb, duration);
	return tR.afterMoment(date);
};


//return an array with days as moment object for a given time range
function getDaysOfTheTimeRange(start,end){
	 let arr = moment(start).twix(end).toArray('days');
	 return arr;
}

//return a time range
function createRange(start,end){
	let range = moment(start).twix(end);
	return range;
}


//create a slot Object : parameters
// start : start time for the object
// duration : duration of the period for the object
// status: either 'NotAvailable' 'Available' 'Booked'
	// 'NotAvailable' means that the conseiller is not opening time for any booking
	// 'Available' means that the conseiller is opening time for booking
	//'Booked' means appointment is there
function createSlotObject(start, duration, status){
	let slotObject = Object.create(null);
	slotObject.isInDay = getDayFirstHour(start);
	slotObject.start = moment(start);
	slotObject.end = moment(start).add(duration, 'minutes');
	slotObject.status = status;
	slotObject.conseillerCalendar = 'usernameWhatever';
	return slotObject;
}


//return array of slotsobjects for a given period, the duration of slots is determined with nb
function setSlotsArray(startPoint,endPoint,nb, status){
			let slotsArray = []
			let start = moment(startPoint);
			let end = moment(endPoint);
			for (let i=start; i.isBefore(end); i.add(nb,'minutes')){
				let builtslot = createSlotObject(i, nb, status);
				slotsArray.push(builtslot);
			}
			return slotsArray;
}
			

//create a duration object between two moments:
function getDuration(start,end){
	let x = moment(start)
  	let y = moment(end)
  return moment.duration(x.diff(y));
}

//return a number from a string
function filterInt (value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
}

//return a number of minutes from hh:mm
function convertTimeInMinutes (hoursMinutes){
	let timeSplit = [];
	timeSplit = hoursMinutes.split(":");
	let totalMinutes = filterInt(timeSplit[0])*60 + filterInt(timeSplit[1])
	return totalMinutes;
}


export {
	NotAvailable,
	Available,
	Booked,
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
	createRange,
	createSlotObject,
	getDuration,
	getNameOfDay,
	filterInt,
	convertTimeInMinutes,
	setSlotsArray

}


