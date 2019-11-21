const Router = require('koa-router')
const {
  TokenValidator,
  NotEmptyValidator
} = require('../../validators/validator')
const { generateToken } = require('../../../core/util')
const { LoginType } = require('../../lib/enums')
const { User } = require('../../models/user')
const { Auth } = require('../../../middlewares/auth')
const { WXManager } = require('../../services/wx')
/**
 * 登录
 * session 考虑状态  无状态
 * email password
 * 2. 令牌获取 颁布令牌
 * token 无意义的随机字符串
 * jwt 可以携带数据
 */
const router = new Router({
  prefix: "/v1/token" //自动配置url前缀
})


router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  // 根据type类型,执行不同的登录方法
  // API 权限 非公开api需要token才能访问
  // token 过期/不合法 就不能访问api
  /**
   * 业务逻辑写在哪
   * 1. 在API接口编写(简单的)
   * 2. Model(对于web分层架构来说都写在Model里)
   * MVC模式 业务逻辑写在Model里
   * 业务分层
   * 简单的业务,写在Model里
   * 复杂的业务,在Model上面在加一层Service
   * Thinkphp Model Service Logic
   * java Model DTO
   */

  let token;
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      //用户
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break;
    case LoginType.USER_MINI_PROGRAM:
      //小程序
      token = await WXManager.codeToToken(v.get('body.account'))
      break;
    case LoginType.ADMIN_EMAIL:
      // admin
      break;
    default:
      throw new global.errs.ParameterException('没有相应的处理函数')
  }
  ctx.body = { token }
})

// 验证令牌是否有效
router.post('/verify', async (ctx) => {
  // token
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    is_valid: result
  }
})

/**
 * 
 * email登录
 * 普通用户
 *
 * @param {*} account 账户
 * @param {*} secret 密码
 */
async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return token = generateToken(user.id, Auth.USER)
}


module.exports = router