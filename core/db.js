const Sequelize = require('sequelize')
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config.js').database
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  //note: 显示数据库操作
  logging: true,
  timezone: '+08:00', //时区,不设置会与北京相差8小时
  define: {
    // create_time update_time delete_time
    timestamps: true, //创建删除更新时间
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    freezeTableName: true
  }
})
//note:同步模型到数据库
//sync方法如果配置{force: true}时，判断数据库是否有该表，如果有则会删除表，再重建。
sequelize.sync({
  force: false
})
module.exports = {
  sequelize
}