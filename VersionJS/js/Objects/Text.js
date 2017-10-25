/**
 * 
 */

class Text extends AnimatedObject {
	
	constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, text, font, color, border, width, height, halignment, valignment) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity);
		this.text = text;
		this.font = font; // FontName, FontSize, FontWeight
		this.color = color; // r, g, b
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

	getColor () {
		return this.color;
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

	setColor(color) {
		this.color = color;
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
       	rect(this.x, this.y, this.width, this.height); 
		// Remplacer les @ par \n TODO
		// Text's color, font, size and style
		fill(this.color, this.opacity * 255);
		textFont(this.font[0]);
		textSize(parseInt(this.font[1]));
		textStyle(this.font[2] == "bold" ? BOLD : this.font[2] == "italic" ? ITALIC : NORMAL);
		// Text alignment
		textAlign(this.halignment == "right" ? RIGHT : this.halignment == "center" ? CENTER : LEFT,
		this.valignment == "center" ? CENTER : this.valignment == "bottom" ? BOTTOM : this.valignment == "baseline" ? BASELINE : TOP);
		// Display
		text(this.text, this.x + 2, this.y + 4);
	}
	
	isClicked(x, y) {
		if((x >= this.x) && (x <= this.x + this.width) && (y >= this.y) && (y <= this.y + this.height))
            return true;
        return false;
	}
	
}
