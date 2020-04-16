/**
 * 数字转数组
 *
 * @type signature
 * Number a -> Array [1, 2, 3… a]
 */
export default (num, noZero = true) => {
	const n = parseInt(num);

	if (isNaN(n)) return [];

	let arr = [];
	for (let i = (noZero ? 1 : 0); i <= n; i++) {
		arr.push(i);
	}
	return arr;
}
