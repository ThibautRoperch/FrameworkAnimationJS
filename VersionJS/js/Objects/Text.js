/**
 * 
 */

class Text extends AnimatedObject {
	
	constructor(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, text, font, border, width, height) {
        super(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, horizontalalignment, verticalalignment);
		this.text = text;
		this.font = font; // FontName, FontSize, FontWeight
		this.border = border;
		this.width = width;
		this.height = height;
		this.horizontalalignment = horizontalalignment; 
		this.verticalalignment = verticalalignment;
	}

	getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
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

	getHorizontalalignment() {
		return this.horizontalalignment;
	}

	getVerticalalignment() {
		return this.verticalalignment;
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

	setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
	}
	

	getHorizontalalignment(horizontalalignment) {
		this.horizontalalignment = horizontalalignment;
	}

	getVerticalalignment(verticalalignment) {
		this.verticalalignment = verticalalignment;
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
		// text alignment
		textAlign(this.horizontalalignment == "right" ? RIGHT : this.horizontalalignment == "center" ? CENTER : LEFT,
		this.verticalalignment == "center" ? CENTER : this.verticalalignment == "bottom" ? BOTTOM : this.verticalalignment == "baseline" ? BASELINE : TOP);
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
