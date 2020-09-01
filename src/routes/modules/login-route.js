const Router = require('koa-router')
const router = new Router()
const loginController = require('../../api/Login-Controller')
router.prefix('/api/login')

// 找回密码：发送邮件
router.post('/sendForgetMsg', loginController.sendForgetMsg)
// 用户登录
router.post('/login', loginController.login)

module.exports = router
