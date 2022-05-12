import { Landmark } from "./Landmark.js";
/**
 * 
 */

export class Graph extends Landmark {

	/**
	 * The function to be draw by the graph. Js Math function can be use
	 * @type string
	 */
	_algorithmic_function;

	/**
	 * Boolean to choose to draw or not the points at the scale of the axis
	 * @type bool
	 */
	_draw_point;

	constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer,
		visible, opacity, angle, height, width, scale_x, scale_y, unit_x, unit_y, algorithmic_function, max_x, max_y, draw_point, min_x, min_y) {

		super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer,
			visible, opacity, angle, height, width, scale_x, scale_y, unit_x, unit_y, max_x, max_y, min_x, min_y);

		this._algorithmic_function = algorithmic_function;
		this._draw_point = draw_point;
	}

	draw (drawing) {
		super.draw(drawing);

		drawing.push();
		// We move at the origin of graph
		drawing.translate(this._x, this._y);

		// Drawing of function
		if (!this._border_transparency)
			drawing.stroke(this._border_color[0], this._border_color[1], this._border_color[2], this._opacity * 255);
		else
			drawing.noStroke();

		drawing.noFill();
		// Stroke weight for the points
		drawing.strokeWeight(5);
		drawing.beginShape();

		// Start to calculate all points
		let x = this._min_x;
		try {
			do {

				// Compute the function
				let y = eval(this._algorithmic_function);

				// Map the graph's coordinate to pixels
				let px = this.getXMapping(x, drawing);
				let py = this.getYMapping(y, drawing);

				// Draw vertex
				drawing.curveVertex(px, -py);
				if (x === this._min_x || x >= this._max_x || x === 0) drawing.curveVertex(px, -py);

				// Draw point
				if (this._draw_point && (x % this._scale_x == 0)) {
					drawing.point(px, -py);
				}

				x += 0.5;
			} while (x <= this._max_x);

		} catch (err) {
			alert(err);
			this._algorithmic_function = "";
		}

		// Stroke weight for the curve
		drawing.strokeWeight(2);
		drawing.endShape();
		drawing.pop();
	}

	isClicked (x, y) {
		return (x >= this._x) && (x <= this._x + this._width) && (y >= this._y) && (y <= this._y + this._height);
	}

	toXml () {
		let graph = document.createElement("object_graph");
		graph.innerHTML = this._id;
		graph.setAttribute("x", this._x);
		graph.setAttribute("y", this._y);
		graph.setAttribute("background_color", this._background_color); // r, g, b
		graph.setAttribute("background_transparent", this._background_transparent);
		graph.setAttribute("border_color", this._border_color); // r, g, b
		graph.setAttribute("border_transparency", this._border_transparency);
		graph.setAttribute("border_size", this._border_size);
		graph.setAttribute("layer", this._layer);
		graph.setAttribute("visible", this._visible);
		graph.setAttribute("opacity", this._opacity);
		graph.setAttribute("angle", this._angle); // degrees
		graph.setAttribute("width", this._width);
		graph.setAttribute("height", this._height);
		graph.setAttribute("scale_x", this._scale_x);
		graph.setAttribute("scale_y", this.scale_y);
		graph.setAttribute("unit_x", this._unit_x);
		graph.setAttribute("unit_y", this._unit_y);
		graph.setAttribute("function", this._algorithmic_function);
		graph.setAttribute("min_x", this._min_x);
		graph.setAttribute("min_y", this._min_y);
		graph.setAttribute("max_x", this._max_x);
		graph.setAttribute("max_y", this._max_y);
		graph.setAttribute("draw_point", this._draw_point);
		return graph;
	}

	clone () {
		return new Graph(this.id, this._x, this._y, this._background_color, this._background_transparent, this._border_color, this._border_transparency,
			this.state, this._layer, this._visible, this._opacity, this._angle, this._width, this._height, this._scale_x, this.scale_y, this._unit_x, this._unit_y,
			this._algorithmic_function, this._max_x, this._max_y, this._draw_point, this._min_x, this._min_y);
	}

	get algorithmic_function () {
		return this._algorithmic_function;
	}
	set algorithmic_function (value) {
		this._algorithmic_function = value;
	}

	get draw_point () {
		return this._draw_point;
	}
	set draw_point (value) {
		this._draw_point = value;
	}

}
