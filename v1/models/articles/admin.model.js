/**
 * @author jackatlas
 * @use    管理后台文章 schema
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminArticleSchema = new Schema({
  title: { type: String, required: true },
  enTitle: { type: String, required: true },
  author: { type: String, required: true },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
  content: { type: String, required: true },
  status: { type: String, required: true },
  tags: { type: Array, default: [] }
})

module.exports = mongoose.model('Articles', AdminArticleSchema)
