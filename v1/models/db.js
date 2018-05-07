/**
 * @author jackatlas
 * @use    数据库连接
 */

const mongoose = require('mongoose')
const config = require('../config/common')

mongoose.connect(config.mongo.uri)

// 连接成功
mongoose.connection.once('connected', () => {
  console.log('Mongoose connection open to ' + config.mongo.uri)
})

// 连接失败
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err)
})

// 断开连接
mongoose.connection.once('disconnected', () => {
  console.log('Mongoose connection disconnected')
})
