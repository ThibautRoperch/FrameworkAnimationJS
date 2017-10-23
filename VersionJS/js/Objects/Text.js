/**
 * 
 */

class Text extends AnimatedObject {
	
	constructor(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, text, font, border) {
        super(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity);
		this.text = text;
		this.font = font; // FontName, FontSize, FontWeight
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
		super.draw();
		// Background
		// rect()
		// Text's color, font, size and style
		fill(this.fgcolor, this.opacity * 255);
		textFont(this.font[0]);
		textSize(parseInt(this.font[1]));
		textStyle(this.font[2] == "bold" ? BOLD : this.font[2] == "italic" ? ITALIC : NORMAL);
		// Display
		text(this.text, this.x, this.y);
	}

	minXposition() {
		return this.x;
	}

	minYposition() {
		return this.y - this.font[1];
	}

	maxXposition() {
		return this.x + this.text.length * this.font[1] / 2;
	}

	maxYposition() {
		return this.y + 5;
	}
	
}
