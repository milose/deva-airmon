'use strict'

import express from 'express'
import mail from 'mailgun-js'
import moment from 'moment'
import env from 'dotenv'
import path from 'path'
import pug from 'pug'
import rec from './app/record'
import conv from './app/convert'

/*
  Initialize
 */

env.config()

let mailgun = mail({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

let app = express()

// Kill process on start
rec.kill()


/*
  Work
 */
