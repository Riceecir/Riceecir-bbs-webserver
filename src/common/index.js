const { getValue } = require('../config/redis.config')
/**
 * 验证验证码
 * @param {string} sid: 客户端uuid
 * @param {code} sid: 用户输入的验证码
 *
 * @return {boolean}
 */
const checkCode = async function (sid, code) {
  const redisCode = await getValue(sid)
  return String(redisCode).toLocaleLowerCase() === String(code).toLocaleLowerCase()
}

module.exports = {
  checkCode
}
