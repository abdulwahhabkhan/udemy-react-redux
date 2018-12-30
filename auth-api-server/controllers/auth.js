const User = require('../models/User')

exports.signUp = wrap(async (req, res) => {
  const { email, password } = validate(req.body)

  const existingUser = await User.findOne({ email })
  assert(!existingUser, 'The email address has already been registered')

  const user = new User({ email, password })
  await user.save()
  res.json({ token: await user.getToken() })
})

exports.signIn = wrap(async (req, res) => {
  const { email, password } = validate(req.body)

  const user = await User.findOne({ email })
  assert(user, 'The email address has not been registered')

  const match = await user.checkPassword(password)
  assert(match, 'Wrong password')

  res.json({ token: await user.getToken() })
})

exports.requireAuth = wrap(async (req, res) => {
  //...
})

//

function wrap(fn) {
  return (req, res, next) => fn(req, res).then(() => next(), next)
}

function validate(body) {
  assert(body.email && body.password, 'Missing email address and/or password')
  //...
  return body
}

function assert(truthy, errorMessage) {
  if (!truthy) throw new Error(errorMessage)
}
