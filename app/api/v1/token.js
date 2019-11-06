const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enums')
const { User } = require('../../models/user')
const router = new Router({
  prefix: "/v1/token" //自动配置url前缀
})

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  // 根据type类型,执行不同的登录方法
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      await emailLogin(v.get('body.account'), v.get('body.secret'))
      break;
    case LoginType.USER_MINI_PROGRAM:
      break;
    default:
      throw new global.errs.ParameterException('没有相应的处理函数')
      break;
  }
})
/**
 * email登录
 *
 * @param {*} account 账户
 * @param {*} secret 密码
 */
async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
}


module.exports = router