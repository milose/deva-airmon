'use strict'

import { exec } from 'child_process'

exports.begin = (file_to_record) => exec(`arecord -q -f cd ${file_to_record}`)

exports.end = (process_name = 'arecord') => exec(`pkill ${process_name}`)
