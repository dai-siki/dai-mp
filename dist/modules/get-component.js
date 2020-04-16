// 获取组件
export const getComponent = (selector) => {
	const ctx = getCurrentPages()[getCurrentPages().length - 1];
	const componentCtx = ctx.selectComponent(selector);

	if (!componentCtx) {
		throw new Error("无法找到对应的组件，请按文档说明使用组件");
	}

	return componentCtx;
};

export default getComponent;
