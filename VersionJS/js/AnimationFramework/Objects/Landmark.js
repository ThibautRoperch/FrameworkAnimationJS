import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */
export class Landmark extends AnimatedObject {

	/** @type number The height in pixels */
	height;

	/** @type number The width in pixels */
	width;

	/** @type number The scaling of the X axis  */
	scale_x;

	/** @type number The scaling of the Y axis  */
	scale_y;

	/** @type String The unit of the X axis */
	unit_x;

	/** @type String The unit of the Y axis */
	unit_y;

	/** @type number The minimal value of the X axis  */
	min_X;

	/** @type number The maximal value of the X axis  */
	max_X;

	/** @type number The minimal value of the Y axis  */
	min_Y;

	/** @type number The minimal value of the Y axis  */
	max_Y;

	constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size,
		state, layer, visible, opacity, angle, height, width, scale_x, scale_y, unit_x, unit_y, max_X, max_Y, min_X, min_Y) {
		super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
		this.height = height;
		this.width = width;
		this.scale_x = scale_x;
		this.scale_y = scale_y;
		this.unit_x = unit_x;
		this.unit_y = unit_y;
		this.max_X = max_X;
		this.max_Y = max_Y;

		this.min_X = min_X;
		this.min_Y = min_Y;
	}

	draw (drawing) {
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
	}

	drawAxis (drawing) {
		if (!this.border_transparency) {
			drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
		}

		// Origin x coordinate
		let px = this.getXMapping(0, drawing);

		// Origin y coordinate
		let py = this.getYMapping(0, drawing);

		drawing.push();
		drawing.translate(this.x, this.y);
		// Y axis
		drawing.line(px, 0, px, -this.height);
		// X axis
		drawing.line(0, -py, this.width, -py);

		drawing.pop();
		drawing.noStroke();
	}

	drawScale (drawing) {
		if (!this.border_transparency) {
			drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
		}

		drawing.push();
		// On se déplace à l'origine du graphe
		drawing.translate(this.x, this.y);

		// Scale of X axis

		let px = this.min_X;
		// Compute the Y coordinate of the graph's origin
		let py = this.getYMapping(0, drawing);

		let maxX = this.width < 0 ? 0 : this.width;
		while (this.getXMapping(px, drawing) < maxX) {
			// Draw scale line
			drawing.line(this.getXMapping(px, drawing),
				-py - 5,
				this.getXMapping(px, drawing),
				-py + 5);

			// Draw scale text
			drawing.text(px, this.getXMapping(px, drawing), -py + 15);
			px += this.scale_x;
		}

		// Scale of Y axis

		py = this.min_Y;
		// Compute the X coordinate of the graph's origin
		px = this.getXMapping(0, drawing);
		let maxY = this.height < 0 ? 0 : this.height;
		while (this.getYMapping(py, drawing) < maxY) {
			// Draw scale line
			drawing.line(
				px - 5,
				-this.getYMapping(py, drawing),
				px + 5,
				-this.getYMapping(py, drawing));

			// Draw scale text
			drawing.text(py, px - 15, -this.getYMapping(py, drawing));
			py += this.scale_y;
		}

		drawing.pop();
	}

	drawAxisArrow (drawing) {
		drawing.push();
		drawing.translate(this.x, this.y);

		if (!this.background_transparent)
			drawing.fill(this.background_color[0], this.background_color[1], this.background_color[2], this.opacity * 255);
		else
			drawing.noFill();

		let px = this.getXMapping(0, drawing);
		let py = this.getYMapping(0, drawing);

		// Y axis
		if (this.height < 0) {
			drawing.triangle(px - 3, 0, px + 3, 0, px, - 3);
		} else {
			drawing.triangle(px - 3, -this.height, px + 3, -this.height, px, -this.height - 3);
		}

		// X axis
		if (this.width < 0) {
			drawing.triangle(0, -py + 3, 0, -py - 3, 3, -py);
		} else {
			drawing.triangle(this.width, -py + 3, this.width, -py - 3, this.width + 3, -py);
		}
		drawing.pop();
	}

	drawXUnit (drawing) {
		drawing.push();
		drawing.translate(this.x, this.y);

		let py;
		if (this.height < 0) {
			py = drawing.map(0, this.min_Y, this.max_Y, this.height, 0, true);
		} else {
			py = drawing.map(0, this.min_Y, this.max_Y, 0, this.height, true);
		}

		let px;

		if (this.width < 0) {
			px = 0;
		} else {
			px = this.width;
		}

		drawing.text(this.unit_x, px, -py + 15);

		drawing.pop();
	}

	drawYUnit (drawing) {
		drawing.push();  // sert à pas faire la rotation et la translation sur tous les objets (s'arrête après pop)
		drawing.translate(this.x, this.y);

		let px = this.getXMapping(0, drawing);

		if (this.height < 0) {
			drawing.translate(px - 10, - 10);
		} else {
			drawing.translate(px - 10, -this.height - 10);
		}


		drawing.text(this.unit_y, 0, 0);

		drawing.pop();
	}

	isClicked (x, y) {
		return (x >= this.x) && (x <= this.x + this.width) && (y >= this.y) && (y <= this.y + this.height);
	}

	toXml () {
		let landmark = document.createElement("object_landmark");
		landmark.innerHTML = this.id;
		landmark.setAttribute("x", this.x);
		landmark.setAttribute("y", this.y);
		landmark.setAttribute("background_color", this.background_color); // r, g, b
		landmark.setAttribute("background_transparent", this.background_transparent);
		landmark.setAttribute("border_color", this.border_color); // r, g, b
		landmark.setAttribute("border_transparency", this.border_transparency);
		landmark.setAttribute("border_size", this.border_size);
		landmark.setAttribute("layer", this.layer);
		landmark.setAttribute("visible", this.visible);
		landmark.setAttribute("opacity", this.opacity);
		// landmark.setAttribute("angle", this.angle); // degrees
		landmark.setAttribute("width", this.width);
		landmark.setAttribute("height", this.height);
		landmark.setAttribute("scale_x", this.scale_x);
		landmark.setAttribute("scale_y", this.scale_y);
		landmark.setAttribute("unit_x", this.unit_x);
		landmark.setAttribute("unit_y", this.unit_y);
		landmark.setAttribute("min_X", this.min_X);
		landmark.setAttribute("min_Y", this.min_Y);
		landmark.setAttribute("max_X", this.max_X);
		landmark.setAttribute("max_Y", this.max_Y);
		return landmark;
	}

	/**
	 * Transform graph's X coordinate in pixels width
	 * @param {number} x 
	 * @param {p5} The p5 instance
	 * @returns number
	 */
	getXMapping (x, drawing) {
		if (this.width < 0) {
			return drawing.map(x, this.min_X, this.max_X, this.width, 0, true);
		}
		return drawing.map(x, this.min_X, this.max_X, 0, this.width, true);
	}

	/**
	 * Transform graph's Y coordinate in pixels height
	 * @param {number} y 
	 * @param {p5} The p5 instance
	 * @returns number
	 */
	getYMapping (y, drawing) {
		if (this.height < 0) {
			return drawing.map(y, this.min_Y, this.max_Y, this.height, 0);
		}
		return drawing.map(y, this.min_Y, this.max_Y, 0, this.height);
	}

	clone () {
		return new Landmark(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.state, this.layer, this.visible, this.opacity, this.angle, this.width, this.height, this.scale_x, this.scale_y, this.unit_x, this.unit_y);
	}

	get height () {
		return this.height;
	}

	set height (value) {
		this.height = value;
	}

	get width () {
		return this.width;
	}

	set width (value) {
		this.width = value;
	}

	get scale_x () {
		return this.scale_x;
	}

	set scale_x (value) {
		this.scale_x = value;
	}

	get scale_y () {
		return this.scale_y;
	}

	set scale_y (value) {
		this.scale_y = value;
	}

	get unit_x () {
		return this.unit_x;
	}

	set unit_x (value) {
		this.unit_x = value;
	}

	get max_Y () {
		return this.max_Y;
	}

	set max_Y (value) {
		this.max_Y = value;
	}

	get unit_y () {
		return this.unit_y;
	}

	set unit_y (value) {
		this.unit_y = value;
	}

	get min_X () {
		return this.min_X;
	}
	set min_X (value) {
		this.min_X = value;
	}

	get max_X () {
		return this.max_X;
	}

	set max_X (value) {
		this.max_X = value;
	}

	get min_Y () {
		return this.min_Y;
	}

	set min_Y (value) {
		this.min_Y = value;
	}
}
