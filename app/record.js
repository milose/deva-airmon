'use strict'

import proc from 'child_process'

exports.begin = (file_to_record) => {

  let cmd = `arecord -q -f cd ${file_to_record}`

  if (process.env.LOG_VERBOSE) {
    console.log(cmd)
  }

  return proc.exec(cmd)

}

exports.end = (process_name = 'arecord') => {

  let cmd = `pkill ${process_name}`

  if (process.env.LOG_VERBOSE) {
    console.log(cmd)
  }

  return proc.exec(cmd)

}
