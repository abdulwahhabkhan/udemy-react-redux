const bcrypt = require('bcrypt')
const passport = require('passport')
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt')
const LocalStrategy = require('passport-local')

const config = require('../config')
const User = require('../models/user')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    wrap(async (email, password) => {
      const user = await User.findOne({ email })
      const isMatch = await bcrypt.compare(password, user.password)
      return isMatch ? user : false
    })
  )
)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.secret,
    },
    wrap(async payload => {
      const user = await User.findById(payload.sub)
      return user || false
    })
  )
)

function wrap(fn) {
  return (...allArgs) => {
    const [args, [done]] = [allArgs.slice(0, -1), allArgs.slice(-1)]
    fn(...args)
      .then(result => done(null, result))
      .catch(done)
  }
}
