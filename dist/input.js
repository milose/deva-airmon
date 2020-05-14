'use strict';

var _os = _interopRequireDefault(require("os"));

var _sleep = _interopRequireDefault(require("sleep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var prevValue = true;
var push = null;
var release = null;

exports.momentary = function (channel, onPush, onRelease) {
  push = onPush;
  release = onRelease;
  var gpio = null; // Check if raspberry

  if (_os["default"].arch() === 'arm') {
    gpio = require('rpi-gpio');
    gpio.on('change', debounce); // Setup listener

    gpio.setup(channel, gpio.DIR_IN, gpio.EDGE_BOTH);
  }
};

var debounce = function debounce(channel, value) {
  if (!value && prevValue) {
    push();
  }

  if (value) {
    release();
  }

  prevValue = value;

  _sleep["default"].usleep(99000);
};