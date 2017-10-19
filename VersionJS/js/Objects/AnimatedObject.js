class AnimatedObject {
	constructor(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.fgcolor = fgcolor;
		this.bgcolor = bgcolor;
		this.bgtransparent = bgtransparent;
		this.bocolor = bocolor;
		this.botransparent = botransparent;
		this.state = state;
		this.layer = layer;
		this.visible = visible;
		this.opacity = opacity;
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

	getBgtransparent() {
		return this.bgtransparent;
	}

	getBocolor() {
		return this.bocolor;
	}

	getBotransparent() {
		return this.botransparent;
	}

	getState() {
		return this.state;
	}

	getLayer() {
		return this.layer;
	}

	getVisible() {
		return this.visible;
	}

	getOpacity() {
		return this.opacity;
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
	
	setBgtransparent(bgtransparent) {
		this.bgtransparent = bgtransparent;
	}

	setBocolor(bocolor) {
		this.bocolor = bocolor;
	}

	setBotransparent(botransparent) {
		this.botransparent = botransparent;
	}

	setState(state) {
		this.state = state;
	}

	setLayer(layer) {
		this.layer = layer;
	}

	setVisible(visible) {
		this.visible = visible;
	}

	setOpacity(opacity) {
		this.opacity = opacity;
	}
	
}
