var fs = require('fs'),
    readline = require('readline'),
    uuid = require('uuid'),
    util = require('util'),
    log = require('./ty4alog');

function Log2doc(filename) {
    var _this = this;
    var rl = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        terminal: false
    });

    var docs = [];

    rl.on('line', function(line) {
        var matches = line.match(log.regex),
            doc = {};
        if (!matches) return null;
        for (var k in log.map) {
            var v = log.map[k];
            doc[v] = matches[k];
        }
        doc.date = doc.date.replace(',','.').replace(' ', 'T') + 'Z';
        doc.type = log.type;
        doc.id = uuid.v4();
        docs.push(doc);      
        // console.log(doc);
    });

    rl.on('close', function() {
        // console.log('total logs : ', docs.length);
        _this.emit('parsed', docs);
    });

}

util.inherits(Log2doc, require('events').EventEmitter);

module.exports = Log2doc;