/**
 * @author jackatlas
 * @use    博客站案例相关接口逻辑层
 */

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const { DemoModel } = require('../../models/')

class BlogDemo {
  // 获取所有案例
  static async getDemos(ctx) {
    let result = await DemoModel.find({})
    result = result.reverse()
    return ctx.body = { code: 0, msg: 'success', result }
  }
}

module.exports = BlogDemo
