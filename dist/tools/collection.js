/* 集合相关操作（也就是二维数组）
 ---------------------------------------------------------------*/
'use strict';

export default {
	/**
	 * 判断是否集合
	 */
	isValid(col){
		if(Array.isArray(col) && col.length>0){
			return true;
		}else{
			return false;
		}
	},
    /*
	 * 通过id获取集合条目，取得条目
	 */
	find(arr, id, field = 'id') {
		let resData;
		if(this.isValid(arr)){
			resData = arr.find((item)=>{
				return typeof item[field] !== 'undefined' && item[field] == id;
			});
		}
		return resData;
	},

    /*
	 * 通过id获取集合数组的键值
	 */
	findIndex(arr, id, field = 'id') {
		let resData = -1;
		if(this.isValid(arr)){
			resData = arr.findIndex((item)=>{
				return typeof item[field] !== 'undefined' && item[field] == id;
			});
		}
		return resData;
	},

	/*
	 * 通过id删除某个键值
	 */
	del(arr, id, field = 'id') {
		let index = -1;
		if(this.isValid(arr)){
			index = arr.findIndex((item)=>{
				return typeof item[field] !== 'undefined' && item[field] == id;
			});
		}
		if(index !== -1){
			arr.splice(index, 1);
		}
	},

    /*
	 * 批量全部赋值
	 * 注：会修改源集合数组
	 */
	batchAssign(arr, val, field = 'id') {
		if(this.isValid(arr)){
			arr = arr.map((item)=>{
				if (typeof item[field] !== 'undefined') {
					item[field] = val;
				}
				return item;
			});
		}
		return arr;
	},

    /**
	 * 	二维对象集合转为一维集合
	 * 	例: {a:[{x:1}], b:[{x:2}]} => [{x:1}, {x:2}]
	 */
	reduceOne(obj) {
		let res = [];
		for (let k in obj) {
			if (Array.isArray(obj[k])) {
				res = res.concat(obj[k]);
			}
		}
		return res;
	},

    /**
	 * 	把集合转为一维数组
	 * 	例: [{x:1,y:99}, {x:2, y: 100}] => [99, 100]
	 */
	pluck(col, field) {
		return col.map(function(item) {
			return item[field];
		});
	},
	/**
	 * 集合按指定建分组
	 */
	groupBy(col, field){
		if(this.isValid(col)){
			let res = {};
			col.forEach((item) => {
				if(typeof item[field] !== 'undefined'){
					if(typeof res[ item[field] ] === 'undefined'){
						res[ item[field] ] = [];
					}
					res[ item[field] ].push(item);
				}
			});
			return res;
		}else{
			return {};
		}
	}
};
