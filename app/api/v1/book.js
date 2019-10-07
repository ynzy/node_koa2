const Router = require('./node_modules/koa-router')
const router = new Router()

router.get('/book/latest', (ctx, next) => {
  ctx.body = {
    key: 'book'
  }
})

module.exports = router