// 从另一个对象中copy我有其key的值
export default function(obj, copyObj) {
	Object.keys(obj).forEach(k => {
		if (typeof copyObj[k] !== 'undefined') {
			obj[k] = copyObj[k];
		}
	})
	return obj;
}
