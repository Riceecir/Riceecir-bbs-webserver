const { Fail } = require('../model/Body')

module.exports = function (ctx, next) {
  return next().catch((err) => {
    console.log(err)
    if (+err.status === 401) {
      ctx.status = 401
      ctx.body = new Fail({
        code: 401,
        msg: 'Protected resource, use Authorization header to get access\n'
      })
    } else {
      ctx.status = err.status || 500
      ctx.body = new Fail(Object.assign({
        code: 500,
        msg: err.message
      }, process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}))
    }
  })
}
