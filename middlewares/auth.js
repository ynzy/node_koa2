/**
 * 权限控制检测 
 * 中间件
 */
const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
  constructor(level) {
    // 定义权限
    this.level = level || 1
    //note: 定义权限类常量
    Auth.USER = 8; // 用户
    Auth.ADMIN = 16 // admin
    Auth.SUPER_ADMIN = 32 // 超级admin
  }
  get m() {
    return async (ctx, next) => {
      /**
       * token 检测
       * 1. token获取 body header
       * HTTP 规定 身份验证机制 HttpBasicAuth
       * 2. 判断token合法性
       */
      // console.log(ctx);
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbbiden(errMsg)
      }
      try {
        // 校验令牌,用户传过来的token, 全局配置文件中的令牌key
        //note: decode是jwt令牌返回的信息,里面有自定义的变量,例如uid
        var decode = jwt.verify(userToken.name,
          global.config.security.secretKey)
      } catch (error) {
        /**
         * 明确提示用户到底哪种情况不合法
         * token不合法
         * token过期
         */
        if (error.name == 'TokenExpiredError') {
          //! 过期
          errMsg = 'token已过期'
        }
        //! 不合法
        throw new global.errs.Forbbiden(errMsg)
      }
      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new global.errs.Forbbiden(errMsg)
      }
      // uid,scope
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }

  /**
   * 验证令牌是否有效
   *
   * @static
   * @param {*} token
   * @memberof Auth
   */
  static verifyToken(token) {
    try {
      jwt.verify(token,
        global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  Auth
}