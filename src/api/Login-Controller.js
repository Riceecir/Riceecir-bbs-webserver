const moment = require('moment')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const emailSend = require('../config/mail.config')
const { JWT_SECRET } = require('../config/index')
const { Success, Fail } = require('../model/Body')
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
    const checkUser = user && await bcrypt.compare(body.password, user.password)
    if (!checkUser) {
      ctx.body = new Fail({
        code: 404,
        error_code: user !== null ? 1101 : 1102,
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
        user_name: user.user_name,
        nick_name: user.nick_name,
        email: user.email || null,
        register_time: user.register_time,
        token
      }
    })
  }

  /**
   * 注册
   * @param {string} body.user_name: 用户名
   * @param {string} body.nick_name: 昵称
   * @param {string} body.password: 密码
   * @param {string} body.email: 邮箱
   * @param {string} body.code: 验证码
   * @param {string} body.sid: 客户端uuid
   */
  async register (ctx) {
    const { body } = ctx.request

    const checkResult = await checkCode(body.sid, body.code)
    if (!checkResult) {
      ctx.body = new Fail({
        code: 401,
        msg: '验证码错误,请重试'
      })
      return
    }

    // 删除验证码
    delValue(body.sid)
    let check = true
    // 检查不通过的项出现问题和提示语
    const failItem = []
    const errorTips = {}
    let errorCode = null
    // 检查用户名是否已经注册
    const userFromUserName = await User.findOne({ user_name: body.user_name })
    if (userFromUserName !== null && typeof userFromUserName.user_name !== 'undefined') {
      failItem.push('user_name')
      errorTips.user_name = '用户名已存在'
      errorCode = 1201
      check = false
    }
    // 检查邮箱是否已注册
    const userFromEmail = await User.findOne({ email: body.email })
    if (userFromEmail !== null && typeof userFromEmail.email !== 'undefined') {
      failItem.push('email')
      errorTips.email = '邮箱已被注册,请更换或找回密码'
      errorCode = 1202
      check = false
    }

    // 检查通过
    if (check) {
      body.password = await bcrypt.hash(body.password, 5)
      const newUser = new User({
        user_name: body.user_name,
        nick_name: body.nick_name,
        email: body.email,
        password: body.password,
        register_time: moment().format('YYYY-MM-DD HH:mm:ss')
      })
      await newUser.save()
      ctx.body = new Success({
        code: 200,
        msg: '注册成功'
      })
    } else {
      ctx.body = new Fail({
        code: 500,
        error_code: errorCode,
        data: {
          failItem,
          errorTips
        },
        msg: '注册失败,请检查'
      })
    }
  }

  /** 找回密码
   * @param {string} body.type: 查找方式类型： 'phone'：通过手机号查找、'email'：通过邮箱查找
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
