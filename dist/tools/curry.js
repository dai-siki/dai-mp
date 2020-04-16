/*---------------------------------------------------------------
 |                           小工具                           |
 ---------------------------------------------------------------*/

/**
 * 函数柯里化
 *
 * @example
 *
 * var abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * var curried = curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 */
export function curryN (fn, n = null) {
	const needLen = typeof n === 'number' ? n : fn.length;

	function warp (...arg) {
		let argLen = arg.length;

		if(needLen - argLen <= n){
			return fn(...arg);
		} else {
			return (...newArg) => warp(...arg, ...newArg);
		}
	}

	return warp;
}

export function curry (fn) {
	return curryN(fn);
}

/**
 * 合并多个函数为一个，函数参数仅限1个
 *
 * @type signature
 * (a->b) -> (b->c) -> (a->c)
 */
export function compose (...fns){
	const filterFns = fns.filter(item => typeof item == 'function');
	return x => filterFns.reduceRight((acc, fn) => fn(acc), x);
}

/**
 * 数组 map 柯里化
 *
 * @type signature
 * (a->b) -> [a] -> [b]
 */
export const map = curry((fn, arr) => arr.map(fn));


export default curry;
