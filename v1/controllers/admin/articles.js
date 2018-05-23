/**
 * @author jackatlas
 * @use    管理后台文章相关接口逻辑层
 */

const mongoose = require('mongoose')
const md5 = require('md5')
const _ = require('lodash')

mongoose.Promise = global.Promise

const { AdminArticleModel } = require('../../models')

class AdminArticle {
  // 获取所有文章
  static async getArticles(ctx) {
    const { query } = ctx.request
    const result = await AdminArticleModel.find(query || {}) || []
    return ctx.body = { code: 0, msg: 'success', result }
  }

  // 获取一篇文章
  static async getArticleByTitle(ctx) {
    const { query } = ctx.request
    if (_.isEmpty(query)) {
      ctx.status = 403
      ctx.statusText = '参数错误'
      ctx.body = {
        code: 1000,
        msg: '参数错误',
        result: null
      }
      return
    }
    const result = await AdminArticleModel.findOneAndUpdate(query, { $inc: { readNum: 1} }, { new: true })
    return ctx.body = { code: 0, msg: 'success', result }
  }

  // 添加文章
  static async postArticle(ctx) {
    if (!ctx.session.user) {
      ctx.status = 401
      ctx.body = { code: 2000, msg: '请先登录', result: null }
      return
    }
    const { title, enTitle, author, summary, content, status, tags, fakeReadNum } = ctx.request.body
    if (!title || !enTitle || !content || !status) {
      ctx.status = 403
      ctx.body = { code: 1000, msg: '参数错误', result: null }
      return
    }
    const sameTitleExisted = await AdminArticleModel.findOne({ title })
    const sameEnTitleExisted = await AdminArticleModel.findOne({ enTitle })
    if (sameTitleExisted || sameEnTitleExisted) {
      ctx.status = 403
      ctx.body = { code: 1000, msg: '已有同名文章', result: null }
      return
    }
    const result = await AdminArticleModel.create({
      title,
      enTitle,
      author: ctx.session.user.name,
      summary,
      content,
      status: status || 1,
      createTime: new Date(),
      updateTime: new Date(),
      tags,
      fakeReadNum
    })
    if (result) {
      return ctx.body = { code: 0, msg: 'success', result }
    } else {
      return ctx.throw(500)
    }
  }

  /**
   * 修改一篇文章
   */
  static async updateArticle(ctx) {
    if (!ctx.session.user) {
      ctx.status = 401
      ctx.body = { code: 2000, msg: '请先登录', result: null }
      return
    }
    const query = ctx.request.body
    if (_.isEmpty(query)) {
      ctx.status = 403
      ctx.statusText = '参数错误'
      ctx.body = {
        code: 1000,
        msg: '参数错误',
        result: null
      }
      return
    }
    const fieldsCanUpdate = ['title', 'enTitle', 'summary', 'content', 'status', 'tags', 'fakeReadNum']
    const fieldToUpdate = {}
    fieldsCanUpdate.forEach(f => {
      if (query[f]) {
        fieldToUpdate[f] = query[f]
      }
    })
    const result = await AdminArticleModel.findOneAndUpdate({ _id: query._id }, {
      $currentDate: { updateTime: true },
      $set: fieldToUpdate
    }, { new: true })
    return ctx.body = { code: 0, msg: 'success', result }
  }

  /**
   * 彻底删除一篇文章
   */
  static async deleteArticle(ctx) {
    if (!ctx.session.user) {
      ctx.status = 401
      ctx.body = { code: 2000, msg: '请先登录', result: null }
      return
    }
    const { query } = ctx.request
    if (_.isEmpty(query)) {
      ctx.status = 403
      ctx.statusText = '参数错误'
      ctx.body = {
        code: 1000,
        msg: '参数错误',
        result: null
      }
      return
    }
    const result = await AdminArticleModel.remove(query)
    return ctx.body = { code: 0, msg: 'success', result: null }
  }
}

module.exports = AdminArticle
