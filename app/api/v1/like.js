const Router = require('koa-router')

const router = new Router({
  prefix: "/v1/like"
})

const { success } = require('../../lib/helper')
const { LikeValidator } = require('../../validators/validator')
const { Favor } = require('../../models/favor')
const { Auth } = require('../../../middlewares/auth')

router.post('/', new Auth().m, async ctx => {
  const v = await new LikeValidator().validate(ctx, {
    id: `art_id` //传入别名,验证的时候验证art_id,不是id
  })
  await Favor.like(
    v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  success()
})

module.exports = router