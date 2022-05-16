import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */
export class Text extends AnimatedObject {

	/**
	 * The text that will be show
	 * @type string
	 */
	_text;
	get text () {
		return this._text;
	}
	set text (value) {
		this._text = value;
	}

	/**
	 * The font caracteristic
	 * [FontName, FontSize, FontWeight]
	 * @type [string]
	 */
	_font;
	get font () {
		return this._font;
	}
	set font (value) {
		this._font = value;
	}

	/**
	 * The text color
	 * r, g, b
	 * @type string
	 */
	_color;
	get color () {
		return this._color;
	}
	set color (value) {
		this._color = value;
	}

	/**
	 * The padding in the xml
	 * top, right, bottom, left or 1 value for all
	 * @type string
	 */
	_padding;
	get padding () {
		return this._padding;
	}
	set padding (value) {
		this._padding = value;
	}

	/**
	 * Bounding rectangle's width
	 * @type number
	 */
	_width;
	get width () {
		return this._width;
	}
	set width (value) {
		this._width = value;
	}

	/**
	 * Bounding rectangle's height
	 * @type number
	 */
	_height;
	get height () {
		return this._height;
	}
	set height (value) {
		this._height = value;
	}

	/**
	 * The text horizontal alignement
	 * @type string
	 */
	_halignment;
	get halignment () {
		return this._halignment;
	}
	set halignment (value) {
		this._halignment = value;
	}

	/**
	 * The text vertical alignement
	 * @type string
	 */
	_valignment;
	get valignment () {
		return this._valignment;
	}
	set valignment (value) {
		this._valignment = value;
	}

	/**
	 * The text width + padding + Bounding rectangle width
	 * @type number
	 */
	_real_width;
	get real_width () {
		return this._real_width;
	}
	set real_width (value) {
		this._real_width = value;
	}

	/**
	 * The text height + padding + Bounding rectangle height
	 * @type number
	 */
	_real_height;
	get real_height () {
		return this._real_height;
	}
	set real_height (value) {
		this._real_height = value;
	}

	/**
	 * padding_top
	 *	@type number
	 */
	_padding_top;
	get padding_top () {
		return this._padding_top;
	}
	set padding_top (value) {
		this._padding_top = value;
	}

	/**
	 * padding_right
	 * @type number
	 */
	_padding_right;
	get padding_right () {
		return this._padding_right;
	}
	set padding_right (value) {
		this._padding_right = value;
	}

	/**
	 * padding_bottom
	 * @type number
	 */
	_padding_bottom;
	get padding_bottom () {
		return this._padding_bottom;
	}
	set padding_bottom (value) {
		this._padding_bottom = value;
	}

	/**
	 * padding_left
	 * @type number
	 */
	_padding_left;
	get padding_left () {
		return this._padding_left;
	}
	set padding_left (value) {
		this._padding_left = value;
	}

	_round;
	get round () {
		return this._round;
	}
	set round (value) {
		this._round = value;
	}

	constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, text, font, color, padding, width, height, halignment, valignment, round) {
		super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
		this._text = text;
		this._font = font; // FontName, FontSize, FontWeight
		this._color = color; // r, g, b
		this._padding = padding;
		this._width = width;
		this._height = height;
		this._round = round.length== 4 ? round : [round[0], round[0], round[0], round[0]]; // tl, tr, bl, br
		this._halignment = halignment;
		this._valignment = valignment;
		this._real_width;
		this._real_height;
		this._padding_top = 0;
		this._padding_right = 0;
		this._padding_bottom = 0;
		this._padding_left = 0;
		this.setPaddingValues();
	}

	getText () {
		return this.text;
	}

	setText (text) {
		this.text = text;
	}

	draw (drawing) {
		super.draw(drawing);

		drawing.push();

		drawing.textFont(this._font[0]);
		drawing.textSize(parseInt(this._font[1]));
		drawing.textStyle(this._font[2] == "bold" ? drawing.BOLD : this._font[2] == "italic" ? drawing.ITALIC : drawing.NORMAL);
		// Text alignment
		drawing.textAlign(
			this._halignment == "right" ? drawing.RIGHT :
				this._halignment == "center" ? drawing.CENTER : drawing.LEFT,
			this._valignment == "center" ? drawing.CENTER :
				this._valignment == "bottom" ? drawing.BOTTOM : this._valignment == "baseline" ? drawing.BASELINE : drawing.TOP);

		// Compute real_width and real_height
		this.computeRealDimension(drawing);

		// Background
		drawing.rect(this._x, this._y, this._real_width, this._real_height, this.round[0], this.round[1], this.round[2], this.round[3]);

		// Padding
		let x = this._x;
		let y = this._y;
		switch (this._halignment) {
			case "left":
				x += this._padding_left;
				break;
			case "right":
				x -= this._padding_right;
				break;
		}
		switch (this._valignment) {
			case "top":
				y += this._padding_top;
				break;
			case "bottom":
				y -= this._padding_bottom;
		}

		// Text's color, font, size and style
		drawing.noStroke();
		drawing.fill(this._color[0], this._color[1], this._color[2], this._opacity * 255);

		// Display
		drawing.text(this._text.replaceAll('@', '\n'), x, y, this._real_width, this._real_height);
		drawing.pop();
	}

	isClicked (x, y) {
		return (x >= this._x) && (x <= this._x + this._real_width) && (y >= this._y) && (y <= this._y + this._real_height);
	}

	toXml () {
		let text = document.createElement("object_text");
		text.innerHTML = this._id;
		text.setAttribute("x", this._x);
		text.setAttribute("y", this._y);
		text.setAttribute("background_color", this._background_color); // r, g, b
		text.setAttribute("background_transparent", this._background_transparent);
		text.setAttribute("border_color", this._border_color); // r, g, b
		text.setAttribute("border_transparency", this._border_transparency);
		text.setAttribute("border_size", this._border_size);
		text.setAttribute("layer", this._layer);
		text.setAttribute("visible", this._visible);
		text.setAttribute("opacity", this._opacity);
		text.setAttribute("angle", this._angle); // degrees
		text.setAttribute("text", this._text);
		text.setAttribute("font", this._font); // FontName, FontSize, FontWeight
		text.setAttribute("color", this._color); // r, g, b
		text.setAttribute("padding", this._padding);
		if (this._width != undefined) text.setAttribute("width", this._width);
		if (this._height != undefined) text.setAttribute("height", this._height);
		text.setAttribute("halignment", this._halignment);
		text.setAttribute("valignment", this._valignment);
		text.setAttribute("round", this._round);
		return text;
	}

	clone () {
		return new Text(this._id, this._x, this._y, this._background_color, this._background_transparent, this._border_color, this._border_transparency, this._border_size, this._state, this._layer, this._visible, this._opacity, this._angle, this._text, this._font, this._color, this._padding, this._width, this._height, this._halignment, this._valignment, this._round);
	}

	computeRealDimension (drawing) {
		if (this._text != "") {
			switch (this._padding.length) {
				// Same padding for all side
				case 1:
					this._real_width = (this._width == undefined) ? drawing.textWidth(this._text) + this._padding[0] * 2 : this._width;
					this._real_height = (this._height == undefined) ? (parseInt(this._font[1]) + this._padding[0]) * ((this._text.match(/@/g) || []).length + 1) : this._height;
					break;
				// Padding different for each side
				case 4:
					this._real_width = (this._width == undefined) ? drawing.textWidth(this._text) + this._padding[1] + this._padding[3] : this._width;
					this._real_height = (this._height == undefined) ? (parseInt(this._font[1]) + this._padding[0] + this._padding[2]) * ((this._text.match(/@/g) || []).length + 1) : this._height;
					break;
				// No padding
				default:
					this._real_width = (this._width == undefined) ? drawing.textWidth(this._text) + 15 : this._width;
					this._real_height = (this._height == undefined) ? parseInt(this._font[1]) * ((this._text.match(/@/g) || []).length + 1) + 5 : this._height;
					break;
			}
		} else {
			this._real_width = this._width;
			this._real_height = this._height;
		}
	}

	setPaddingValues () {
		switch (this._padding.length) {
			case 1:
				this._padding_top = this._padding[0];
				this._padding_right = this._padding[0];
				this._padding_bottom = this._padding[0];
				this._padding_left = this._padding[0];
				break;
			case 4:
				this._padding_top = this._padding[0];
				this._padding_right = this._padding[1];
				this._padding_bottom = this._padding[2];
				this._padding_left = this._padding[3];
				break;
		}
	}
}
