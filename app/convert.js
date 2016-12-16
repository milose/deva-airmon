'use strict'

import proc from 'child_process'

export default (config) => {
  let converted_file = moment().format('YYYY-MM-DD_HH-mm-ss') + `.${config.CONV_FILE_EXT}`
  return proc.exec(`ffmpeg -nostats -loglevel 0 -y -i ${config.TEMP_FILE} -ar 32000 -c:a libmp3lame -b:a 64k ${config.CONV_DIR}/${converted_file}`)
}
