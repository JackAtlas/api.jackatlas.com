/**
 * @author jackatlas
 * @use    博客站文章相关接口逻辑层
 */

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const showdown = require('showdown')
const converter = new showdown.Converter()

const config = require('../../models/config.js')
const { ArticleModel } = require('../../models/')

class BlogArticle {
  // 获取所有文章
  static async getArticles(ctx) {
    const temp = await ArticleModel.find({ status: config.article.status.post }).sort({ time: 1 }) || []
    const result = temp.map(t => ({
      title: t.title,
      enTitle: t.enTitle,
      author: t.author,
      summary: t.summary,
      time: t.time,
      readNum: t.readNum > t.fakeReadNum ? t.readNum : t.fakeReadNum
    }))
    return ctx.body = { code: 0, msg: 'success', result }
  }

  // 获取一篇文章
  static async getArticle(ctx) {
    const { query } = ctx
    if (!query.enTitle) {
      return ctx.body = { code: 1000, msg: '请传入文章英文标题', result: null }
    }
    const temp = await ArticleModel.findOneAndUpdate({ enTitle: query.enTitle, status: config.article.status.post }, { $inc: { readNum: 1, fakeReadNum: 1} }, { new: true })
    let result = null
    if (temp) {
      result = {
        title: temp.title,
        enTitle: temp.enTitle,
        author: temp.author,
        summary: temp.summary,
        content: converter.makeHtml(temp.content),
        time: temp.time,
        readNum: temp.readNum > temp.fakeReadNum ? temp.readNum : temp.fakeReadNum
      }
    }
    return ctx.body = { code: 0, msg: 'success', result }
  }
}

module.exports = BlogArticle
