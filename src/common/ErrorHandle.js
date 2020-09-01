const { Fail } = require('../model/body')

module.exports = function (ctx, next) {
  return next().catch((err) => {
    if (+err.status === 401) {
      ctx.status = 401
      ctx.body = new Fail({
        code: 401,
        msg: 'Protected resource, use Authorization header to get access\n'
      })
    } else {
      throw err
    }
  })
}
