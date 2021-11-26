const router = require('koa-router')()
const adminRouter = require('./admin')
const blogRouter = require('./blog')
const marvelRouter = require('./marvel')

router
  .get('/api', ctx => {
    ctx.body = 'This is the api entrance of jackatlas.com.'
  })
  .use('/api/v1/admin', adminRouter.routes())
  .use('/api/v1/blog', blogRouter.routes())
  .use('/api/marvel', marvelRouter.routes())

module.exports = router
