const { sequelize } = require('../../core/db') //sequelize实例

const { Sequelize, Model } = require('sequelize')

class User extends Model {

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
  email: Sequelize.STRING,
  password: Sequelize.STRING,
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