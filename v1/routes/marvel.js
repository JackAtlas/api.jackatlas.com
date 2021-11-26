/**
 * @author jackatlas
 * @use    漫威接口请求转发
 */

const router = require('koa-router')()
const Marvel = require('../controllers/marvel.export')

router
  .get('/:category', Marvel.ProxyRequest)
  .get('/:category/:id', Marvel.ProxyRequest)
  .get('/:category/:id/:item', Marvel.ProxyRequest)

module.exports = router