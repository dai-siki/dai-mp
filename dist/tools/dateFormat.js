/**
 * 格式化时间
 *
 * 示例：
 * new Date(2012,1,1,10,9).format('yyyy-MM-dd hh:mm:ss)
 * out: 2012-01-01 10:09:00
 */
export  default function(dateObj, yyyyMMdd) {
	var month = dateObj.getMonth() + 1,
		date = dateObj.getDate(),
		hours = dateObj.getHours(),
		min = dateObj.getMinutes(),
		sec = dateObj.getSeconds();
	return yyyyMMdd.replace(/yyyy/g, dateObj.getFullYear())
		.replace(/yy/g, String(dateObj.getFullYear()).substr(2, 2))
		.replace(/MM/g, month >= 10 ? month : '0' + month)
		.replace(/M\*/g, month)
		.replace(/dd/g, date >= 10 ? date : '0' + date)
		.replace(/d\*/g, date)
		.replace(/hh/g, hours >= 10 ? hours : '0' + hours)
		.replace(/h\*/g, hours)
		.replace(/m\*/g, min)
		.replace(/mm/g, min >= 10 ? min : '0' + min)
		.replace(/ss/g, sec >= 10 ? sec : '0' + sec)
		.replace(/s\*/g, sec);
}
