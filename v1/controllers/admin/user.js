/**
 * @author jackatlas
 * @use    管理后台用户相关接口逻辑层
 */

const mongoose = require('mongoose')
const md5 = require('md5')

const AdminConfig = require('../../config/admin')

const AdminUserModel = require('../../models/users/admin.model')

class AdminUser {
  // 创建用户
  static async createUser(ctx) {
    const { name, password, roles } = ctx.request.body
    if (!name) return ctx.body = { code: 1000, msg: '请输入用户名', result: {} }
    if (!password) return ctx.body = { code: 1000, msg: '请输入密码', result: {} }
    if (!roles || roles.length < 1) return ctx.body = { code: 1000, msg: '用户角色不能为空', result: {} }
    const isExisted = await AdminUserModel.findOne({ name })
    if (isExisted) return ctx.body = { code: 1000, msg: '该用户已存在', result: {} }
    const result = await AdminUserModel.create({ name, password: md5(password), roles })
    if (result) {
      ctx.session.user = result
      return ctx.body = { code: 0, msg: 'success', result: {} }
    } else {
      return ctx.throw(500)
    }
  }

  // 用户登录
  static async signIn(ctx) {
    const { name, password } = ctx.request.body
    if (!name) return ctx.body = { code: 1000, msg: '请输入用户名', result: {} }
    if (!password) return ctx.body = { code: 1000, msg: '请输入密码', result: {} }
    // 此段注释禁用了默认用户
    // if (name === AdminConfig.name && md5(password) === AdminConfig.password) {
    //   ctx.session.user = { name, password, roles: AdminConfig.roles }
    //   return ctx.body = {code: 0, msg: 'success'}
    // }
    const result = await AdminUserModel.findOne({ name, password: md5(password) })
    if (!result) return ctx.body = { code: 1000, msg: '用户名或密码错误', result: {} }
    ctx.session.user = result
    return ctx.body = { code: 0, msg: 'success', result: {} }
  }

  // 获取单个用户信息
  static async getUserInfo(ctx) {
    return ctx.body = { code: 0, msg: 'success', result: { name: ctx.session.user.name, roles: ctx.session.user.roles } }
  }

  // 用户退出
  static async signOut(ctx) {
    ctx.session.user = null
    return ctx.body = { code: 0, msg: 'success', result: {} }
  }
}

module.exports = AdminUser
