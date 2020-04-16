import shuffle from './shuffle';

/**
 * 获取n位随机字符串
 *
 * 示例：
 * (number: 3) => string: dz1
 */
export default function getRandomString(n = 20) {
	const srcStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let str = shuffle(srcStr);
	let len = str.length;
	if (typeof n != 'number' || n <= 0) {
		return '';
	} else if (n > len) {
		return str + getRandomString(n - len);
	} else {
		return str.substring(0, n);
	}
}
