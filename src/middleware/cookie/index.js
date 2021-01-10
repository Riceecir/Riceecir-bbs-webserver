/* cookie 中间件 */
class Cookie {
  constructor () {
    return this.start.bind(this)
  }

  async start (ctx, next) {
    await next()
    const cookie = ctx.cookies.get('name')
    if (!cookie) {
      ctx.cookies.set('name', 'Riceecir')
    }
  }
}

module.exports = new Cookie()
