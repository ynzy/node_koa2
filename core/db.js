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
  logging: true, //显示数据库操作
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
//同步更新数据库
sequelize.sync({
  force: true
})
module.exports = {
  sequelize
}