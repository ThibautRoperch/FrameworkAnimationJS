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
				this.target.setX(parseInt(this.value) | 0);
				break;
			case "y":
				this.target.setY(parseInt(this.value) | 0);
				break;
			case "background_color":
				this.target.setBackground_color(parseIntArray(this.value));
				break;
			case "background_transparent":
				this.target.setBackground_transparent(this.value == "true" | false);
				break;
			case "border_color":
				this.target.setBorder_color(parseIntArray(this.value));
				break;
			case "border_transparency":
				this.target.setBorder_transparency(this.value == "true" | false);
				break;
			case "border_size":
				this.target.setBorder_size(parseInt(this.value) | 0);
				break;
			case "layer":
				this.target.setLayer(parseInt(this.value) | 0);
				break;
			case "visible":
				this.target.setVisible(this.value == "true" ? true : false);
				break;
			case "opacity":
				this.target.setOpacity(parseInt(this.value) | 0);
				break;
			case "angle":
				this.target.setAngle(parseInt(this.value) | 0);
				break;

			// text, image, rectangle, ellipse, landmark
			case "width":
				this.target.setWidth(parseInt(this.value) | 0);
				break;
			case "height":
				this.target.setHeight(parseInt(this.value) | 0);
				break;

			// text
			case "text":
				this.target.setText(this.value);
				break;
			case "font":
				this.target.setFont(this.value.split(","));
				break;
			case "color":
				this.target.setColor(parseIntArray(this.value));
				break;
			case "padding":
				this.target.setPadding(parseInt(this.value) | 0);
				break;
			case "halignment":
				this.target.setHalignment(this.value);
				break;
			case "valignment":
				this.target.setValignment(this.value);
				break;

			// image
			case "image":
				this.target.setImage(this.value);
				break;

			// rectangle
			case "round":
				this.target.setRound(parseIntArray(this.value));
				break;

			// polygon
			case "coord_x":
				this.target.setCoordx(parseIntArray(this.value));
				break;
			case "coord_y":
				this.target.setCoordy(parseIntArray(this.value));
				break;

			// circle
			case "radius":
				this.target.setRadius(parseInt(this.value) | 0);
				break;

			// landmark
			case "scale_x":
				this.target.scale_X = parseInt(this.value) | 0;
				break;
			case "scale_y":
				this.target.scale_Y = parseInt(this.value) | 0;
				break;
			case "unit_x":
				this.target.unit_X = this.value;
				break;
			case "unit_y":
				this.target.unit_Y = this.value;
				break;
			case "max_X":
				this.target.max_X = this.value;
				break;
			case "max_Y":
				this.target.max_Y = this.value;
				break;
			case "min_X":
				this.target.min_X = this.value;
				break;
			case "min_Y":
				this.target.min_Y = this.value;
				break;

			// grid
			case "lines":
				this.target.setLines(parseInt(this.value) | 0);
				break;
			case "columns":
				this.target.setColumns(parseInt(this.value) | 0);
				break;
			case "line_height":
				this.target.setLine_height(parseInt(this.value) | 0);
				break;
			case "column_width":
				this.target.setColumn_width(parseInt(this.value) | 0);
				break;

			// table
			case "values":
				this.target.setValues(this.value);
				break;
			case "has_header_columns":
				this.target.setHasHeaderColumns(this.value == "true" ? true : false);
				break;
			case "has_header_rows":
				this.target.setHasHeaderRows(this.value == "true" ? true : false);
				break;
			case "header_font":
				this.target.setHeaderFont(this.value.split(","));
				break;
			case "header_color":
				this.target.setHeaderColor(parseIntArray(this.value));
				break;
			case "header_background_color":
				this.target.setHeaderBackgroundColor(parseIntArray(this.value));
				break;

			// graph
			case "function":
				this.target.setFunction(this.value);
				break;
			case "draw_point":
				this.target.setDrawPoint(this.value == "true" ? true : false);
				break;

			default:
				console.log("[SetProperty.js] La propriété '" + this.property + "' est inconnue de l'instruction SetProperty"); // dans ce cas, rajouter l'attribut (dans le switch case ci-dessus)
				break;
		}
	}

}
