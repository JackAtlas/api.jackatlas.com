const router = require('koa-router')()
const adminRouter = require('./admin')
const blogRouter = require('./blog')

router
  .get('/', ctx => {
    ctx.body = 'This is the api entrance of jackatlas.com.'
  })
  .use('/v1/admin', adminRouter.routes())
  .use('/v1/blog', blogRouter.routes())

module.exports = router
