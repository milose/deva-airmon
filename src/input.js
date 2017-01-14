'use strict'

import os from 'os'
import sleep from 'sleep'

let prevValue = true
let push = null
let release = null

exports.momentary = (channel, onPush, onRelease) => {
  push = onPush
  release = onRelease

  let gpio = null

  // Check if raspberry
  if (os.arch() === 'arm') {
    gpio = require('rpi-gpio')

    gpio.on('change', debounce)

    // Setup listener
    gpio.setup(channel, gpio.DIR_IN, gpio.EDGE_BOTH)
  }
}

let debounce = (channel, value) => {
  if (!value && prevValue) {
    push()
  }

  if (value) {
    release()
  }

  prevValue = value

  sleep.usleep(99000)
}
