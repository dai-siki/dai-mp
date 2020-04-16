/**
 * 格式化创建date对象
 * 示例：
 * ('2016-01-02 23:59:59') => date对象
 *
 * @param str 要创建的字符串
 * @param type 1代表有时间，2代表仅日期
 * @param dateDiv 日期分隔符
 * @param timeDiv 时间分隔符
 * @param dtDiv 时间和日期分隔符
 */
export  default function (str, type = 1, dateDiv = '-', timeDiv = ':', dtDiv = ' ') {
	str = str.trim();
	let strArr, strDate, strTime, strDateArr, strTimeArr;
	if (type == 1) {
		strArr = str.split(dtDiv);
		strDate = strArr[0];
		strTime = strArr[1];
		strDateArr = strDate.split(dateDiv);
		strTimeArr = strTime.split(timeDiv);
		strDateArr = strDateArr.map(function (item) {
			return parseInt(item);
		});
		strTimeArr = strTimeArr.map(function (item) {
			return parseInt(item);
		});
		return new Date(strDateArr[0], strDateArr[1] - 1, strDateArr[2], strTimeArr[0], strTimeArr[1], strTimeArr[2]);
	} else if (type == 2) {
		strDate = str;
		strDateArr = strDate.split(dateDiv);
		strDateArr.map(function (index, item) {
			return parseInt(item);
		});
		return new Date(strDateArr[0], strDateArr[1] - 1, strDateArr[2]);
	}
}
