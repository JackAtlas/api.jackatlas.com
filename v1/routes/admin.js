/**
 * @author jackatlas
 * @use    管理后台接口配置
 */

const { AdminArticle, AdminUser } = require('../controllers/admin.export')
const router = require('koa-router')()

router
  .get('/', ctx => {
    ctx.body = 'This is the api entrance of jackatlas.com.'
  })
  // 用户相关
  .post('/v1/admin/login', AdminUser.signIn)                  // 用户登录
  .post('/v1/admin/logout', AdminUser.signOut)                // 用户登出
  .post('/v1/admin/create', AdminUser.createUser)             // 创建用户
  // 文章相关
  .get('/v1/admin/articles', AdminArticle.getArticles)        // 获取所有文章
  .get('/v1/admin/article', AdminArticle.getArticleByTitle)   // 获取一篇文章
  .post('/v1/admin/article', AdminArticle.postArticle)        // 新增文章
  .put('/v1/admin/article', AdminArticle.updateArticle)       // 修改一篇文章
  .delete('/v1/admin/article', AdminArticle.deleteArticle)    // 删除一篇文章

module.exports = router
