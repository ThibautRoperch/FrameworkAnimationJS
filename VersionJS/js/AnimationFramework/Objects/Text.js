import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */
export class Text extends AnimatedObject {

	/**
	 * The text that will be show
	 * @type string
	 */
	text;

	/**
	 * The font caracteristic
	 * FontName, FontSize, FontWeight
	 * @type string
	 */
	font;

	/**
	 * The text color
	 * r, g, b
	 * @type string
	 */
	color;

	/**
	 * The padding in the xml
	 * top, right, bottom, left or 1 value for all
	 * @type string
	 */
	padding;

	/**
	 * Bounding rectangle's width
	 * @type number
	 */
	width;

	/**
	 * Bounding rectangle's height
	 * @type number
	 */
	height;

	/**
	 * The text horizontal alignement
	 * @type string
	 */
	halignment;

	/**
	 * The text vertical alignement
	 * @type string
	 */
	valignment;

	/**
	 * The text width + padding + Bounding rectangle width
	 * @type number
	 */
	real_width;

	/**
	 * The text height + padding + Bounding rectangle height
	 * @type number
	 */
	real_height;

	/**
	 * padding_top
	 *	@type number
	 */
	padding_top;

	/**
	 * padding_right
	 * @type number
	 */
	padding_right;

	/**
	 * padding_bottom
	 * @type number
	 */
	padding_bottom;

	/**
	 * padding_left
	 * @type number
	 */
	padding_left;

	constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, text, font, color, padding, width, height, halignment, valignment) {
		super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
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
		this.padding_top = 0;
		this.padding_right = 0;
		this.padding_bottom = 0;
		this.padding_left = 0;
		this.computeRealDimension();
		this.setPaddingValues();
	}

	getText () {
		return this.text;
	}

	setText (text) {
		this.text = text;
		this.computeRealDimension();
	}

	draw (drawing) {
		super.draw(drawing);
		drawing.push();
		// Background
		drawing.rect(this.x, this.y, this.real_width, this.real_height);
		// Text's color, font, size and style
		drawing.noStroke();
		drawing.fill(this.color[0], this.color[1], this.color[2], this.opacity * 255);
		drawing.textFont(this.font[0]);
		drawing.textSize(parseInt(this.font[1]));
		drawing.textStyle(this.font[2] == "bold" ? drawing.BOLD : this.font[2] == "italic" ? drawing.ITALIC : drawing.NORMAL);
		// Text alignment
		drawing.textAlign(
			this.halignment == "right" ? drawing.RIGHT : 
			this.halignment == "center" ? drawing.CENTER : drawing.LEFT,
			this.valignment == "center" ? drawing.CENTER : 
			this.valignment == "bottom" ? drawing.BOTTOM : this.valignment == "baseline" ? drawing.BASELINE : drawing.TOP);
		// Padding
		let x = this.x;
		let y = this.y;
		switch (this.halignment) {
			case "left":
				x += this.padding_left;
				break;
			case "right":
				x -= this.padding_right;
				break;
		}
		switch (this.valignment) {
			case "top":
				y += this.padding_top;
				break;
			case "bottom":
				y -= this.padding_bottom;
		}
		// Display
		drawing.text(this.text.replaceAll('@', '\n'), x, y, this.real_width + 20, this.real_height + 20);
		drawing.pop();
	}

	isClicked (x, y) {
		return (x >= this.x) && (x <= this.x + this.real_width) && (y >= this.y) && (y <= this.y + this.real_height);
	}

	toXml () {
		let text = document.createElement("object_text");
		text.innerHTML = this.id;
		text.setAttribute("x", this.x);
		text.setAttribute("y", this.y);
		text.setAttribute("background_color", this.background_color); // r, g, b
		text.setAttribute("background_transparent", this.background_transparent);
		text.setAttribute("border_color", this.border_color); // r, g, b
		text.setAttribute("border_transparency", this.border_transparency);
		text.setAttribute("border_size", this.border_size);
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
		text.setAttribute("halignment", this.halignment);
		text.setAttribute("valignment", this.valignment);
		return text;
	}

	clone () {
		return new Text(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.border_size, this.state, this.layer, this.visible, this.opacity, this.angle, this.text, this.font, this.color, this.padding, this.width, this.height, this.halignment, this.valignment);
	}

	computeRealDimension () {
		if (this.text != "") {
			switch (this.padding.length) {
				case 1:
					this.real_width = (this.width == undefined) ? this.text.length * (parseInt(this.font[1]) / 2 + 1) + this.padding[0] * 2 : this.width;
					this.real_height = (this.height == undefined) ? (parseInt(this.font[1]) + this.padding[0]) * ((this.text.match(/@/g) || []).length + 1) : this.height;
					break;
				case 4:
					this.real_width = (this.width == undefined) ? this.text.length * (parseInt(this.font[1]) / 2 + 1) + this.padding[1] + this.padding[3] : this.width;
					this.real_height = (this.height == undefined) ? (parseInt(this.font[1]) + this.padding[0] + this.padding[2]) * ((this.text.match(/@/g) || []).length + 1) : this.height;
					break;
				default:
					this.real_width = (this.width == undefined) ? this.text.length * (parseInt(this.font[1]) / 2 + 1) : this.width;
					this.real_height = (this.height == undefined) ? parseInt(this.font[1]) * ((this.text.match(/@/g) || []).length + 1) : this.height;
					break;
			}
		} else {
			this.real_width = this.width;
			this.real_height = this.height;
		}
	}

	setPaddingValues () {
		switch (this.padding.length) {
			case 1:
				this.padding_top = this.padding[0];
				this.padding_right = this.padding[0];
				this.padding_bottom = this.padding[0];
				this.padding_left = this.padding[0];
				break;
			case 4:
				this.padding_top = this.padding[0];
				this.padding_right = this.padding[1];
				this.padding_bottom = this.padding[2];
				this.padding_left = this.padding[3];
				break;
		}
	}

	get color () {
		return this.color;
	}

	set color (value) {
		this.color = value;
	}

	get halignment () {
		return this.halignment;
	}

	set halignment (value) {
		this.halignment = value;
	}

	get valignment () {
		return this.valignment;
	}

	set valignment (value) {
		this.valignment = value;
	}

	get padding () {
		return this.padding;
	}

	set padding (value) {
		this.padding = value;
		this.computeRealDimension();
	}

	get font () {
		return this.font;
	}

	set font (value) {
		this.font = value;
	}

	get real_height () {
		return this.real_height;
	}

	set real_height (value) {
		this.real_height = value;
	}

	get real_width () {
		return this.real_width;
	}

	set real_width (value) {
		this.real_width = value;
	}

	get height () {
		return this.height;
	}

	set height (value) {
		this.height = value;
		this.computeRealDimension();
	}

	get width () {
		return this.width;
	}

	set width (value) {
		this.width = value;
		this.computeRealDimension();
	}

	get text () {
		return this.text;
	}

	set text (value) {
		this.text = value;
		this.computeRealDimension();
	}
}
