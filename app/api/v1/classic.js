const Router = require('koa-router')
const router = new Router()

const { PositiveIntergerValidator } = require('../../validators/validator')

router.post('/v1/:id/classic/latest', async (ctx, next) => {
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
  console.log(id);

})

module.exports = router