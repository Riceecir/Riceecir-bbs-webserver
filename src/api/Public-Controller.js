/* 通用接口 */
const svgCaptcha = require('svg-captcha')
const { Success } = require('../model/Body')
const { setValue } = require('../config/redis.config')

class PublicController {
  constructor () {
    return this
  }

  /* 创建验证码 */
  async createCaptcha (ctx) {
    const newCaptcha = svgCaptcha.create({ ignoreChars: '0Oo1iIlL', color: true })
    /* 存入 redis, 并设置过期时间 */
    await setValue(ctx.query.sid, newCaptcha.text.toLocaleLowerCase(), 60 * 3)
    ctx.body = new Success({ data: newCaptcha })
  }

  /* 找回密码 */
}

module.exports = new PublicController()
