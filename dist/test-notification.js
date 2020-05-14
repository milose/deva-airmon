'use strict';

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _notify = _interopRequireDefault(require("./notify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

(0, _notify["default"])(null); // do not exit

var app = (0, _express["default"])();
app.listen(process.env.PORT || 1337);