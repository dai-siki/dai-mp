/**
 * 把style对象转换为能直接使用的字符串
 *
 * 如{display: none} => 'display:none;'
 */
export default function (styleObj) {
	let styleStr = '';
	Object.keys(styleObj).forEach((k) => {
		if (styleStr != '') {
			styleStr += ';';
		}
		styleStr += k + ':' + styleObj[k];
	});
	return styleStr;
}
