const moment = require('moment')
const jsonwebtoken = require('jsonwebtoken')
const emailSend = require('../config/mail.config')
const { JWT_SECRET } = require('../config/index')
const { Success, Fail } = require('../model/body')
const { checkCode } = require('../common/index')
const { delValue } = require('../config/redis.config')
const User = require('../model/User')

class LoginController {
  constructor () {
    return this
  }

  /** 用户登录
   * @param {string} body.user_name: 用户名
   * @param {string} body.password: 密码
   * @param {string} body.code: 验证码
   * @param {string} body.sid: 客户端uuid
   */
  async login (ctx) {
    const { body } = ctx.request

    const checkResult = await checkCode(body.sid, body.code)
    if (!checkResult) {
      ctx.body = new Fail({
        code: 401,
        msg: '验证码错误,请重试'
      })
      return
    }

    // 数据库中的 user
    const user = await User.findOne({ user_name: body.user_name })

    // 用户验证结果
    const checkUser = user && user.password === body.password
    if (!checkUser) {
      ctx.body = new Fail({
        code: 404,
        msg: user !== null ? '用户名或者密码错误' : '用户不存在'
      })
      return
    }

    // 删除验证码
    delValue(body.sid)
    const token = jsonwebtoken.sign({ id: 'Riceecir' }, JWT_SECRET, {
      expiresIn: Math.floor((Date.now() / 1000) + (60 * 60 * 24))
    })

    ctx.body = new Success({
      code: 200,
      data: {
        token
      }
    })
  }

  /** 找回密码
   * @param {string} body.type: 查找方式类型： 'phone'：通过手机号查找、'email'：通过邮箱炸炒
   * @param {string} body.email:  邮箱
   * @param {string} body.phone:  手机号码
   */
  async sendForgetMsg (ctx) {
    const { body } = ctx.request

    try {
      const res = await emailSend({
        code: '1234',
        user_name: '',
        email: body.email,
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss')
      })
      ctx.body = new Success({
        data: res,
        msg: '邮件发送成功'
      })
    } catch (e) {
      console.log(e)
      ctx.body = new Fail({
        msg: '发送失败'
      })
    }
  }
}

module.exports = new LoginController()
