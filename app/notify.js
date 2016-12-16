'use strict'

import mail from 'mailgun-js'
import pug from 'pug'

export default (config) => {
  let mailgun = mail({
    apiKey: config.MAILGUN_KEY,
    domain: config.MAILGUN_DOMAIN
  })

  let email_vars = {
    app_name: config.APP_NAME,
    app_uri: config.APP_URI,

    msg_greeting: 'Hello',
    msg_regards: 'Regards',
    msg_text: 'Hehe.',

    // act_uri: 'http://deva.co/act',
    // act_text: 'Play File',
  }

  let message = {
    from: 'deva-airmon <airmon@deva.co>',
    to: 'Milos <milos@deva.co>',
    subject: 'Uploaded file',
    html: pug.renderFile('views/email.pug', email_vars),
    attachment: path.join(__dirname + `/../${config.CONV_DIR}/${converted_file}`),
  }

  mailgun.messages().send(message)
}
