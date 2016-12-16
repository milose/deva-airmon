'use strict'

import proc from 'child_process'
import path from 'path'

let kill = (process_name = 'arecord') => {
  proc.exec(`pkill ${process_name}`)
}

module.exports.kill = kill
