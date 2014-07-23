//sample: 2014-07-17 01:46:56,315 [ContainerBackgroundProcessor[StandardEngine[Catalina]]] INFO  com.dcits.ty4a.filter.SessionListener    -session destroyed.   loginCount updated.

var regex = /(\S+ \S+) \[(\S+)\] (\S+)\s+(\S+)\s+-(.+)/;
//           date        thread  level   class    msg
var map = {
  1: 'date'
, 2: 'thread'
, 3: 'level'
, 4: 'class'
, 5: 'message'
};

var type = 'ty4a';

module.exports = {
  regex: regex
, map: map
, type: type
};