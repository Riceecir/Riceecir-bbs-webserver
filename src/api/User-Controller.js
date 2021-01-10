const { Success } = require('@/model/Body')
const User = require('../model/User')

class UserController {
  constructor () {
    return this
  }

  /** 检查用户是否可用
   * @param {string} nick_name: 用户名
   *
   * @returns {boolean} data: 用户名是否可用
   */
  async checkUserName (ctx) {
    const { query } = ctx.request
    const user = await User.findOne({ user_name: query.user_name })
    const result = user === null
    ctx.body = new Success({
      data: result,
      msg: result ? '用户名可用' : '用户名已存在'
    })
  }
}

module.exports = new UserController()
