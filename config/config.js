module.exports = {
  env: "dev",
  database: {
    dbName: "isLand", // 数据库名
    host: "localhost",
    port: 3306,
    user: "root",
    password: ""
  },
  security: { // jwt秘钥
    secretKey: "qwert",  // 令牌key,一般要设置很复杂
    expiresIn: 60 * 60 * 24 * 30 // 过期时间
  },
  wx: {
    // appid: "wx0589d38e02c0b60c",
    // appsecret: "2c3d7c4bcae7ac7b4b6029b92a1c80c1",
    // loginUrl: "https://api.weixin.qq.com/sns/jscode2session"
    appid: "wx77124add68e6adcb",
    appsecret: "0621bffd050cfcbb0139c014652e0453",
    loginUrl: "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"


  }
}
