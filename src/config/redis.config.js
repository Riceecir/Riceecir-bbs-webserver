const redis = require('redis')
const config = require('./index')
const bluebird = require('bluebird')
const options = {
  host: config.REDIS.HOST,
  port: config.REDIS.PORT,
  password: config.REDIS.PASSWORD,
  detect_buffers: true,
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted')
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
  }
}

const client = bluebird.promisifyAll(redis.createClient(options))
client.on('error', err => {
  console.log('redis error: ')
  console.log(err)
})

/** 存值
 * @param {string} key
 * @param {string | number | array | object} val
 * @param {number} time
 */
const setValue = function (key, val, time = undefined) {
  if (val === null || val === undefined || val === '') {
    return null
  } else if (typeof val === 'string' || typeof val === 'number') {
    if (time !== undefined) {
      return client.setAsync(key, val, 'EX', time)
    } else {
      return client.setAsync(key, val)
    }
  } else if (typeof val === 'object') {
    Object.keys(val).forEach(item => {
      client.hset(key, item, val[item], redis.print)
    })
  }
}

/** 取值
 * @param {string} key
 */
const getValue = function (key) {
  return client.getAsync(key)
}

/** 取值：hash
 * @param {string} key
 */
const getHValue = function (key) {
  return client.hgetallAsync(key)
}

/** 删除值
 * @param {string} key
 */
const delValue = function (key) {
  return client.delAsync(key)
}

/** 获取剩余时间
 * @param {string} key
 */
const getTTL = function (key) {
  return client.ttlAsync(key)
}

module.exports = {
  client,
  getValue,
  setValue,
  getHValue,
  delValue,
  getTTL
}
