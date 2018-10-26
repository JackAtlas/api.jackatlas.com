/**
 * @author jackatlas
 * @use    博客站文章 schema
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogArticleSchema = new Schema({
  title: { type: String, required: true },
  enTitle: { type: String, required: true },
  author: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: String, required: true },
  tags: { type: Array, default: [] },
  fakeReadNum: { type: Number, default: 0 },
  readNum: { type: Number, default: 0 }
})

module.exports = mongoose.model('BlogArticles', BlogArticleSchema)
