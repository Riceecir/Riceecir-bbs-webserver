/* 返回数据格式 */
class Success {
  constructor ({ data = {}, msg = 'success' } = res) {
    return {
      code: 'success',
      msg,
      data
    }
  }
}

class Fail {
  constructor ({ data = {}, msg = 'fail' } = res) {
    return {
      code: 'fail',
      msg,
      data
    }
  }
}

module.exports = {
  Success,
  Fail
}
