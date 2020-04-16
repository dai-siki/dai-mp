/**
 * 随机打乱字符串
 *
 * 示例：
 * abcd => dcbd
 */
export default (str) => {
	if (typeof str != 'string' && str !== '') {
		return str;
	} else {
		return str.split('').sort(() => Math.random() - 0.5).join('');
	}
};
