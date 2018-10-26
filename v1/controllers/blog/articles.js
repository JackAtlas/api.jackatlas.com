/**
 * @author jackatlas
 * @use    博客站文章相关接口逻辑层
 */

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const { BlogArticleModel } = require('../../models/')

class BlogArticle {
  // 获取所有文章
  static async getArticles(ctx) {
    const result = await BlogArticleModel.find({ status: 2 }).sort({ time: 1 }) || []
    if (result && result.length > 0) {
      result.readNum = result.readNum > result.fakeReadNum ? result.readNum : result.fakeReadNum
      delete result.fakeReadNum
    }
    return ctx.body = { code: 0, msg: 'success', result }
  }
}
