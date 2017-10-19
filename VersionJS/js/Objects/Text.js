class Text extends AnimatedObject {
	constructor(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, text, font, border) {
        super(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity);
		this.text = text;
		this.font = font;
		this.border = border;
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

	setText(text) {
		this.text = text;
	}

	setFont(font) {
		this.font = font;
	}

	setBorder(border) {
		this.border = border;
	}

	draw() {
		text(this.text, this.x, this.y)
	}
}
