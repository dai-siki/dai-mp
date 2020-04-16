/**
 * money 千分符格式化
 *
 * @param number 必须是数字 如 123456.89233
 * @returns {*} 如 123,456.89
 */
export default (number) => {
	if (typeof number == 'undefined' || isNaN(number)) return '--';
	number = (Math.round(number * 100) / 100).toString();
	var resultArray = [],
		pointPosi = number.indexOf('.'), // 取得小数点的位置
		int = pointPosi == -1 ? number : number.substring(0, pointPosi), // 取得小数中的整数部分
		float = pointPosi == -1 ? '00' : number.substring(pointPosi + 1, pointPosi + 3),
		remainSum = int.length % 3; // 超过 3 的位数
	if (int.length <= 3) {
		resultArray = [int];
	} else if (remainSum == 0) {
		resultArray = resultArray.concat(int.match(/\d{3}/g));
	} else {
		resultArray.push(int.substring(0, remainSum));
		int = int.substring(remainSum);
		resultArray = resultArray.concat(int.match(/\d{3}/g));
	}
	return resultArray.join(',') + '.' + (float + '00').substr(0, 2);
};
