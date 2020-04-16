// 输入同步事件
export function inputSync(event) {
	const {
		detail: {
			value
		},
		currentTarget: {
			dataset: {
				name,
				fm
			}
		}
	} = event;
	if (name) {
		const fmKey = fm ? fm : "fmData";
		let data = {};
		data[fmKey] = this.data[fmKey];
		data[fmKey][name] = value;
		if (typeof this.$beforeUpdateData === "function") {
			if (this.$beforeUpdateData(fmKey, name, value)) {
				this.setData(data);
			} else {
				return;
			}
		} else {
			this.setData(data);
		}
		if (typeof this.$afterUpdateData === "function") {
			this.$afterUpdateData();
		}
	}
}
