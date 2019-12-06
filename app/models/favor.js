const {
  Sequelize,
  Model,
  Op
} = require('sequelize')
const {
  sequelize
} = require('../../core/db')
const { Art } = require('./art')
/**
 * 点赞喜欢的模型
 */
class Favor extends Model {
  // 业务表
  /**
   * 用户点赞
   *
   * @static
   * @param {*} art_id 期刊id
   * @param {*} type 期刊类型
   * @param {*} uid 用户
   * @memberof Favor
   */
  static async like(art_id, type, uid) {
    /**
     * 1. 添加记录
     * 2. 修改classic中的fav_nums
     * 数据库事务
     * 数据库事务总能保证对数据库的多个操作
     * 要么是同时执行成功,如果有一个执行失败,那么所有的操作都会被撤销
     * 可以保证数据的一致性
     * 
     * 一个良好的数据库设计都会有这样一个特性ACID
     *  原子性
     *  数据的一致性
     *  隔离性
     *  持久性
     */
    // 使用Sequelize操作数据库事务
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if (favor) {
      throw new global.errs.LikeError()
    }
    return sequelize.transaction(async t => {
      await Favor.create({
        art_id,
        type,
        uid
      }, { transaction: t })
      const art = Art.getData(art_id, type)
      // 加1
      await art.increment('fav_nums', { by: 1, transaction: t })
    })
  }
  /**
   * 用户取消点赞
   *
   * @static
   * @param {*} art_id
   * @param {*} type
   * @param {*} uid
   * @memberof Favor
   */
  static async dislike(art_id, type, uid) {

  }
}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'favor'
})

module.exports = {
  Favor
};