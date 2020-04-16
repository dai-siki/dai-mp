/**
 * 拼接url地址
 *
 * @param href
 * @param opts
 * @returns {*}
 */
export default function (href, opts){
	if(!opts){
		return href;
	}
	let params = '',
		keys = Object.keys(opts).map(function(key){
			return encodeURIComponent(key) + '=' + encodeURIComponent(opts[key]);
		}),
		div = href.indexOf('?') != -1 ? '&' : '?';
	params = keys.join('&');
	return href + div + params;
}
