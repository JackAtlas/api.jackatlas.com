/**
 * @author jackatlas
 * @use    管理后台用户 schema
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminUserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
})

module.exports = mongoose.model('Users', AdminUserSchema)
