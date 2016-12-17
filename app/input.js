'use strict'

import os from 'os'
import sleep from 'sleep'

let prev_value = true,
  push = null,
  release = null

exports.listen = (channel, onPush, onRelease) => {
  let gpio = null

  push = onPush
  release = onRelease

  // Check if raspberry
  if (os.arch() == 'arm') {
    gpio = require('rpi-gpio')

    gpio.on('change', debounce)

    // Setup for listening
    gpio.setup(channel, gpio.DIR_IN, gpio.EDGE_BOTH)
  }
}

let debounce = (channel, value) => {
  if (!value && prev_value) {
    push()
  }

  if (value) {
    release()
  }

  prev_value = value

  sleep.usleep(99000)
}
