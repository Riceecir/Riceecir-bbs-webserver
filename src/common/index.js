const { getValue, getTTL } = require('../config/redis.config')
/**
 * 验证验证码
 * @param {string} sid: 客户端uuid
 * @param {code} sid: 用户输入的验证码
 *
 * @return {object} result: 验证是否通过， isExpired：是否超时
 */
const checkCode = async function (sid, code) {
  const redisCode = await getValue(sid)
  const isExpired = await getTTL(sid) < 0
  return {
    result: String(redisCode).toLocaleLowerCase() === String(code).toLocaleLowerCase(),
    isExpired
  }
}

module.exports = {
  checkCode
}
