'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _child_process = require("child_process");

var _default = function _default(inputFile, outputFile, config) {
  var cmd = "ffmpeg -nostats -loglevel 0 -y -i ".concat(inputFile, " -joint_stereo 1 -ar 32000 -c:a libmp3lame -b:a 64k -ac 1 ").concat(outputFile);

  if (config.LOG_VERBOSE) {
    console.log(cmd);
  }

  return (0, _child_process.exec)(cmd);
};

exports["default"] = _default;