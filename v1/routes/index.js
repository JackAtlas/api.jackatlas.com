const router = require('koa-router')()
const adminRouter = require('./admin')
const blogRouter = require('./blog')

router
  .get('/api', ctx => {
    ctx.body = 'This is the api entrance of jackatlas.com.'
  })
  .use('/api/v1/admin', adminRouter.routes())
  .use('/api/v1/blog', blogRouter.routes())

module.exports = router
