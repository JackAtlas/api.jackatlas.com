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
  summary: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: Number, required: true },
  createTime: { type: Date, default: new Date() },
  updateTime: { type: Date, default: new Date() },
  tags: { type: Array, default: [] },
  fakeReadNum: { type: Number, default: 0 },
  readNum: { type: Number, default: 0 }
})

// status
// 1：草稿，2：已发布，3：已删除

module.exports = mongoose.model('Articles', AdminArticleSchema)
