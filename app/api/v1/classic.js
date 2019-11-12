const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})

const { PositiveIntergerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { AuthType } = require('../../lib/enums')
router.get('/latest', new Auth(AuthType.LATEST).m, async (ctx, next) => {
  /**
   * 1.权限是一个很难很复杂的问题
   * 目前的auth中间件只是实现了一种限制
   * 2.权限分级 scope
   * 普通用户 管理员
   *   8        16
   * 如果普通用户携带的权限数字是8,如果把/latest api的权限数字设置为9,
   * 普通用户权限8是小于api权限9的,所以用户无法访问此api
   * 但是管理员用户的权限数字是16,大于9,所以管理员可以访问此api
   */
  ctx.body = ctx.auth.uid
})
//#region 
/* router.post('/latest', async (ctx, next) => {
  // User
  // 2部分 通用型 针对小程序
  // 账号 密码 附属信息:昵称,email,手机
  // 注册 登录
  // Sequelize 连接数据库 配置一些数据库参数
  const params = ctx.params
  const query = ctx.query
  const headers = ctx.header
  const body = ctx.request.body
  console.log(ctx.params);

  const v = await new PositiveIntergerValidator().validate(ctx)
  // 使用验证器获取参数
  //获取值并进行类型转换 get方法使用的是loadsh的get方法,如果想获取原数据,第二个参数设置为false
  // const id = v.get('path.id', false)
  // console.log(id);
  ctx.body = {
    key: 'classic'
  }
}) */
//#endregion 


module.exports = router