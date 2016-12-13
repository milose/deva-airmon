'use strict'

require('dotenv').config()

import express from 'express'

let app = express()

app.get('/', function(req, res) {
  res.send('meow')
})

app.listen(process.env.PORT)
