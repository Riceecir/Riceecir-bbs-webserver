const Router = require('koa-router')
const router = new Router()
const publicController = require('../../api/Public-Controller')
router.prefix('/api')

// 验证码
router.get('/getCaptcha', publicController.createCaptcha)

module.exports = router
