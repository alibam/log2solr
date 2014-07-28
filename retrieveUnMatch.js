var fs = require('fs'),
    // filename = "F:\\opensource\\log2solr\\logs\\picc4a.log.2014-07-01",
    filename = "F:\\opensource\\log2solr\\logs\\catalina.out",
    readline = require('readline');

var regex = /(\S+ \S+) \[(\S+)\] (\S+)\s+(\S+)\s+-(.+)/;

var rl = readline.createInterface({
	input : fs.createReadStream(filename),
	output : fs.createWriteStream(filename + '.unmatch'),
	terminal : false
});


var count = ccount = 0;
rl.on('line', function(line) {
	//console.log(line);
	var matches = line.match(regex);
	if (!matches) {
		count++;
		// console.log(line);
		rl.output.write(line + '\n');
	} else {
		ccount++;
	}
});

rl.on('close', function () {
	console.log('finished. unMatch total: ', count);
	console.log('finished.   Match total: ', ccount);
});

