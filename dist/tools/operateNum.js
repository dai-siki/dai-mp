/* 操作数量：常用于商品数量操作
 ---------------------------------------------------------------*/
export default {
	//增
	increase(curr, max, min = 1) {
		let n = parseInt(curr);
		max = parseInt(max);
		min = parseInt(min);
		if (n >= max) {
			n = max;
		} else if (n < min) {
			n = min;
		} else {
			n++;
		}
		return n;
	},
	//减
	decrease(curr, max, min = 1) {
		let n = parseInt(curr);
		max = parseInt(max);
		min = parseInt(min);
		if (n > max) {
			n = max;
		} else if (n <= min) {
			n = min;
		} else {
			n--;
		}
		return n;
	}
};
