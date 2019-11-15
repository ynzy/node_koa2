const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})

const { 
  PositiveIntegerValidator,
  ClassicValidator
 } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { AuthType } = require('../../lib/enums')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')

router.get('/latest', new Auth().m, async (ctx, next) => {
  /**
   * 查询最新一期期刊
   * 最新一期就是index最大的那个
   * note: 排序
   */
  const flow = await Flow.findOne({
    // 排序
    order: [
      ['index', 'DESC']
    ]
  })
  const art = await Art.getData(flow.art_id, flow.type)
  // 将index信息保存到art.dataValues中
  // art.dataValues.index = flow.index
  art.setDataValue('index', flow.index)
  ctx.body = art
  /**
   * 序列化 对象->json
   */
})

//获取点赞喜欢数量
router.get('/:type/:id/favor', new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx)
  const id = v.get('path.id')
  const type = v.get('path.type')
  const art = await Art.getData(id,type)
})

//#region 权限问题
// router.get('/latest', new Auth(AuthType.LATEST).m, async (ctx, next) => {
//   /**
//    * 1.权限是一个很难很复杂的问题
//    * 目前的auth中间件只是实现了一种限制
//    * 2.权限分级 scope
//    * 普通用户 管理员
//    *   8        16
//    * 如果普通用户携带的权限数字是8,如果把/latest api的权限数字设置为9,
//    * 普通用户权限8是小于api权限9的,所以用户无法访问此api
//    * 但是管理员用户的权限数字是16,大于9,所以管理员可以访问此api
//    */
//   ctx.body = ctx.auth.uid
// })
//#endregion 

//#region 获取路由参数
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

/**
 * 数据库设计
 * 数据库设计是粗->细的过程
 * 1. 数据库主题有哪些
 * (1)user
 * 期刊 粗
 *  * (2)movie、(3)Sentence、(4)muisc
 * 如果把这三个模型都设计到期刊数据模型中是可以的，但是扩展性是比较差的
 * 相似性： 它们都有url,pubdate,title
 * movie中有导演
 * Sentence中有演员,
 * 如果都写在一起扩展性是不好的
 *
 * 2. 如何用数据表,标识一期一期的数据
 * 创建一个新的Model/表,来记录每一期的期刊
 * flow表:
 *
 * 3. 如何设计数据库,经验多了凭的是感觉
 ** movie、Sentence、muisc 和flow有什么区别?
 * * 实体表
 * movie、Sentence、muisc是一个实体,记录本身相关信息,
 * 实体表相当于大千世界的映射
 * * 业务表
 * flow很难找到一个具体的实体来体现,这个是抽象出来的,记录业务,用来解决业务问题的
 * * 业务表难点:
 *   (1)抽象
 *   (2)多变性:业务表没有一个具体的设计方式,存在着好/坏的业务表的区别
 *      好的业务表,会让我们操作数据表的时候变得简单,数据库性能好
 *      不好的业务表,会导致查询数据表变得繁琐,数据库性能不好
 *
 */
