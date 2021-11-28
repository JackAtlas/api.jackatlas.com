/**
 * @author jackatlas
 * @use    案例 schema
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DemoSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: false },
  summary: { type: String, required: true },
  link: { type: String, required: true },
  source: { type: String, required: false }
})

module.exports = mongoose.model('demos', DemoSchema)