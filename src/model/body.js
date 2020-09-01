/* 返回数据格式 */
/* 成功 */
class Success {
  constructor (res) {
    const defaultOptions = {
      data: {},
      code: 200,
      msg: 'success',
      error_code: null
    }
    return Object.assign(defaultOptions, res)
  }
}

/* 失败 */
class Fail {
  constructor (res) {
    const defaultOptions = {
      data: {},
      code: 500,
      msg: 'fail',
      error_code: 1000
    }
    return Object.assign(defaultOptions, res)
  }
}

module.exports = {
  Success,
  Fail
}
