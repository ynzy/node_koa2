const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const router = new Router({
  prefix: "/v1/token" //自动配置url前缀
})

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
})

module.exports = router