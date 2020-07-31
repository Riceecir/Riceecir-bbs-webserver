const Router = require('koa-router')
const router = new Router()
const loginController = require('../../api/Login-Controller')
router.prefix('/api')

router.post('/sendForgetMsg', loginController.sendForgetMsg)

module.exports = router
