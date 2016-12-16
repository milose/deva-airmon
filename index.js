'use strict'

/*
  RPI dependencies
 */

import os from 'os'
let gpio = null
if (os.platform() == 'linux') {
  gpio = require('rpi-gpio')
}


/*
  Load dependencies
 */

import express from 'express'
import env from 'dotenv'


/*
  Load modules
 */
import record from './app/record'
import notify from './app/notify'
import convert from './app/convert'


/*
  Initialize
 */

// Config
env.config()

// Kill old recording processes
record.end()

// Raspberry pi
if (gpio) {
  gpio.setup(7, gpio.DIR_IN, gpio.EDGE_BOTH)
}

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

if (gpio) {
  gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value)
  })
}
