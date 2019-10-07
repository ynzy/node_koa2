const requireDirectory = require('require-directory')
const Router = require('koa-router')


class InitManager {
  static initCore(app) {
    // 入口方法
    // InitManager.initLoadRouters(app)
    InitManager.app = app
    InitManager.initLoadRouters()
  }
  // 初始化路由
  static initLoadRouters() {
    // 导入路径的所有模块
    const apiDir = `${process.cwd()}/app/api`;
    requireDirectory(module, apiDir, { visit: whenLoadModule })
    // 每当导入一个模块就会执行这个函数
    function whenLoadModule(obj) {
      // 判断自动加载的模块是否为路由类型
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }
}

module.exports = InitManager
