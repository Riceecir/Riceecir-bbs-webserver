const mongoose = require('../config/db.config')
const Schema = mongoose.Schema

// 用户信息
const UserSchema = new Schema({
  user_name: String,
  nick_name: String,
  email: String,
  password: String,
  register_time: String
})
const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel
