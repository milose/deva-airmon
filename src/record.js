'use strict'

import {
  exec
} from 'child_process'

exports.begin = (outputFile) => exec(`arecord -q -f cd ${outputFile}`)

exports.end = (processName = 'arecord') => exec(`pkill ${processName}`)
