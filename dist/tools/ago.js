/**
 * 过去了多久 天时分秒 依次排开
 *
 * timestamp => Object
 */
export default (targetTsp) => {
	const nowTsp = new Date().getTime();
	//计算出相差秒
	const diffS = parseInt(Math.abs(nowTsp - targetTsp) / 1000);
	//计算出相差天数
	const days = Math.floor(diffS / (24 * 3600)),
		leave1 = diffS % (24 * 3600), //计算天数后剩余的秒数
		hours = Math.floor(leave1 / (3600)), //计算出小时数
		leave2 = leave1 % 3600, //计算小时数后剩余的秒数
		minutes = Math.floor(leave2 / 60), //计算相差分钟数
		leave3 = leave2 % 60, //计算分钟数后剩余的秒数
		seconds = Math.round(leave3); //计算相差秒数

	return {
		isAgo: nowTsp > targetTsp, // 是否已过去
		d: days,
		h: hours,
		i: minutes,
		s: seconds
	};
};
