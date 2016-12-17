'use strict'

import os from 'os'
import sleep from 'sleep'
import record from './record'

let output_log = false
let prev_value = true // del?
let last_interrupt_time = 0

exports.listen = (callback, log_verbose = false) => {
  let gpio = null
  output_log = log_verbose

  // Check if raspberry
  if (os.arch() == 'arm') {
    gpio = require('rpi-gpio')

    gpio.on('change', debounce)

    // Setup for listening
    gpio.setup(7, gpio.DIR_IN, gpio.EDGE_BOTH)

    if (output_log) {
      console.log('RPi enabled')
    }
  }
}

let debounce = (channel, value) => {
  let interrupt_time = new Date().getTime()

  if (interrupt_time - last_interrupt_time <= 1000 && last_interrupt_time > 0) {
    return
  }

  last_interrupt_time = interrupt_time

  if (!value) {
    console.log('Started recording.')

    // Process the callback
    // callback()
  } else {
    console.log('Ended recording.')

    // record.end()
  }


  //   if (prev_value && !value) {
  //     if (output_log) {
  //       console.log('Started recording.')
  //     }
  //
  //     // Process the callback
  //     callback()
  //   }
  //
  //   if (value) {
  //     if (output_log) {
  //       console.log('Ended recording.')
  //     }
  //
  //     record.end()
  //   }
  //
  //   prev_value = value
  //
  //   // Debounce
  //   sleep.usleep(75000)
}
