var Rtlog2doc = require('./rtlog2doc'),
	Constants = require('./constants');
var rtlog2doc = new Rtlog2doc(Constants.RT_LOG, Constants.DEV);

rtlog2doc.on('parsed', function(docs) {
    console.log(filename, 'parsed logs ：',docs.length);
	process.nextTick(function () {
        // add2Solr(docs, filename);
	});
});