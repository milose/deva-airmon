'use strict';

var _child_process = require("child_process");

exports.begin = function (outputFile) {
  return (0, _child_process.exec)("arecord -q -f cd ".concat(outputFile));
};

exports.end = function () {
  var processName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'arecord';
  return (0, _child_process.exec)("pkill ".concat(processName));
};