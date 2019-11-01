const Koa = require('koa')
const Router = require('koa-router')
const parser = require('koa-bodyparser')

const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

// require('./app/models/user')

// 实例化
const app = new Koa()
// const router = new Router()

app.use(parser())
app.use(catchError)
InitManager.initCore(app)


const port = 9000  //端口号

app.listen(port, () => {
  console.log(`程序启动,请访问http://localhost:${port}`);
})