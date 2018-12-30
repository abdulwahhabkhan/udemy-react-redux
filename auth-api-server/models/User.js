const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('../config')
const db = require('../db')

const User = db.model('users', {
  async beforeSave() {
    const password = this.get('password')
    if (password) {
      this.set('passwordHash', await bcrypt.hash(password, 10))
      this.del('password')
    }
    this.set('email', this.get('email').toLowerCase())
  },

  checkPassword(password) {
    return bcrypt.compare(password, this.get('passwordHash'))
  },

  getToken() {
    const payload = { sub: this._id }
    return new Promise((resolve, reject) => {
      jwt.sign(payload, config.secret, {}, (err, token) => {
        err ? reject(err) : resolve(token)
      })
    })
  },
})

module.exports = User
