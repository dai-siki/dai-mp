import $ from 'jquery';

/*   对象辅助函数
 ---------------------------------------------------------------*/

/**
 * 扩展对象或数组，返回新的对象(深层次克隆)
 */
export function objExtend(...obj) {
	return $.extend(true, {}, ...obj);
}

/**
 * 对象坍塌，返回新的对象，不会改变原有对象
 * 示例：
 * ({a:{name:'a', val:1}, b:{name:'b', val:2}}, 'val') => {a:1, b:2}
 */
export function objCollapse(obj, subKey = 'value') {
	obj = objExtend(obj);
	for (let key in obj) {
		let item = obj[key];
		if (typeof item == 'object' && typeof item[subKey] != undefined) {
			obj[key] = item[subKey];
		}
	}
	return obj;
}

/**
 * 对象中是否有某个值
 */
export function objHasValue(obj, v) {
	return Object.values(obj).some(function (item) {
		return v == item;
	});
}
/**
 * 对象中是否有某个键
 */
export function objHasKey(obj, key) {
	return Object.keys(obj).some(function (item) {
		return key == item;
	});
}
