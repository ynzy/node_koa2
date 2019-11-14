import { Model, Sequelize } from "sequelize/types";

const { sequelize } = require('../../core/db') //sequelize实例

// movie、Sentence、muisc

/**
 * 期刊模型
 * 定义表名,描述相应的实体
 * movie、Sentence、muisc合成称为classic
 * movie、Sentence、muisc、book合成称为art
 * 
 * 共同字段/属性
 * image,title,pubdate,content,fav_nums,type(代号)
 * 不同: music: url
 * 
 * 因为有共同字段/属性,先定义一个基类,让其他类继承这个基类
 */

 // 通用字段
 const classicFields = {
   image: {
     type: Sequelize.STRING
   },
   content: Sequelize.STRING,
   pubdate: Sequelize.DATEONLY,
   fav_nums: {
     type: Sequelize.INTEGER,
     defaultValue: 0
   },
   title: Sequelize.STRING,
   type: Sequelize.TINYINT
 }


 class Movie extends Model {

 }
 Movie.init(classicFields,{
   sequelize,
   tableName: 'movie'
 })

 class Sentence extends Model {

}
Sentence.init(classicFields,{
  sequelize,
  tableName: 'sentence'
})

class Music extends Model {

}

const musicFields = Object.assign({
  url: Sequelize.STRING
},classicFields)

Music.init(musicFields,{
  sequelize,
  tableName: 'sentence'
})