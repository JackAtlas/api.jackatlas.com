/**
 * @author jackatlas
 * @use    博客站接口配置
 */

const { BlogArticle, BlogDemo } = require('../controllers/blog.export')
const router = require('koa-router')()

router
  .get('/articles', BlogArticle.getArticles)
  .get('/article', BlogArticle.getArticle)
  .get('/demos', BlogDemo.getDemos)

module.exports = router
