/**
 * 数字过渡
 */
import nextTick from './nextTick';

export default (startValue, endValue, callbackFn, duration = 500) => {
	const fromValue = parseFloat(startValue);
	const toValue = parseFloat(endValue);
	if (fromValue == toValue) {
		return callbackFn(toValue);
	}
	const frequency = 20; // 变化频次
	let times = 1;
	async function anime() {
		await nextTick(duration / frequency);
		if (times < frequency) {
			const currValue = fromValue + (toValue - fromValue) * times / frequency;
			callbackFn(currValue);
			times += 1;
			anime();
		} else {
			callbackFn(toValue);
		}
	}
	anime();
};
