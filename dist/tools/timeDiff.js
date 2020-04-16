/**
 * 毫秒数转为时间差数组
 *
 * 示例：
 * ('3601000') => {d:0, h:1, i:0, s:1}
 */
export  default function (diffS) {
	//计算出相差天数
	let days = Math.floor(diffS / (24 * 3600 * 1000)),
		leave1 = diffS % (24 * 3600 * 1000),   //计算天数后剩余的毫秒数
		hours = Math.floor(leave1 / (3600 * 1000)), //计算出小时数
		leave2 = leave1 % (3600 * 1000),    //计算小时数后剩余的毫秒数
		minutes = Math.floor(leave2 / (60 * 1000)), //计算相差分钟数
		leave3 = leave2 % (60 * 1000),   //计算分钟数后剩余的毫秒数
		seconds = Math.ceil(leave3 / 1000); //计算相差秒数
	return {
		d: days,
		h: hours,
		i: minutes,
		s: seconds
	};
}
