'use strict'

import {
  exec
} from 'child_process'

exports.begin = (output_file) => exec(`arecord -q -f cd ${output_file}`)

exports.end = (process_name = 'arecord') => exec(`pkill ${process_name}`)
