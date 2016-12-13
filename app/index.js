'use strict'

require('dotenv').config()

import express from 'express'

let app = express()

app.set('view engine', 'pug')

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Hey',
    message: 'Hello there!'
  })
})

app.get('/record', function(req, res) {
  res.send('rec hehe')
})

app.listen(process.env.PORT)
