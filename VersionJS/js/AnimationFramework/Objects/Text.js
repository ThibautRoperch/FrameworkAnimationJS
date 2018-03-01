/**
 * 
 */

class Text extends AnimatedObject {
	
	constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, state, layer, visible, opacity, angle, text, font, color, padding, width, height, halignment, valignment) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, state, layer, visible, opacity, angle);
		this.text = text;
		this.font = font; // FontName, FontSize, FontWeight
		this.color = color; // r, g, b
		this.padding = padding;
		this.width = width;
		this.height = height;
		this.halignment = halignment;
		this.valignment = valignment;

		this.real_width;
		this.real_height;
		this.computeRealDimension();
	}

	getWidth() {
        return this.real_width;
    }

    getHeight() {
        return this.real_height;
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

	getPadding() {
		return this.padding;
	}

	getHalignment() {
		return this.halignment;
	}

	getValignment() {
		return this.valignment;
	}

	setText(text) {
		this.text = text;
		this.computeRealDimension();
	}

	setFont(font) {
		this.font = font;
	}

	setColor(color) {
		this.color = color;
	}

	setPadding(padding) {
		this.padding = padding;
	}

	setWidth(width) {
        this.width = width;
		this.computeRealDimension();
    }

    setHeight(height) {
        this.height = height;
		this.computeRealDimension();
	}

	setHalignment(halignment) {
		this.halignment = halignment;
	}

	setValignment(valignment) {
		this.valignment = valignment;
	}

	computeRealDimension() {
		this.real_width = (this.width == undefined) ? this.text.length * (parseInt(this.font[1])/2 + 1) + 2 + this.padding * 2 : this.width;
		this.real_height = (this.height == undefined) ? (parseInt(this.font[1]) + 8 + this.padding) * ((this.text.match(/@/g) || []).length + 1) : this.height;
	}
	
	draw(drawing) {
		super.draw(drawing);
		// Background
		drawing.rect(this.x, this.y, this.real_width, this.real_height);
		// Text's color, font, size and style
		drawing.noStroke();
		drawing.fill(this.color[0], this.color[1], this.color[2], this.opacity * 255);
		drawing.textFont(this.font[0]);
		drawing.textSize(parseInt(this.font[1]));
		drawing.textStyle(this.font[2] == "bold" ? drawing.BOLD : this.font[2] == "italic" ? drawing.ITALIC : drawing.NORMAL);
		// Text alignment
		drawing.textAlign(this.halignment == "right" ? drawing.RIGHT : this.halignment == "center" ? drawing.CENTER : drawing.LEFT,
		this.valignment == "center" ? drawing.CENTER : this.valignment == "bottom" ? drawing.BOTTOM : this.valignment == "baseline" ? drawing.BASELINE : drawing.TOP);
		// Display
		drawing.text(this.text.replace("@", "\n"), this.x + 2 + this.padding, this.y + 4 + this.padding / 2);
	}
	
	isClicked(x, y) {
		return (x >= this.x) && (x <= this.x + this.real_width) && (y >= this.y) && (y <= this.y + this.real_height);
	}
	
	toXml() {
        var text = document.createElement("object_text");
        text.innerHTML = this.id;
        text.setAttribute("x", this.x);
        text.setAttribute("y",this.y);
        text.setAttribute("bgcolor", this.bgcolor); // r, g, b
        text.setAttribute("bgtransparent", this.bgtransparent);
        text.setAttribute("bocolor", this.bocolor); // r, g, b
        text.setAttribute("botransparent", this.botransparent);
        text.setAttribute("bosize", this.bosize);
        text.setAttribute("layer", this.layer);
        text.setAttribute("visible", this.visible);
        text.setAttribute("opacity", this.opacity);
        // text.setAttribute("angle", this.angle); // degrees
        text.setAttribute("text", this.text);
		text.setAttribute("font", this.font); // FontName, FontSize, FontWeight
		text.setAttribute("color", this.color); // r, g, b
		text.setAttribute("padding", this.padding);
		if (this.width != undefined) text.setAttribute("width", this.width);
		if (this.height != undefined) text.setAttribute("height", this.height);
		text.setAttribute("halignment",this.halignment); 
		text.setAttribute("valignment", this.valignment);
        return text;
    }

    clone() {
		return new Text(this.id, this.x, this.y, this.bgcolor, this.bgtransparent, this.bocolor, this.botransparent, this.state, this.layer, this.visible, this.opacity, this.angle, this.text, this.font, this.color, this.padding, this.width, this.height, this.halignment, this.valignment);
	}
	
}
