// const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  // password: String,
  hash: String,
})

// userSchema.pre('save', async function(next) {
//   try {
//     const hash = await bcrypt.hash(this.password, 10)
//     this.password = hash
//     next()
//   } catch (err) {
//     next(err)
//   }
// })

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt
    .compare(candidatePassword, this.password)
    .then(isMatch => callback(null, isMatch), err => callback(err))
}

const User = mongoose.model('User', userSchema)

module.exports = User
