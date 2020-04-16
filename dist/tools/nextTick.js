/**
 * 下一次循环
 *
 * 注：返回Promise对象，结合await修饰符使用更佳
 *
 * Number -> Promise
 */
export default (cd = 0) => new Promise( reslove => setTimeout(reslove, cd) );
