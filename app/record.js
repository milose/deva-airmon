'use strict'

import proc from 'child_process'

exports.begin = (file_to_record) => {
  return proc.exec(`arecord -q -f cd ${file_to_record}`)
}

exports.end = (process_name = 'arecord') => {
  return proc.exec(`pkill ${process_name}`)
}
