'use strict'

import express from 'express'
import env from 'dotenv'
import moment from 'moment'

import record from './record'
import notify from './notify'
import convert from './convert'
import input from './input'

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

  let recordFile = process.env.APP_PATH + '/' + process.env.TEMP_FILE

  record.begin(recordFile)
    .on('close', () => {
      let outputFile = process.env.APP_PATH +
        '/' + process.env.CONV_DIR +
        '/' + moment().format('YYYY-MM-DD_HH-mm-ss') +
        `.${process.env.CONV_FILE_EXT}`

      convert(recordFile, outputFile, process.env)
        .on('close', () => {
          notify(outputFile, process.env)
        })
    })
}

let onRelease = () => {
  setTimeout(() => record.end(), process.env.EXTEND_RECORDING_BY)
}

input.momentary(7, onPush, onRelease)

app.listen(process.env.PORT || 1337)

if (process.env.LOG_VERBOSE) {
  console.log('Ready.')
}
