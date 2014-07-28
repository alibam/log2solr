var utils = module.exports = {};

utils.isLatestDays = function (dateStr, days) {
	var _now = new Date(),
	now = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate()),
	toCompare = new Date(dateStr + " 00:00:00");
	return  toCompare > now ? false : toCompare.getTime() + (days * 24 * 3600 * 1000) >= now.getTime();	
}