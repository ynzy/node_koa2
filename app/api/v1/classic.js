const Router = require('koa-router')
const router = new Router()

const { HttpException, ParameterException } = require('../../../core/http-exception.js')

router.post('/v1/classic/latest/:id', (ctx, next) => {
  const params = ctx.params
  const query = ctx.query
  const headers = ctx.header
  const body = ctx.request.body
  if (true) {
    const error = new global.errs.ParameterException()
    // error.requestUrl = `${ctx.method} ${ctx.path}`
    throw error
  }
  ctx.body = {
    key: 'classic'
  }
  /**
   * 监听错误
   * 输出一段有意义的提示信息
   */
})

module.exports = router