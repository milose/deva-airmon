'use strict'

import express from 'express'
import env from 'dotenv'
import moment from 'moment'

import record from './app/record'
import notify from './app/notify'
import convert from './app/convert'
import input from './app/input'


/*
  Initialize
 */

// Load configuration to process.env
env.config()

// Kill old recording processes
record.end()

// Express
let app = express()
app.set('view engine', 'pug')


/*
  Work
 */

let onPush = () => {
  if (process.env.LOG_VERBOSE) {
    console.log('Started recording.')
  }

  record.begin(process.env.TEMP_FILE)
    .on('close', () => {
      let output_file = moment()
        .format('YYYY-MM-DD_HH-mm-ss') + `.${process.env.CONV_FILE_EXT}`

      convert(output_file, process.env).on('close', () => notify(output_file, process.env))
    })
}

let onRelease = () => {
  record.end()
}

input.momentary(7, onPush, onRelease)

app.listen(process.env.PORT || 1337, () => {
  console.log('Started')
});

if (process.env.LOG_VERBOSE) {
  console.log('Ready.')
}
