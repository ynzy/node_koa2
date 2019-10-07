const Router = require('koa-router')
const router = new Router()

router.get('/classic/latest', (ctx, next) => {
  ctx.body = {
    key: 'classic'
  }
})

module.exports = router