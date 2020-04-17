import deepClone from "../tools/deepClone.js";
import isEqual from "../tools/isEqual.js";

// 响应式
function defineReactive(data, key, val, fn) {
	let subs = data['$' + key] || [] // 新增
	Object.defineProperty(data, key, {
		configurable: true,
		enumerable: true,
		get() {
			if (data.$target) {
				subs.push(data.$target)
				data['$' + key] = subs // 新增
			}
			return deepClone(val)
		},
		set(newVal) {
			if (isEqual(newVal, val)) return
			setTimeout(() => {
				fn && fn(newVal)
			}, 0)
			if (subs.length) {
				// 用 setTimeout 因为此时 this.data 还没更新
				setTimeout(() => {
					subs.forEach(sub => sub())
				}, 0)
			}
			val = newVal
		},
	})
}

export function computed(ctx, obj) {
	let keys = Object.keys(obj)
	let dataKeys = Object.keys(ctx.data)
	dataKeys.forEach(dataKey => {
		defineReactive(ctx.data, dataKey, ctx.data[dataKey])
	})
	let firstComputedObj = keys.reduce((prev, next) => {
		ctx.data.$target = function() {
			ctx.setData({
				[next]: obj[next].call(ctx)
			})
		}
		prev[next] = obj[next].call(ctx)
		ctx.data.$target = null
		return prev
	}, {})
	ctx.setData(firstComputedObj)
}

export function watch(ctx, obj) {
	Object.keys(obj).forEach(key => {
		defineReactive(ctx.data, key, ctx.data[key], function(value) {
			obj[key].call(ctx, value)
		})
	})
}

// 初始化新增功能，传入page的this对象
export default function(ctx) {
	computed(ctx, ctx.computed || {});
	watch(ctx, ctx.watch || {});
}
