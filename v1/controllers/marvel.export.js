/**
 * @author jackatlas
 * @use    漫威接口请求转发逻辑层
 */

const axios = require('axios')
const md5 = require('md5')

const { PublicKey, PrivateKey } = require('../config/marvel.key')

class Marvel {
  static async ProxyRequest(ctx) {
    const { category, id, item } = ctx.params
    let url = `https://gateway.marvel.com/v1/public/`
    if (category) url = url + category
    if (id) url = url + '/' + id
    if (item) url = url + '/' + item
    const ts = new Date().getTime()
    url = url + `?ts=${ts}&apikey=${PublicKey}&hash=${md5(ts + PrivateKey + PublicKey)}`
    await axios
      .get(url)
      .then(res => {
        return ctx.body = res.data
      })
      .catch(err => {
        return ctx.body = err.data
      })
  }
}

module.exports = Marvel