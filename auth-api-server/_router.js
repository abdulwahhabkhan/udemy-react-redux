const passport = require('passport')

const authentication = require('./controllers/authentication')
const passportService = require('./services/passport')

const requireAuth = passport.authenticate('jwt', { session: false })

function router(app) {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' })
  })
  app.post('/signup', authentication.signup)
  app.post('/signin', authentication.signin)
}

module.exports = router
