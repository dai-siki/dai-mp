/**
 * 字符串格式化替换
 *
 * 如：('你好，{name}', {name:'世界'}) => '你好，世界'
 */
export default (str, obj) => str.replace(/\{([a-zA-Z0-9]+)\}/g, (all, a) => obj[a]);
