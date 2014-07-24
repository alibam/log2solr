var Log2doc = require('./lib/log2doc'),
    fs = require('fs'),
    path = require('path'),
    solr = require('solr-client'),
    Constants = require('./lib/constants');

// var logfile = './sample/picc4a.log';
// var logfile = 'D:/ty4a/tools/tomcatlog/logs/picc4a.log.2014-07-15';

var logFolder = Constants.DEV.BASE;

if (!fs.existsSync(logFolder) || !fs.statSync(logFolder).isDirectory()) {
	console.log('file not exit or not a folder.');
	process.exit(1);
}

console.log(logFolder);

fs.readdirSync(logFolder).forEach(function (filename) {
    if (filename === 'catalina.out') {
    	console.log('Realtime log.', filename);
    } else {
    	var log2doc = new Log2doc(filename, Constants.DEV);
    	log2doc.on('parsed', function(docs) {
		    // console.log(filename, 'parsed logs ：',docs.length);
		    process.nextTick(function () {
		        add2Solr(docs, filename);
			});
		});
    }
});

function add2Solr(docs, tag) {
	console.time(tag);
    client = solr.createClient();
    client.autoCommit = true;
    client.add(docs,function(err,obj){
        if (err) {
       		console.log(err);
        } else {
       	    console.log(obj);
            console.timeEnd(tag);
        }
    });
}



/*var log2doc = new Log2doc(logfile);

console.log(process.argv.length < 3);

// console.log(require('os').networkInterfaces());

log2doc.on('parsed', function(docs) {
    console.log('parsed logs ：',docs.length);
    process.nextTick(function () {
        // add2Solr(docs);
    });
});

function add2Solr(docs) {
    if(docs.length > 0)
        for(var i in docs)
            console.log(docs[i]);
}*/