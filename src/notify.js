'use strict'

import mail from 'mailgun-js'
import pug from 'pug'

export default (converted_file, config) => {

  let mailgun = mail({
    apiKey: config.MAILGUN_KEY,
    domain: config.MAILGUN_DOMAIN
  })

  let email_vars = {
    app_name: config.APP_NAME,
    app_uri: config.APP_URI,

    msg_greeting: 'Hello',
    msg_regards: 'Regards',
    msg_text: config.APP_NAME + ' recorded this airing.',

    // act_uri: 'http://deva.co/act',
    // act_text: 'Play File',
  }

  let message = {
    from: config.APP_NAME + ' <airmon@deva.co>',
    to: 'Gaga <drsvoditelji@gmail.com>',
    cc: 'Uros <ypoiii@gmail.com>',
    subject: 'Airmon record',
    html: pug.renderFile('views/email.pug', email_vars),
    attachment: `${converted_file}`,
  }

  mailgun.messages().send(message)

  if (config.LOG_VERBOSE) {
    console.log('Sent message.')
  }

}
