/**
 * 枚举参数
 */

/**
 * 遍历判断是否是对象中的类型
 *
 * @param {*} val
 * @returns
 */
function isThisType(val) {
  for (let key in this) {
    if (this[key] === val) {
      return true
    }
  }
  return false
}

// 登录类型

const LoginType = {
  USER_MINI_PROGRAM: 100, //用户小程序
  USER_EMAIL: 101,  // 用户email
  USER_MOBILE: 102, // 用户手机号
  ADMIN_EMAIL: 200, // 管理员email
  isThisType
}

// 权限类型
const AuthType = {
  LATEST: 7, //课程列表
}

module.exports = {
  LoginType,
  AuthType
}