const Koa = require('koa')
// const Router = require('koa-router')

const InitManger = require('./core/init')

const app = new Koa()
InitManger.initCore(app)


const port = 3000  //端口号

app.listen(port, () => {
  console.log(`程序启动,请访问http://localhost:${port}`);
})