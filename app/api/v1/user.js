const bcrypt = require('bcryptjs')
const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

const router = new Router({
  prefix: "/v1/user" //自动配置url前缀
})

/**
 * 注册
 */
// router.post('/register', new RegisterValidator() async (ctx) => {
/**
 * 使用中间件的形式做校验,全局只有1个validator
 * 
 */
router.post('/register', async (ctx) => {
  /**
   * 编写路由思维路径
   * 1. 接收参数 LinValidator
   * email password1 password2 nickname
   * 2. 将参数保存数据库
   * v.get
   * sql Model
   */
  // 使用实例化方式,调用10次会实例化10次
  const v = await new RegisterValidator().validate(ctx)
  //note: 密码加密 盐
  const salt = bcrypt.genSaltSync(10)
  /**
   * 10的意思: 指的是生成盐的成本,越大,花费成本越高,密码安全性越高,一般取默认值
   * 明文,相同密码加密之后也要不同,防止彩虹攻击
   */
  const psw = bcrypt.hashSync(v.get('body.password1'), salt)
  const user = {
    email: v.get('body.email'),
    password: psw,
    nickname: v.get('body.nickname')
  }
  await User.create(user)
})

module.exports = router