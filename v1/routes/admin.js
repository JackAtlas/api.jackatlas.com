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
  .post('/login', AdminUser.signIn)                  // 用户登录
  .post('/logout', AdminUser.signOut)                // 用户登出
  .post('/create', AdminUser.createUser)             // 创建用户
  .get('/user', AdminUser.getUserInfo)               // 获取单个用户信息
  // 文章相关
  .get('/articles', AdminArticle.getArticles)        // 获取所有文章
  .get('/article', AdminArticle.getArticleByTitle)   // 获取一篇文章
  .post('/article', AdminArticle.postArticle)        // 新增文章
  .put('/article', AdminArticle.updateArticle)       // 修改一篇文章
  .delete('/article', AdminArticle.deleteArticle)    // 删除一篇文章

module.exports = router
