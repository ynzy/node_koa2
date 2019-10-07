// 机制,监听任何异常
function f1() {
  f2()
}
async function f2() {
  try {
    await f3()
  } catch (error) {
    console.log('error');

  }
}
function f3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('err')
    })
  })
  /* return await setTimeout(() => {
    throw new Error('err')
  }); */
}
f1()
/**
 * 告诉用户,或自己排查错误时,需要判断异常,查找错误
 * 1. 无异常,正确返回结果
 * 2. 发生了异常
 */
/**
 * 函数设计
 * 判断出异常
 * 1. return false/null 会丢失异常信息
 * 2. throw new Error
 * 3. 全局异常处理
 */
// 《代码大全2》
/**
 * 异步异常处理
 * 将函数变成promise
 * 如果某一个函数返回的是promise
 * 使用async/await简化函数调用链条
 * 如果函数调用链中返回promise,调用链中其他函数都使用async/await调用函数
 */