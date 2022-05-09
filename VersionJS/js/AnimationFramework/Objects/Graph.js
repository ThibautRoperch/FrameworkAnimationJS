import { Landmark } from "./Landmark.js";
/**
 * 
 */

export class Graph extends Landmark {

	constructor(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, height, width, scale_x, scale_y, unit_x, unit_y, algorithmic_function, max_X, max_Y) {
		super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, height, width, scale_x, scale_y, unit_x, unit_y, max_X, max_Y);
        this.algorithmic_function = algorithmic_function;
	}

    getFunction() {
        return this.algorithmic_function;
    }

    setFunction(algorithmic_function){
        this.algorithmic_function = algorithmic_function;
    }

	draw(drawing) {
		super.draw(drawing);
        let y_points = [];
        let number_iteration = this.width / this.scale_x;
        let iteration = 0;
        let x = 0;

        // Evaluation of function
        while(iteration < number_iteration) {
            let y = eval(this.algorithmic_function);
            y_points.push(y);
            x += this.scale_x;
            ++iteration;
		}

        // Drawing of function
		if (!this.border_transparency)
			drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
		else
			drawing.noFill();

		drawing.push();
		drawing.beginShape();
		drawing.translate(this.x, this.y);
        for(let i = 0; i < number_iteration; ++i){
            let px;
            let py;
			if(this.width > 0)
				px = i * this.scale_x;
			else
				px = -(i * this.scale_x);
            if(this.height > 0)
                py = -y_points[i];
			else
				py = y_points[i];
			
			if(i == 0 || i == number_iteration - 1)
				drawing.curveVertex(px, py);
            drawing.curveVertex(px, py);
        }
		drawing.endShape();
		drawing.pop();
	}

	isClicked(x, y) {
		return (x >= this.x) && (x <= this.x + this.width) && (y >= this.y) && (y <= this.y + this.height);
	}

	toXml() {
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

	clone() {
		return new Graph(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.state, this.layer, this.visible, this.opacity, this.angle, this.width, this.height, this.scale_x, this.scale_y, this.unit_x, this.unit_y, this.algorithmic_function);
	}

}
