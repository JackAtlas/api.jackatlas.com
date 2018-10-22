/**
 * @author jackatlas
 * @use    管理后台默认管理员账户
 */

const md5 = require('md5')

module.exports = {
  name: 'admin',
  password: md5('admin123'),
  roles: ['admin']
}
