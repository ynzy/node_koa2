/**
 * 微信相关业务逻辑
 */
const util = require('util')
const axios = require('axios')
const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')
class WXManager {
  static async codeToToken(code) {
    /**
     * 小程序登录逻辑
     * 1. 小程序生成code发送给服务端
     * 2. 服务端拿着code请求微信服务端
     * 3. 请求成功微信服务端返回openid(唯一标识);鉴定用户是否合法
     * 小程序端没有显示的注册
     * 4. 请求微信服务
     * 微信服务传参形式
     * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
     * code 动态生成
     * appid appsecret
     * 通过微信服务url传递参数请求服务器
     */
    // 格式化url
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appid,
      global.config.wx.appsecret,
      code
    )
    // console.log(url);

    const result = await axios.get(url)
    // console.log(result.data);
    if (result.status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败')
    }
    const errcode = result.data.errcode
    const errmsg = result.data.errmsg
    if (errcode) {
      throw new global.errs.AuthFailed(
        'openid获取失败' + errmsg,
        errcode
      )
    }
    /**
     * 5. 接收微信服务返回的openid
     * 为用户建立档案 将数据写入user表,同时生成一个uid编号
     * 不建议使用openid作为uid的编号,
     * (1)openid比较长,作为主键查询效率比较低
     * (2)openid实际上是比较机密的数据,如果在小程序和服务端进行传递容易泄露
     * 6. 考虑token失效的情况
     * 如果token失效,再次登录传入code,就会再次走codeToToken的流程
     * 我们会再次拿到openid,我们需要查询数据库是否有此openid,
     * (1)如果有同样的openid则不再保存数据库
     * (2)如果没有存在则创建新的user档案
     */
    let user = await User.getUserByOpenid(result.data.openid)
    if (!user) {
      user = await User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
}
module.exports = {
  WXManager
}