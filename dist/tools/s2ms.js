/**
 * 秒转为分:秒格式
 *
 * 示例：
 * (68) => 01:08
 */
import timeDiff from './timeDiff';

export  default function (second) {
	const { d, h, i, s } = timeDiff(second * 1000);

	if(d > 0 || h > 0){
		return '59:59';
	} else {
		return ('0' + i).slice(-2) + ':' + ('0' + s).slice(-2);
	}
}
