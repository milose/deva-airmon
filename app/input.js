'use strict'

import os from 'os'
import sleep from 'sleep'
import record from './record'

exports.listen = (callback) => {

  let gpio = null
  let prev_value = true

  // Check if raspberry
  if (os.arch() == 'arm') {

    // load gpio
    gpio = require('rpi-gpio')

    gpio.on('change', function(channel, value) {

      if (prev_value && !value) {
        if (process.env.LOG_VERBOSE) {
          console.log('Started recording.')
        }

        // Process the callback
        callback()
      }

      if (value) {
        if (process.env.LOG_VERBOSE) {
          console.log('Ended recording.')
        }

        record.end()
      }

      prev_value = value

      // Debounce
      sleep.usleep(75000)
    })

    // Setup for listening
    gpio.setup(7, gpio.DIR_IN, gpio.EDGE_BOTH)

    if (process.env.LOG_VERBOSE) {
      console.log('RPi enabled')
    }

  }

}
