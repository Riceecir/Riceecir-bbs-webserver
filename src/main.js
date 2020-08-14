const path = require('path')
// Koa以及Koa中间件
const Koa = require('koa')
const portfinder = require('portfinder')
const koaBody = require('koa-body')
const koaCors = require('@koa/cors')
const helmet = require('koa-helmet')
const koaStatic = require('koa-static')
const router = require('./routes/index')
const koaJson = require('koa-json')
const koaCompose = require('koa-compose')

// 自己实现的静态资源服务
// const staticMid = require('./middleware/static/index')
// cookie相关
const cookie = require('./middleware/cookie/index')

const app = new Koa()
const middleware = koaCompose([
  koaBody(),
  koaStatic(path.join(__dirname, './static')),
  koaJson({ pretty: false, param: 'pretty' }),
  koaCors(),
  helmet()
])

/* 中间件 */
app.use(cookie)
app.use(middleware)
// app.use(staticMid(path.join(__dirname, './static')))
app.use(router())

/** 开发环境下自动选择端口，从3000开始
 * 正式环境则固定3000
 */
if (process.env.NODE_ENV === 'developer') {
  portfinder.basePort = 3000
  portfinder.getPortPromise()
    .then(port => {
      app.listen(port, () => {
        console.log(`listen to http://localhost:${port}`)
      })
    })
} else if (process.env.NODE_ENV === 'production') {
  app.listen(3000, () => {
    console.log('listen to http://localhost:3000')
  })
} else {
  app.listen(3000, () => {
    console.log('listen to http://localhost:3000')
  })
}
