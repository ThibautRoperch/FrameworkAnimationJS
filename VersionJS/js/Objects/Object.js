class Object {
	constructor(id, x, y, red, green, blue, state, layer ){
		this.id = id;
		this.x = x;
		this.y = y;
		this.red = red;
		this.green = green;
		this.blue = blue;
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

	getRed() {
		return this.red;
	}

	getGreen() {
		return this.green;
	}

	getBlue() {
		return this.blue;
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

	setRed(red) {
		this.red = red;
	}

	setGreen(green) {
		this.green = green;
	}

	setBlue(blue) {
		this.blue = blue;
	}

	setState(state) {
		this.state = state;
	}

	setLayer(layer) {
		this.layer = layer;
	}
}
