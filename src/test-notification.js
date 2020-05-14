'use strict'

import express from 'express'
import env from 'dotenv'
import notify from './notify'

env.config()

notify(null)

// do not exit
let app = express()
app.listen(process.env.PORT || 1337)
