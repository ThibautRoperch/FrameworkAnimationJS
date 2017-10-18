
class AnimatedObject {
	constructor(id, x, y, fgcolor, bgcolor, state, layer) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.fgcolor = fgcolor;
		this.bgcolor = bgcolor;
		this.state = state;
		this.layer = layer;
	}

	getId() {
		return this.id;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getFgcolor() {
		return this.fgcolor;
	}

	getBgcolor() {
		return this.bgcolor;
	}

	getState() {
		return this.state;
	}

	getLayer() {
		return this.layer;
	}

	setId(id) {
		this.id = id;
	}

	setX(x) {
		this.x = x;
	}

	setY(y) {
		this.y = y;
	}

	setFgcolor(fgcolor) {
		this.fgcolor = fgcolor;
	}

	setBgcolor(bgcolor) {
		this.bgcolor = bgcolor;
	}

	setState(state) {
		this.state = state;
	}

	setLayer(layer) {
		this.layer = layer;
	}
}
