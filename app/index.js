'use strict'

require('dotenv').config()

import express from 'express'
import proc from 'child_process'
import d from 'moment'

let pid = null
let input_file = 'input.wav'
let output_file = ''

let app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hey',
  })
})

app.get('/record', (req, res) => {
  output_file = d().format('YYYY-MM-DD_HH-mm-ss_SSSS')

  // Record
  let rec = proc.spawn(`arecord -f cd ${input_file}`)

  // Set the PID
  pid = rec.pid

  // Error
  rec.stderr.on('data', (data) => {
    console.log('error', data)

    pid = null
  })

  // Close
  rec.on('close', (code) => {
    console.log(`arecord process exited with code ${code}`)

    pid = null

    // Convert
    let conv = proc.spawn(`ffmpeg -nostats -loglevel 0 -y -i ${input_file} -ar 32000 -c:a libmp3lame -b:a 64k ${output_file}`)

    conv.on('close', (code) => {
      console.log('File converted.')
    })
  })

  // Output
  res.render('record', {
    title: 'Hey',
  })
})

app.get('/stop', (req, res) => {

  if (pid) {
    let stop = proc.exec(`kill -KILL ${pid}`)
  }

  res.send('Stopped')
})

app.listen(process.env.PORT)
