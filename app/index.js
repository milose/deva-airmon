'use strict'

require('dotenv').config()

import express from 'express'
import proc from 'child_process'
import d from 'moment'

//import { getFile } from 'dropbox-client'
//var getFile = require('dropbox-client').getFile

let pid = null
let converted_file = ''

let app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hey',
  })
})

app.get('/record', (req, res) => {
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
    converted_file = d().format('YYYY-MM-DD_HH-mm-ss') + `.${process.env.CONV_FILE_EXT}`

    // Convert
    let conv = proc.exec(`ffmpeg -nostats -loglevel 0 -y -i ${process.env.TEMP_FILE} -ar 32000 -c:a libmp3lame -b:a 64k ${process.env.CONV_DIR}/${converted_file}`)

    conv.on('close', (code) => {
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
    let stop = proc.exec(`pkill arecord`)
    console.log('Stopped', pid)
    pid = null
  }

  res.send('Stopped')
})

app.listen(process.env.PORT || 1337)
