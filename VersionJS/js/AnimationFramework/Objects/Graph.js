import { Landmark } from "./Landmark.js";
/**
 * 
 */

export class Graph extends Landmark {

	constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer,
		visible, opacity, angle, height, width, scale_x, scale_y, unit_x, unit_y, algorithmic_function, max_X, max_Y, draw_point, min_X, min_Y) {

		super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer,
			visible, opacity, angle, height, width, scale_x, scale_y, unit_x, unit_y, max_X, max_Y, min_X, min_Y);

		this.algorithmic_function = algorithmic_function;
		this.draw_point = draw_point;
	}

	getFunction () {
		return this.algorithmic_function;
	}

	setFunction (algorithmic_function) {
		this.algorithmic_function = algorithmic_function;
	}

	getDrawPoint () {
		return this.draw_point;
	}

	setDrawPoint (draw_point) {
		this.draw_point = draw_point;
	}

	draw (drawing) {
		super.draw(drawing);

		drawing.push();
		// We move at the origin of graph
		drawing.translate(this.x, this.y);

		// Drawing of function
		if (!this.border_transparency)
			drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
		else
			drawing.noStroke();

		drawing.noFill();
		// Stroke weight for the points
		drawing.strokeWeight(5);
		drawing.beginShape();

		// Start to calculate all points
		let x = this.min_X;
		try {
			do {

				// Compute the function
				let y = eval(this.algorithmic_function);

				// Map the graph's coordinate to pixels
				let px = this.getXMapping(x, drawing);
				let py = this.getYMapping(y, drawing);

				// Draw vertex
				drawing.curveVertex(px, -py);
				if (x === this.min_X || x >= this.max_X || x === 0) drawing.curveVertex(px, -py);

				// Draw point
				if (this.draw_point && (x % this.scale_x == 0)) {
					drawing.point(px, -py);
				}

				x += 0.5;
			} while (x <= this.max_X);

		} catch (err){
			alert(err);
			this.algorithmic_function = "";
		}

		// Stroke weight for the curve
		drawing.strokeWeight(2);
		drawing.endShape();
		drawing.pop();
	}

	isClicked (x, y) {
		return (x >= this.x) && (x <= this.x + this.width) && (y >= this.y) && (y <= this.y + this.height);
	}

	toXml () {
		let graph = document.createElement("object_graph");
		graph.innerHTML = this.id;
		graph.setAttribute("x", this.x);
		graph.setAttribute("y", this.y);
		graph.setAttribute("background_color", this.background_color); // r, g, b
		graph.setAttribute("background_transparent", this.background_transparent);
		graph.setAttribute("border_color", this.border_color); // r, g, b
		graph.setAttribute("border_transparency", this.border_transparency);
		graph.setAttribute("border_size", this.border_size);
		graph.setAttribute("layer", this.layer);
		graph.setAttribute("visible", this.visible);
		graph.setAttribute("opacity", this.opacity);
		graph.setAttribute("angle", this.angle); // degrees
		graph.setAttribute("width", this.width);
		graph.setAttribute("height", this.height);
		graph.setAttribute("scale_x", this.scale_x);
		graph.setAttribute("scale_y", this.scale_y);
		graph.setAttribute("unit_x", this.unit_x);
		graph.setAttribute("unit_y", this.unit_y);
		graph.setAttribute("function", this.algorithmic_function);
		return graph;
	}

	clone () {
		return new Graph(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.state, this.layer, this.visible, this.opacity, this.angle, this.width, this.height, this.scale_x, this.scale_y, this.unit_x, this.unit_y, this.algorithmic_function);
	}

}
