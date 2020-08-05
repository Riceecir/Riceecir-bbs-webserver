/* 返回数据格式 */
/* 成功 */
class Success {
  constructor (res) {
    return {
      code: 200,
      error_code: null,
      msg: res.msg || 'success',
      data: res.data || {}
    }
  }
}

/* 失败 */
class Fail {
  constructor (res) {
    return {
      code: 500,
      error_code: res.error_code || 1000,
      msg: res.msg || 'fail',
      data: {}
    }
  }
}

module.exports = {
  Success,
  Fail
}
