/**
 * 
 */

class Text extends AnimatedObject {
	
	constructor(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, text, font, border, width, height, halignment, valignment) {
        super(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity);
		this.text = text;
		this.font = font; // FontName, FontSize, FontWeight
		this.border = border;
		this.width = width;
		this.height = height;
		this.halignment = halignment; 
		this.valignment = valignment;
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

	getHalignment() {
		return this.halignment;
	}

	getValignment() {
		return this.valignment;
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

	getHalignment(halignment) {
		this.halignment = halignment;
	}

	getValignment(valignment) {
		this.valignment = valignment;
	}

	draw() {
		super.draw();
		// Background
		// rect()
		// Remplacer @ par \n
		// Text's color, font, size and style
		fill(this.fgcolor, this.opacity * 255);
		textFont(this.font[0]);
		textSize(parseInt(this.font[1]));
		textStyle(this.font[2] == "bold" ? BOLD : this.font[2] == "italic" ? ITALIC : NORMAL);
		// Text alignment
		textAlign(this.halignment == "right" ? RIGHT : this.halignment == "center" ? CENTER : LEFT,
		this.valignment == "center" ? CENTER : this.valignment == "bottom" ? BOTTOM : this.valignment == "baseline" ? BASELINE : TOP);
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
