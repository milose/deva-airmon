'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mailgunJs = _interopRequireDefault(require("mailgun-js"));

var _pug = _interopRequireDefault(require("pug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(convertedFile) {
  var mailgun = (0, _mailgunJs["default"])({
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    host: process.env.MAILGUN_HOST || 'api.mailgun.net'
  });
  var emailVars = {
    app_name: process.env.APP_NAME,
    app_uri: process.env.APP_URI,
    msg_greeting: 'Hello',
    msg_regards: 'Regards',
    msg_text: process.env.APP_NAME + ' recorded this airing.' // act_uri: 'http://deva.co/act',
    // act_text: 'Play File',

  };
  var message = {
    from: "".concat(process.env.MAIL_FROM_NAME, " <").concat(process.env.MAIL_FROM_EMAIL, ">"),
    to: process.env.MAIL_TO,
    subject: process.env.MAIL_SUBJECT,
    html: _pug["default"].renderFile('views/email.pug', emailVars),
    attachment: convertedFile
  };
  mailgun.messages().send(message, function (error, body) {
    if (process.env.LOG_VERBOSE) {
      console.log('Notification sent.', body);
    }

    if (error) {
      console.error(error);
    }
  });
};

exports["default"] = _default;