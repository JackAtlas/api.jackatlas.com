/**
 * @author jackatlas
 * @use    文章 schema
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { parseTime } = require('../../utils')

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  enTitle: { type: String, required: true },
  author: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: Number, required: true },
  createTime: { type: String, default: parseTime(new Date()) },
  updateTime: { type: String, default: parseTime(new Date()) },
  time: { type: String, default: parseTime(new Date()) },
  tags: { type: Array, default: [] },
  fakeReadNum: { type: Number, default: 0 },
  readNum: { type: Number, default: 0 }
})

// status
// 1：草稿，2：已发布，3：已删除

module.exports = mongoose.model('articles', ArticleSchema)
