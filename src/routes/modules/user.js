const Router = require('koa-router')
const router = new Router()
const userController = require('../../api/User-Controller')
router.prefix('/api/user')

// 验证用户名
router.get('/checkUserName', userController.checkUserName)

module.exports = router
