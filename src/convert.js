'use strict'

import { exec } from 'child_process'

export default (inputFile, outputFile, config) => {
  let cmd = `ffmpeg -nostats -loglevel 0 -y -i ${inputFile} -joint_stereo 1 -ar 32000 -c:a libmp3lame -b:a 64k -ac 1 ${outputFile}`

  if (config.LOG_VERBOSE) {
    console.log(cmd)
  }

  return exec(cmd)
}
