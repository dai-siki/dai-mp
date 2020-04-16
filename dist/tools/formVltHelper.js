'use strict';

/**
 * 表单验证
 */

export default {
	required (v) {
		return v || v === 0;
	},
	email (v) {
		return /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w([-.]\w+)*/.test(v) || !this.required(v);
	},
	//清除空格
	trim (v) {
		return v.replace(/(^\s*)|(\s*$)/g, '') || !this.required(v);
	},
	//只能数字、中文、字母、下划线组合，下划线不能在开头或结尾
	user (v) {
		return /^(?!_)(?!.*?_$)(\w|[\u4E00-\u9FA5])*$/.test(v) || !this.required(v);
	},
	//用户名或手机号
	userOrMobile (v) {
		return /^1[0-9]{10}$/.test(v) || !this.required(v);
	},
	//身份证号
	idCard (v) {
		return /^([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})$|^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx]))$/.test(v) || !this.required(v);
	},
	//身份证号
	mobile (v) {
		return /^1[34578]{1}[0-9]{9}$/.test(v) || !this.required(v);
	},
	//url地址
	url (v) {
		return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(v) || !this.required(v);
	},
	//数字
	number (v) {
		return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(v) || !this.required(v);
	},
	//整数
	digits (v) {
		return /^\d+$/.test(v) || !this.required(v);
	},
	//最小长度
	minlength (v, param) {
		return v.length >= param || !this.required(v);
	},
	//最大长度
	maxlength (v, param) {
		return v.length <= param || !this.required(v);
	},
	//范围长度
	rangelength (v, param) {
		let length = v.length;
		return (length >= param[0] && length <= param[1]) || !this.required(v);
	},
	//最小
	min (v, param) {
		return v >= param || !this.required(v);
	},
	//最大
	max (v, param) {
		return v <= param || !this.required(v);
	},
	//范围
	range (v, param) {
		return ( v >= param[0] && v <= param[1] ) || !this.required(v);
	},
	//等于
	equal (v, param) {
		return v == param || !this.required(v);
	}
};
