'use strict'

import mail from 'mailgun-js'
import pug from 'pug'

export default (convertedFile) => {
  let mailgun = mail({
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    host: process.env.MAILGUN_HOST || 'api.mailgun.net',
  })

  let emailVars = {
    app_name: process.env.APP_NAME,
    app_uri: process.env.APP_URI,

    msg_greeting: 'Hello',
    msg_regards: 'Regards',
    msg_text: process.env.APP_NAME + ' recorded this airing.',

    // act_uri: 'http://deva.co/act',
    // act_text: 'Play File',
  }

  let message = {
    from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_EMAIL}>`,
    to: process.env.MAIL_TO,
    subject: process.env.MAIL_SUBJECT,
    html: pug.renderFile('views/email.pug', emailVars),
    attachment: convertedFile,
  }

  mailgun.messages().send(message, function (error, body) {
    if (process.env.LOG_VERBOSE) {
      console.log('Notification sent.', body)
    }

    if (error) {
      console.error(error)
    }
  })
}
