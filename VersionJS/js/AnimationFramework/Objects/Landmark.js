import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */
export class Landmark extends AnimatedObject {

	/** @type number The height in pixels */
	_height;
	get height () {
		return this._height;
	}
	set height (value) {
		this._height = value;
	}

	/** @type number The width in pixels */
	_width;
	get width () {
		return this._width;
	}
	set width (value) {
		this._width = value;
	}

	/** @type number The scaling of the X axis  */
	_scale_x;
	get scale_x () {
		return this._scale_x;
	}
	set scale_x (value) {
		this._scale_x = value;
	}

	/** @type number The scaling of the Y axis  */
	_scale_y;
	get scale_y () {
		return this._scale_y;
	}
	set scale_y (value) {
		this._scale_y = value;
	}

	/** @type String The unit of the X axis */
	_unit_x;
	get unit_x () {
		return this._unit_x;
	}
	set unit_x (value) {
		this._unit_x = value;
	}

	/** @type String The unit of the Y axis */
	_unit_y;
	get unit_y () {
		return this._unit_y;
	}
	set unit_y (value) {
		this._unit_y = value;
	}

	/** @type number The minimal value of the X axis  */
	_min_x;
	get min_x () {
		return this._min_x;
	}
	set min_x (value) {
		this._min_x = value;
	}

	/** @type number The maximal value of the X axis  */
	_max_x;
	get max_x () {
		return this._max_x;
	}
	set max_x (value) {
		this._max_x = value;
	}

	/** @type number The minimal value of the Y axis  */
	_min_y;
	get min_y () {
		return this._min_y;
	}
	set min_y (value) {
		this._min_y = value;
	}

	/** @type number The minimal value of the Y axis  */
	_max_y;
	get max_y () {
		return this._max_y;
	}
	set max_y (value) {
		this._max_y = value;
	}

	constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size,
		state, layer, visible, opacity, angle, height, width, scale_x, scale_y, unit_x, unit_y, max_x, max_y, min_x, min_y) {
		super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
		this._height = height;
		this._width = width;
		this._scale_x = scale_x;
		this._scale_y = scale_y;
		this._unit_x = unit_x;
		this._unit_y = unit_y;
		this._max_x = max_x;
		this._max_y = max_y;

		this._min_x = min_x;
		this._min_y = min_y;
	}

	draw (drawing) {
		drawing.push();
		super.draw(drawing);

		drawing.textFont("courrier");
		drawing.textSize(12);
		drawing.textStyle(drawing.NORMAL);
		drawing.angleMode(drawing.DEGREES);

		this.drawAxis(drawing);
		this.drawScale(drawing);
		this.drawAxisArrow(drawing);
		this.drawXUnit(drawing);
		this.drawYUnit(drawing);
		drawing.pop();
	}

	drawAxis (drawing) {
		if (!this._border_transparency) {
			drawing.stroke(this._border_color[0], this._border_color[1], this._border_color[2], this._opacity * 255);
		}

		// Origin x coordinate
		let px = this.getXMapping(0, drawing);

		// Origin y coordinate
		let py = this.getYMapping(0, drawing);

		drawing.push();
		drawing.translate(this._x, this._y);
		// Y axis
		drawing.line(px, 0, px, -this._height);
		// X axis
		drawing.line(0, -py, this._width, -py);

		drawing.pop();
		drawing.noStroke();
	}

	drawScale (drawing) {
		if (!this._border_transparency) {
			drawing.stroke(this._border_color[0], this._border_color[1], this._border_color[2], this._opacity * 255);
		}

		drawing.push();
		// On se déplace à l'origine du graphe
		drawing.translate(this._x, this._y);

		// Scale of X axis

		let px = this._min_x;
		// Compute the Y coordinate of the graph's origin
		let py = this.getYMapping(0, drawing);

		let maxX = this._width < 0 ? 0 : this._width;
		while (this.getXMapping(px, drawing) < maxX) {
			// Draw scale line
			drawing.line(this.getXMapping(px, drawing),
				-py - 5,
				this.getXMapping(px, drawing),
				-py + 5);

			// Draw scale text
			drawing.text(px, this.getXMapping(px, drawing), -py + 20);
			px += this._scale_x;
		}

		// Scale of Y axis

		py = this._min_y;
		// Compute the X coordinate of the graph's origin
		px = this.getXMapping(0, drawing);
		let maxY = this._height < 0 ? 0 : this._height;
		while (this.getYMapping(py, drawing) < maxY) {
			// Draw scale line
			drawing.line(
				px - 5,
				-this.getYMapping(py, drawing),
				px + 5,
				-this.getYMapping(py, drawing));

			// Draw scale text
			drawing.text(py, px - 20, -this.getYMapping(py, drawing));
			py += this._scale_y;
		}

		drawing.pop();
	}

	drawAxisArrow (drawing) {
		drawing.push();
		drawing.translate(this._x, this._y);

		if (!this._background_transparent)
			drawing.fill(this._background_color[0], this._background_color[1], this._background_color[2], this._opacity * 255);
		else
			drawing.noFill();

		let px = this.getXMapping(0, drawing);
		let py = this.getYMapping(0, drawing);

		// Y axis
		if (this._height < 0) {
			drawing.triangle(px - 3, 0, px + 3, 0, px, - 3);
		} else {
			drawing.triangle(px - 3, -this._height, px + 3, -this._height, px, -this._height - 3);
		}

		// X axis
		if (this._width < 0) {
			drawing.triangle(0, -py + 3, 0, -py - 3, 3, -py);
		} else {
			drawing.triangle(this._width, -py + 3, this._width, -py - 3, this._width + 3, -py);
		}
		drawing.pop();
	}

	drawXUnit (drawing) {
		drawing.push();
		drawing.translate(this._x, this._y);
		drawing.fill(this._background_color[0], this._background_color[1], this._background_color[2], this._opacity * 255);

		let py;
		if (this._height < 0) {
			py = drawing.map(0, this._min_y, this._max_y, this._height, 0, true);
		} else {
			py = drawing.map(0, this._min_y, this._max_y, 0, this._height, true);
		}

		let px;

		if (this._width < 0) {
			px = 0;
		} else {
			px = this._width;
		}

		drawing.text(this._unit_x, px, -py + 15);

		drawing.pop();
	}

	drawYUnit (drawing) {
		drawing.push();  // sert à pas faire la rotation et la translation sur tous les objets (s'arrête après pop)
		drawing.translate(this._x, this._y);

		let px = this.getXMapping(0, drawing);

		if (this._height < 0) {
			drawing.translate(px - 10, - 10);
		} else {
			drawing.translate(px - 10, -this._height - 10);
		}


		drawing.text(this._unit_y, 0, 0);

		drawing.pop();
	}

	isClicked (x, y, drawing) {
		return (x >= this._x) && (x <= this._x + this._width) && (y >= this._y) && (y <= this._y + this._height);
	}

	toXml () {
		let landmark = document.createElement("object_landmark");
		landmark.innerHTML = this._id;
		landmark.setAttribute("x", this._x);
		landmark.setAttribute("y", this._y);
		landmark.setAttribute("background_color", this._background_color); // r, g, b
		landmark.setAttribute("background_transparent", this._background_transparent);
		landmark.setAttribute("border_color", this._border_color); // r, g, b
		landmark.setAttribute("border_transparency", this._border_transparency);
		landmark.setAttribute("border_size", this._border_size);
		landmark.setAttribute("layer", this._layer);
		landmark.setAttribute("visible", this._visible);
		landmark.setAttribute("opacity", this._opacity);
		// landmark.setAttribute("angle", this.angle); // degrees
		landmark.setAttribute("width", this._width);
		landmark.setAttribute("height", this._height);
		landmark.setAttribute("scale_x", this._scale_x);
		landmark.setAttribute("scale_y", this._scale_y);
		landmark.setAttribute("unit_x", this._unit_x);
		landmark.setAttribute("unit_y", this._unit_y);
		landmark.setAttribute("min_x", this._min_x);
		landmark.setAttribute("min_y", this._min_y);
		landmark.setAttribute("max_x", this._max_x);
		landmark.setAttribute("max_y", this._max_y);
		return landmark;
	}

	/**
	 * Transform graph's X coordinate in pixels width
	 * @param {number} x 
	 * @param {p5} The p5 instance
	 * @returns number
	 */
	getXMapping (x, drawing) {
		if (this._width < 0) {
			return drawing.map(x, this._min_x, this._max_x, this._width, 0, true);
		}
		return drawing.map(x, this._min_x, this._max_x, 0, this._width, true);
	}

	/**
	 * Transform graph's Y coordinate in pixels height
	 * @param {number} y 
	 * @param {p5} The p5 instance
	 * @returns number
	 */
	getYMapping (y, drawing) {
		if (this._height < 0) {
			return drawing.map(y, this._min_y, this._max_y, this._height, 0);
		}
		return drawing.map(y, this._min_y, this._max_y, 0, this._height);
	}

	clone () {
		return new Landmark(this._id, this._x, this._y, this._background_color, this._background_transparent, this._border_color, this._border_transparency, this._state, this._layer, this._visible, this._opacity, this._angle, this._width, this._height, this._scale_x, this._scale_y, this._unit_x, this._unit_y);
	}
}
