var fs = require('fs'),
    readline = require('readline'),
    uuid = require('uuid'),
    util = require('util'),
    log = require('./ty4alog');

console.time('log2doc');

function retrieve(line, opt) {
    var s_ip = opt.IP, 
        s_port = opt.PORT,
        s_flag = opt.FLAG;

    var doc = {},
        matches = line.match(log.regex);

    if (!matches) return null;
    for (var k in log.map) {
        var v = log.map[k];
        doc[v] = matches[k];
    }
    doc.date = doc.date.replace(',','.').replace(' ', 'T') + 'Z';
    doc.id = uuid.v4();
    doc.s_ip = s_ip;
    doc.s_port = s_port;
    doc.s_flag = s_flag;
    doc.type = log.type;

    return doc;
}

function Log2doc(filename, opt) {
    var _this = this;

    var rl = readline.createInterface({
        input: fs.createReadStream(opt.BASE + filename),
        output: process.stdout,
        terminal: false
    });

    var docs = [];

    rl.on('line', function(line) {
        var doc = retrieve(line, opt);
        docs.push(doc);       
    });

    rl.on('close', function() {
        console.log(filename, 'total logs : ', docs.length);
        console.timeEnd('log2doc');
        _this.emit('parsed', docs);
    });

}

util.inherits(Log2doc, require('events').EventEmitter);

module.exports = Log2doc;