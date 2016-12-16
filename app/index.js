'use strict'

require('dotenv').config()

import proc from 'child_process'
import express from 'express'
import moment from 'moment'
import path from 'path'
import pug from 'pug'
//import { getFile } from 'dropbox-client'
//var getFile = require('dropbox-client').getFile

var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

let exec_kill = 'pkill arecord'
let pid = null
let converted_file = ''

let app = express()

proc.exec(exec_kill)

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hey',
  })
})

app.get('/record', (req, res) => {
  proc.exec(exec_kill)

  // Record
  let rec = proc.exec(`arecord -q -f cd ${process.env.TEMP_FILE}`)
  pid = rec.pid

  // Error
  rec.stderr.on('data', (data) => {
    pid = null
    console.log('error', data)
  })

  // Close
  rec.on('close', (code) => {
    pid = null
    converted_file = moment().format('YYYY-MM-DD_HH-mm-ss') + `.${process.env.CONV_FILE_EXT}`

    // Convert
    let conv = proc.exec(`ffmpeg -nostats -loglevel 0 -y -i ${process.env.TEMP_FILE} -ar 32000 -c:a libmp3lame -b:a 64k ${process.env.CONV_DIR}/${converted_file}`)

    conv.on('close', (code) => {
      let email_vars = {
        app_name: 'Deva AirMon',
        app_uri: 'http://deva.co',

        msg_greeting: 'Hello',
        msg_regards: 'Regards',
        msg_text: 'Hehe.',

        // act_uri: 'http://deva.co/act',
        // act_text: 'Play File',
      }

      let email = {
        from: 'deva-airmon <airmon@deva.co>',
        to: 'Milos <milos@deva.co>',
        subject: 'Uploaded file',
        html: pug.renderFile('views/email.pug', email_vars),
        attachment: path.join(__dirname + `/../${process.env.CONV_DIR}/${converted_file}`),
      }

      mailgun.messages().send(email, function(error, body) {
        console.log(body)
      })




      // 1. upload file
      // 2. send to slack
      // x. reset converted_file
    })
  })

  // Output
  res.render('record', {
    title: 'Hey',
  })
})

app.get('/stop', (req, res) => {

  if (pid) {
    let stop = proc.exec(exec_kill)
    console.log('Stopped', pid)
    pid = null
  }

  res.send('Stopped')
})

app.listen(process.env.PORT || 1337)
