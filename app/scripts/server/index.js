const express = require('express')
const fs = require('fs')

let app = express()

app.get('/', function (req, res) {
  fs.writeFileSync('/Users/jmburu/Desktop/test.text', 'my string', 'utf-8')
  res.json({ message: 'Server is ready!' })
})

module.exports.app = app
