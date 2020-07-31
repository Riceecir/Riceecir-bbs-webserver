/* 通用接口 */
const svgCaptch = require('svg-captcha')
const { Success } = require('../model/index')

class PublicController {
  constructor () {
    return this
  }

  /* 创建验证码 */
  async createCaptcha (ctx) {
    const newCaptch = svgCaptch.create({ ignoreChars: '0o1il', color: true })
    ctx.body = new Success({ data: newCaptch })
  }

  /* 找回密码 */
}

module.exports = new PublicController()
