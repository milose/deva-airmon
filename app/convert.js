'use strict'

import { exec } from 'child_process'

export default (output_file, config) => {

  let cmd = `ffmpeg -nostats -loglevel 0 -y -i ${config.TEMP_FILE} -ar 32000 -c:a libmp3lame -b:a 64k ${config.CONV_DIR}/${output_file}`

  if (config.LOG_VERBOSE) {
    console.log(cmd)
  }

  return exec(cmd)

}
