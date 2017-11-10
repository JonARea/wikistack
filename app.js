const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static('/public'))
app.get('/', (req, res) => res.send('hi there'))

app.listen(3000, () => console.log('running on port 3000'))
