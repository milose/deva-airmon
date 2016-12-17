'use strict'

import proc from 'child_process'

exports.begin = (file_to_record, log_verbose = false) => {
  return proc.exec(`arecord -q -f cd ${file_to_record}`)
}

exports.end = (process_name = 'arecord', log_verbose = false) => {
  return proc.exec(`pkill ${process_name}`)
}
