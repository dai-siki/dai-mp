/**
 * 深度克隆
 */
export default function(obj) {
	var _tmp, result;
	_tmp = JSON.stringify(obj);
	result = JSON.parse(_tmp);
	return result;
}
