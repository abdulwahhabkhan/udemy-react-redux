const express = require('express')
const logger = require('morgan')

const auth = require('./controllers/auth')

const app = express()
app.use(logger('combined'))
app.use(express.json())

app.post('/signup', auth.signUp)

const port = process.env.PORT || 3090
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
