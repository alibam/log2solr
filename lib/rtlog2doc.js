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

    // content prase.
    if (matches) {
        for (var k in log.map) {
            var v = log.map[k];
            doc[v] = matches[k];
        }
        doc.type = log.type;
    } else {
        // logs generate by called : "system.out.println" or other format.
        var _matches = line.match(/(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})\s/);
        if (_matches) {
            doc.date = _matches[1].replace(' ', 'T') + '.103';
        }
        doc.message = line;
        doc.type = 'rtlog';        
    }
    
    doc.date = doc.date ? doc.date.replace(',','.').replace(' ', 'T') + 'Z' : null;
    doc.id = uuid.v4();
    doc.s_ip = s_ip;
    doc.s_port = s_port;
    doc.s_flag = s_flag;
    

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