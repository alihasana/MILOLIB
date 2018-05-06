

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


export default{
	convertTimeInMinutes
}