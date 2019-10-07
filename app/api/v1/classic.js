const Router = require('koa-router')
const router = new Router()

router.post('/v1/classic/latest/:id', (ctx, next) => {
  const path = ctx.params
  const query = ctx.query
  const headers = ctx.header
  const body = ctx.request.body

  ctx.body = {
    key: 'classic'
  }
})

module.exports = router