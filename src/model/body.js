/* 返回数据格式 */
/* 成功 */
class Success {
  constructor (res) {
    const defaultOptions = {
      code: 200,
      error_code: null,
      msg: 'success',
      data: {}
    }
    return {
      ...defaultOptions,
      ...res
    }
  }
}

/* 失败 */
class Fail {
  constructor (res) {
    const defaultOptions = {
      code: 500,
      error_code: 1000,
      msg: 'fail',
      data: {}
    }
    return {
      ...defaultOptions,
      ...res
    }
  }
}

module.exports = {
  Success,
  Fail
}
