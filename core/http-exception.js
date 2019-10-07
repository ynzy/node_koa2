/**
 * 自定义异常处理基类
 * @class HttpException
 * @extends {Error}
 */
class HttpException extends Error {
  constructor(msg = "服务器异常", errorCode = 10000, status = 400) {
    super()
    this.errorCode = errorCode
    this.status = status
    this.msg = msg
  }
}

/**
 * 扩展异常处理基类 400
 * @class ParameterException
 * @extends {HttpException}
 */
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 400
    this.msg = msg || "参数错误"
    this.errorCode = errorCode || 10000
  }
}

class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 404
    this.msg = msg || "资源未找到"
    this.errorCode = errorCode || 10000
  }
}

module.exports = {
  HttpException,
  ParameterException,
  NotFound
}