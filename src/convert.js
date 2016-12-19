'use strict'

import {
  exec
} from 'child_process'

export default (input_file, output_file, config) => {

  let cmd = `ffmpeg -nostats -loglevel 0 -y -i ${input_file} -ar 32000 -c:a libmp3lame -b:a 64k ${output_file}`

  if (config.LOG_VERBOSE) {
    console.log(cmd)
  }

  return exec(cmd)

}
