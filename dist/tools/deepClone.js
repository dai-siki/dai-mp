/**
 * 深度克隆
 */
export default function(arg) {
	if (typeof arg == 'object' || typeof arg == 'array') {
		return JSON.parse(JSON.stringify(arg));
	} else {
		return arg;
	}
}
