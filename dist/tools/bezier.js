// js 贝塞尔曲线函数
export default class Bezier {
	// 输入起始点和结束点的坐标
	constructor(p1x, p1y, p2x, p2y) {
		this.cx = 3.0 * p1x;
		this.bx = 3.0 * (p2x - p1x) - this.cx;
		this.ax = 1.0 - this.cx - this.bx;
		this.cy = 3.0 * p1y;
		this.by = 3.0 * (p2y - p1y) - this.cy;
		this.ay = 1.0 - this.cy - this.by;
	}
	//贝赛尔曲线t时刻的坐标点的X坐标
	curveX(t) {
		return ((this.ax * t + this.bx) * t + this.cx) * t;
	}
	//贝赛尔曲线t时刻的坐标点的y坐标
	curveY(t) {
		return ((this.ay * t + this.by) * t + this.cy) * t;
	}
}
