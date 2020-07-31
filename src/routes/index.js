const combineRoutes = require('koa-combine-routers')
const publicRoute = require('./modules/public-route')
const loginRoute = require('./modules/login-route')

module.exports = combineRoutes(
  publicRoute,
  loginRoute
)
