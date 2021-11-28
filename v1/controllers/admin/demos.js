/**
 * @author jackatlas
 * @use    管理后台案例相关接口逻辑层
 */

const mongoose = require('mongoose')
const _ = require('lodash')
mongoose.Promise = global.Promise

const { DemoModel } = require('../../models')

class AdminDemo {
  // 获取所有案例
  static async getDemos(ctx) {
    let result = await DemoModel.find({})
    result = result.reverse()
    return ctx.body = { code: 0, msg: 'success', result }
  }

  // 添加案例
  static async postDemo(ctx) {
    if (!ctx.session.user) {
      ctx.status = 401
      ctx.body = { code: 2000, msg: '请先登录', result: {} }
    }
    const { title, image, summary, link, source } = ctx.request.body
    if (!title || !summary, !link) {
      return ctx.body = { code: 1000, msg: '参数错误', result: {} }
    }
    const sameTitleExisted = await DemoModel.findOne({ title })
    const sameLinkExisted = await DemoModel.findOne({ link })

    if (sameTitleExisted || sameLinkExisted) {
      return ctx.body = { code: 1000, msg: '已有相同案例', result: {} }
    }

    const result = await DemoModel.create({ title, image, summary, link, source })
    if (result) {
      return ctx.body = { code: 0, msg: 'success', result }
    } else {
      return ctx.throw(500)
    }
  }

  // 修改案例
  static async updateDemo(ctx) {
    if (!ctx.session.user) {
      ctx.status = 401
      ctx.body = { code: 2000, msg: '请先登录', result: {} }
      return
    }
    const query = ctx.request.body
    if (_.isEmpty(query)) {
      return ctx.body = { code: 1000, msg: '参数错误', result: {} }
    }
    const fieldsCanUpdate = ['title', 'image', 'summary', 'link', 'source']
    const fieldToUpdate = {}
    fieldsCanUpdate.forEach(f => {
      if (query[f]) {
        fieldToUpdate[f] = query[f]
      }
    })
    const result = await DemoModel.findOneAndUpdate({ _id: query._id }, { $set: fieldToUpdate }, { new: true })
    return ctx.body = { code: 0, msg: 'success', result }
  }
}

module.exports = AdminDemo