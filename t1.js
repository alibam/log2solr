var fs = require('fs'),
    utils = require('./lib/utils');

var dateRegx = /.(\d{4}-\d{2}-\d{2}$)/;

fs.readdirSync('D:/ty4a/tools/tomcatlog/logs/10').forEach(function (filename) {
	//  parse histroy logs. named : picc4a.log.2014-07-11
	var matches = filename.match(dateRegx);
	if (matches) {
		if (utils.isLatestDays(matches[1], 7)) {
			console.log(filename);
		}
	} else {
		if (filename === 'catalina.out') {
			// parse realtime log ： catalina.out
			console.log('RealTime log :', filename);
		}
	}
});

