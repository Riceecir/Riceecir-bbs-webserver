const combineRoutes = require('koa-combine-routers')
const publicRoute = require('./modules/public')
const loginRoute = require('./modules/login')
const userRoute = require('./modules/user')

module.exports = combineRoutes(
  publicRoute,
  loginRoute,
  userRoute
)
