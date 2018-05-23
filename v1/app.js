const Koa = require('koa')
const app = module.exports = new Koa()
const convert = require('koa-convert')
const onerror = require('koa-onerror')
const bodyparser = require('koa-body')
const logger = require('koa-logger')
const session = require('koa-session')

const db = require('./models/db')
const config = require('./config/common')

const adminRouter = require('./routes/admin')

onerror(app)

// cookies
app.keys = ['jackatlas:secret']
const CONFIG = {
  key: 'jackatlas',
  maxAge: 604800000, // 7 天
  overwrite: true,
  signed: true
}

app.use(convert(logger()))
  .use(convert(session(CONFIG, app)))
  .use(bodyparser())

app.use(async (ctx, next) => {
  try {
    const start = new Date()
    await next()
    const ms = new Date() - start
    // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.statusCode || err.status || 500
  }
})

app.use(adminRouter.routes())
  .use(adminRouter.allowedMethods())

app.listen(config.port)

console.log(`api server running on localhost:${config.port}`)
