var Log2doc = require('./lib/log2doc'),
    fs = require('fs');

var logfile = './sample/picc4a.log';
// var logfile = 'D:/ty4a/tools/tomcatlog/logs/picc4a.log.2014-07-15';

var tcFolder = 'D:/ty4a/tools/tomcatlog/logs/10/11';

if (!fs.existsSync(tcFolder)) {
	console.log('file not exit');
	process.exit();
}

if(fs.statSync(tcFolder).isDirectory()) {
	console.log('folder');
	process.exit();
} else {
	process.exit();
}








var log2doc = new Log2doc(logfile);

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
}