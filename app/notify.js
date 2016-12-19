'use strict'

import mail from 'mailgun-js'
import pug from 'pug'
import path from 'path'

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
    msg_text: 'Deva.AirMon recorded this airing.',

    // act_uri: 'http://deva.co/act',
    // act_text: 'Play File',
  }

  let message = {
    from: 'deva-airmon <airmon@deva.co>',
    cc: 'Milos <milos@deva.co>',
    to: 'Gaga <drsvoditelji@gmail.com>',
    subject: 'Airmon record',
    html: pug.renderFile('views/email.pug', email_vars),
    attachment: `${config.CONV_DIR}/${converted_file}`,
  }

  mailgun.messages().send(message)

  if (config.LOG_VERBOSE) {
    console.log('Sent message.')
  }

}
