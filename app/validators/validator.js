const {
  LinValidator,
  Rule
} = require('../../core/lin-validator-v2')

const { User } = require('../models/user')
const { LoginType } = require('../lib/enums')
/**
 * 校验正整数
 * @class PositiveIntegerValidator
 * @extends {LinValidator}
 */
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isInt', '需要是正整数', {
      min: 1
    })]
  }
}
/**
 * 注册校验
 *
 * @class RegisterValidator
 * @extends {LinValidator}
 */
class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范')
    ]
    this.password1 = [
      // 用户密码指定范围,密码强度
      new Rule('isLength', '密码至少6个字符,最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码必须包含数字、大写英文字母、小写英文字母', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称至少6个字符,最多32个字符', {
        min: 2,
        max: 32
      })
    ]
  }
  // 前缀必须是validate
  validatePassword(vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同')
    }
  }
  async validateEmail(vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      throw new Error('Email已经存在')
    }
  }
}
/**
 * 登录校验
 *
 * @class TokenValidator
 * @extends {LinValidator}
 */
class TokenValidator extends LinValidator {
  constructor() {
    super()
    // 账号
    this.account = [
      new Rule('isLength', '不符合账号规则', { min: 4, max: 32 })
    ]
    // 密码
    this.secret = [
      /**
       * 是必须要传入的吗
       * web 账号+密码
       * 登录 多元化 小程序登录不需要校验密码
       * 微信打开小程序 已经验证了合法用户了
       * web account + secret
       * 小程序 account
       * 手机号登录
       * 1. 可以为空,可以不传
       * 2. 空 不为空
       */
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', { min: 6, max: 128 })
    ]
    // 验证登录方式 type JS 枚举
  }
  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type是必传参数')
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法')
    }
  }
}
/**
 * 校验token是否为空
 *
 * @class NotEmptyValidator
 * @extends {LinValidator}
 */
class NotEmptyValidator extends LinValidator{
  constructor() {
    super()
    this.token = [
      new Rule('isLength','不允许为空',{min:1})
    ]
  }
}


class LikeValidator extends PositiveIntegerValidator {
  constructor() {
      super()
      this.validateType = checkArtType
      // const checker = new Checker(ArtType)
      // this.validateType = checker.check.bind(checker)
  }
}

class ClassicValidator extends LikeValidator {

}


module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  LikeValidator,
  ClassicValidator
}