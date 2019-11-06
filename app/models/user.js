const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db') //sequelize实例

class User extends Model {
  /**
   * 核对用户邮箱密码
   *
   * @static
   * @param {*} email 
   * @param {*} plainPassword
   * @memberof User
   */
  static async verifyEmailPassword(email,plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if(!user) throw new global.errs.AuthFailed('用户不存在')
    // 密码验证
    const correct = bcrypt.compareSync(plainPassword,user.password)
    if(!correct) throw new global.errs.AuthFailed('密码不正确')
    return user
  }
}
User.init({
  /** 
   * 主键: 不能重复 不能为空
   * 注册: User id 设计 id编号系统 60001 60002
   * 自动增长id编号
   * id编号自己设计最好是数字,字符串,
   * 不要使用随机字符串,例如:GUID
   * 
   * 暴露了用户编号
   * 即使别人知道用户编号,也无法做坏事
   * 接口保护 权限 访问接口 Token
   */
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, // 设置主键
    autoIncrement: true, // 自动增长
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128), //限制最大范围
    unique: true, //指定唯一
  },
  password: {
    type: Sequelize.STRING,
    /**
     * note: model的属性操作
     * 设计模式  观察者模式
     * es6: Reflect Vue3.0
     */
    set(val) {
      //note: 密码加密 盐
      const salt = bcrypt.genSaltSync(10)
      /**
       * 10的意思: 指的是生成盐的成本,越大,花费成本越高,密码安全性越高,一般取默认值
       * 明文,相同密码加密之后也要不同,防止彩虹攻击
       */
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  openid: {
    type: Sequelize.STRING(64), //限制最大范围
    unique: true, //指定唯一
  },

  /**
   * 用户 --小程序 openid 不变 且唯一
   * A,B
   * 
   * 你 小程序/公众号 unionID 是唯一的
   */
}, {
  sequelize,
  tableName: 'user' // 数据迁移
})

// 数据迁移 SQL更新 风险

module.exports = {
  User
}