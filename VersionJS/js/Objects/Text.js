class Text extends Object {
	constructor(id, x, y, text, font, red, green, blue, state, border, transparency, layer) {
		super(id, x, y, red, green, blue, state, layer);
		this.text = text;
		this.font = font;
		this.border = border;
		this.transparency = transparency;
	}

	getText() {
		return this.text;
	}

	getFont() {
		return this.font;
	}

	getBorder() {
		return this.border;
	}

	getTransparency() {
		return this.transparency;
	}

	setText(text) {
		this.text = text;
	}

	setFont(font) {
		this.font = font;
	}

	setBorder(border) {
		this.border = border;
	}

	setTransparency(transparency) {
		this.transparency = transparency;
	}
}