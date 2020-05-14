'use strict';

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _moment = _interopRequireDefault(require("moment"));

var _record = _interopRequireDefault(require("./record"));

var _notify = _interopRequireDefault(require("./notify"));

var _convert = _interopRequireDefault(require("./convert"));

var _input = _interopRequireDefault(require("./input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_record["default"].end();

var app = (0, _express["default"])();
app.set('view engine', 'pug');

var onPush = function onPush() {
  if (process.env.LOG_VERBOSE) {
    console.log('Started recording.');
  }

  var recordFile = process.env.APP_PATH + '/' + process.env.TEMP_FILE;

  _record["default"].begin(recordFile).on('close', function () {
    var outputFile = process.env.APP_PATH + '/' + process.env.CONV_DIR + '/' + (0, _moment["default"])().format('YYYY-MM-DD_HH-mm-ss') + ".".concat(process.env.CONV_FILE_EXT);
    (0, _convert["default"])(recordFile, outputFile, process.env).on('close', function () {
      (0, _notify["default"])(outputFile);
    });
  });
};

var onRelease = function onRelease() {
  setTimeout(function () {
    return _record["default"].end();
  }, process.env.EXTEND_RECORDING_BY);
};

_input["default"].momentary(7, onPush, onRelease);

app.listen(process.env.PORT || 1337);

if (process.env.LOG_VERBOSE) {
  console.log('Ready.');
}