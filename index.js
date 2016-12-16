'use strict'

/*
  Load dependencies
 */

import express from 'express'
import env from 'dotenv'
import os from 'os'

import record from './app/record'
import notify from './app/notify'
import convert from './app/convert'


/*
  RPI dependencies
 */

let gpio = null
if (os.arch() == 'arm') {
  gpio = require('rpi-gpio')

  gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value)
  })

  gpio.setup(7, gpio.DIR_IN, gpio.EDGE_BOTH)
  gpio.setup(4, gpio.DIR_IN, gpio.EDGE_BOTH)

  console.log('RPi enabled')
}


/*
  Initialize
 */

// Config
env.config()

// Kill old recording processes
record.end()

// Express
let app = express()
app.set('view engine', 'pug')


/*
  Work
 */

function job() {
  record.begin(process.env.TEMP_FILE).on('close', () => {
    convert(process.env).on('close', () => {
      notify(process.env)
    })
  })
}

console.log('Ready.')
