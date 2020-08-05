const Router = require('koa-router')
const router = new Router()
const loginController = require('../../api/Login-Controller')
router.prefix('/api')

// 找回密码：发送邮件
router.post('/sendForgetMsg', loginController.sendForgetMsg)

module.exports = router
