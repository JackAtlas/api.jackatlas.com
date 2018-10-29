/**
 * @author jackatlas
 * @use    管理后台文章相关接口逻辑层
 */

const mongoose = require('mongoose')
const md5 = require('md5')
const _ = require('lodash')

mongoose.Promise = global.Promise

const config = require('../../models/config.js')
const { ArticleModel } = require('../../models')

const { parseTime } = require('../../utils')

class AdminArticle {
  // 获取所有文章
  static async getArticles(ctx) {
    const { query } = ctx.request
    const result = await ArticleModel.find(query || {}).sort({ time: -1 }) || []
    return ctx.body = { code: 0, msg: 'success', result }
  }

  // 获取一篇文章
  static async getArticleByTitle(ctx) {
    const { query } = ctx.request
    if (_.isEmpty(query)) {
      return ctx.body = { code: 1000, msg: '参数错误', result: {} }
    }
    const result = await ArticleModel.findOneAndUpdate(query, { $inc: { readNum: 1, fakeReadNum: 1} }, { new: true })
    return ctx.body = { code: 0, msg: 'success', result }
  }

  // 添加文章
  static async postArticle(ctx) {
    if (!ctx.session.user) {
      ctx.status = 401
      ctx.body = { code: 2000, msg: '请先登录', result: {} }
      return
    }
    const { title, enTitle, author, summary, content, status, tags, fakeReadNum, time } = ctx.request.body
    if (!title || !enTitle || !content || !status || !time) {
      return ctx.body = { code: 1000, msg: '参数错误', result: {} }
    }
    const sameTitleExisted = await ArticleModel.findOne({ title })
    const sameEnTitleExisted = await ArticleModel.findOne({ enTitle })
    if (sameTitleExisted || sameEnTitleExisted) {
      return ctx.body = { code: 1000, msg: '已有同名文章', result: {} }
    }
    const result = await ArticleModel.create({
      title,
      enTitle,
      author: ctx.session.user.name,
      summary,
      content,
      status: status || config.article.status.draft,
      createTime: parseTime(new Date()),
      updateTime: parseTime(new Date()),
      time: time || parseTime(new Date()),
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
      ctx.body = { code: 2000, msg: '请先登录', result: {} }
      return
    }
    const query = ctx.request.body
    if (_.isEmpty(query)) {
      return ctx.body = { code: 1000, msg: '参数错误', result: {} }
    }
    const fieldsCanUpdate = ['title', 'enTitle', 'summary', 'content', 'status', 'tags', 'fakeReadNum', 'time']
    const fieldToUpdate = {
      updateTime: parseTime(new Date())
    }
    fieldsCanUpdate.forEach(f => {
      if (query[f]) {
        fieldToUpdate[f] = query[f]
      }
    })
    const result = await ArticleModel.findOneAndUpdate({ _id: query._id }, {
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
      ctx.body = { code: 2000, msg: '请先登录', result: {} }
      return
    }
    const { query } = ctx.request
    if (_.isEmpty(query)) {
      return ctx.body = { code: 1000, msg: '参数错误', result: {} }
    }
    const result = await ArticleModel.remove(query)
    return ctx.body = { code: 0, msg: 'success', result: {} }
  }
}

module.exports = AdminArticle
