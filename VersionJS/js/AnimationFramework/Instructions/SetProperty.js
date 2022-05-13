/**
 * This instruction set the property of the target at a certain value
 */
import { Instruction } from "./Instruction.js";
import { parseIntArray } from '../animation_controller.js';
export class SetProperty extends Instruction {

	constructor (object, target, property, value) {
		super(object);
		this.target = target;
		this.property = property;
		this.value = value;
	}

	execute () {
		switch (this.property) {

			// all
			case "x":
				this.target.x = parseInt(this.value) | 0;
				break;
			case "y":
				this.target.y = (parseInt(this.value) | 0);
				break;
			case "background_color":
				this.target.background_color = parseIntArray(this.value);
				break;
			case "background_transparent":
				this.target.background_transparent = this.value == "true" | false;
				break;
			case "border_color":
				this.target.border_color = parseIntArray(this.value);
				break;
			case "border_transparency":
				this.target.border_transparency = this.value == "true" | false;
				break;
			case "border_size":
				this.target.border_size = parseInt(this.value) | 0;
				break;
			case "layer":
				this.target.layer = parseInt(this.value) | 0;
				break;
			case "visible":
				this.target.visible = this.value == "true" ? true : false;
				break;
			case "opacity":
				this.target.opacity = parseInt(this.value) / 100.0;
				break;
			case "angle":
				this.target.angle = parseInt(this.value) | 0;
				break;

			// text, image, rectangle, ellipse, landmark
			case "width":
				this.target.width = parseInt(this.value) | 0;
				break;
			case "height":
				this.target.height = parseInt(this.value) | 0;
				break;

			// text
			case "text":
				this.target.text = this.value;
				break;
			case "font":
				this.target.font = this.value.split(",");
				break;
			case "color":
				this.target.color = parseIntArray(this.value);
				break;
			case "padding":
				this.target.padding = parseIntArray(this.value);
				break;
			case "halignment":
				this.target.halignment = this.value;
				break;
			case "valignment":
				this.target.valignment = this.value;
				break;

			// image
			case "image":
				this.target.image = this.value;
				break;

			// rectangle
			case "round":
				this.target.round = parseIntArray(this.value);
				break;

			// polygon
			case "coord_x":
				this.target.coord_x = parseIntArray(this.value);
				break;
			case "coord_y":
				this.target.coord_y = parseIntArray(this.value);
				break;

			// circle
			case "radius":
				this.target.radius = parseInt(this.value) | 0;
				break;

			// landmark
			case "scale_x":
				this.target.scale_x = parseInt(this.value) | 0;
				break;
			case "scale_y":
				this.target.scale_y = parseInt(this.value) | 0;
				break;
			case "unit_x":
				this.target.unit_x = this.value;
				break;
			case "unit_y":
				this.target.unit_y = this.value;
				break;
			case "max_x":
				this.target.max_x = parseInt(this.value);
				break;
			case "max_y":
				this.target.max_y = parseInt(this.value);
				break;
			case "min_x":
				this.target.min_x = parseInt(this.value);
				break;
			case "min_y":
				this.target.min_y = parseInt(this.value);
				break;

			// grid
			case "lines":
				this.target.lines = parseInt(this.value) | 0;
				break;
			case "columns":
				this.target.columns = parseInt(this.value) | 0;
				break;
			case "line_height":
				this.target.line_height = parseInt(this.value) | 0;
				break;
			case "column_width":
				this.target.column_width = parseInt(this.value) | 0;
				break;

			// table
			case "values":
				this.target.values = this.value;
				break;
			case "has_header_columns":
				this.target.has_header_columns = this.value == "true" ? true : false;
				break;
			case "has_header_rows":
				this.target.has_header_rows = this.value == "true" ? true : false;
				break;
			case "header_font":
				this.target.header_font = this.value.split(",");
				break;
			case "header_color":
				this.target.header_color = parseIntArray(this.value);
				break;
			case "header_background_color":
				this.target.header_background_color = parseIntArray(this.value);
				break;
			case "header_line_height":
				this.target.header_line_height = parseInt(this.value);
				break;
			case "header_column_width":
				this.target.header_column_width = parseInt(this.value);
				break;

			// graph
			case "function":
				this.target.algorithmic_function = (this.value);
				break;
			case "draw_point":
				this.target.draw_point = (this.value == "true" ? true : false);
				break;

			// arrow
			case "width_line":
				this.target.width_line = parseInt(this.value);
				break;
			case "height_line":
				this.target.height_line = parseInt(this.value);
				break;
			case "width_triangle":
				this.target.width_triangle = parseInt(this.value);
				break;
			case "height_triangle":
				this.target.triangle = parseInt(this.value);
				break;
			case "rotation":
				this.target.rotation = parseInt(this.value);
				break;

			default:
				console.log("[SetProperty.js] La propriété '" + this.property + "' est inconnue de l'instruction SetProperty"); // dans ce cas, rajouter l'attribut (dans le switch case ci-dessus)
				break;
		}
	}

}
