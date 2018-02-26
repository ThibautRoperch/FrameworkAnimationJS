/**
 * This instruction set the property of the target at a certain value
 */

class SetProperty extends Instruction {

	constructor(object, target, property, value) {
		super(object);
		this.target = target;
		this.property = property;
		this.value = value;
	}

	execute() {
		switch(this.property) {

			// all
			case "x":
				this.target.setX(parseInt(this.value));
				break;
			case "y":
				this.target.setY(parseInt(this.value));
				break;
			case "bgcolor":
				this.target.setBgcolor(parseIntArray(this.value));
				break;
			case "bgtransparent":
				this.target.setBgtransparent(this.value == "true" | false);
				break;
			case "bocolor":
				this.target.setBocolor(parseIntArray(this.value));
				break;
			case "botransparent":
				this.target.setBotransparent(this.value == "true" | false);
				break;
			case "bosize":
				this.target.setBosize(parseInt(this.value));
				break;
			case "layer":
				this.target.setLayer(parseInt(this.value));
				break;
			case "visible":
				this.target.setVisible(this.value == "true" | false);
				break;
			case "opacity":
				this.target.setOpacity(parseInt(this.value) / 100);
				break;
			case "angle":
				this.target.setAngle(parseInt(this.value));
				break;

			// text, image, rectangle, ellipse, landmark
			case "width":
				this.target.setWidth(parseInt(this.value));
				break;
			case "height":
				this.target.setHeight(parseInt(this.value));
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
				this.target.setPadding(parseInt(this.value));
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
				this.target.setCoordx(parseIntArray(this.value));
				break;

			// circle
			case "radius":
				this.target.setRadius(parseInt(this.value));
				break;

			// landmark
			case "scaleX":
				this.target.setScaleX(parseInt(this.value));
				break;
			case "scaleY":
				this.target.setScaleY(parseInt(this.value));
				break;
			case "unitX":
				this.target.setUnitX(parseInt(this.value));
				break;
			case "unitY":
				this.target.setUnitY(parseInt(this.value));
				break;

			// grid
			case "lines":
				this.target.setLines(parseInt(this.value));
				break;
			case "columns":
				this.target.setColumns(parseInt(this.value));
				break;
			case "line_height":
				this.target.setLine_height(parseInt(this.value));
				break;
			case "column_width":
				this.target.setColumn_width(parseInt(this.value));
				break;

			default:
				console.log("[SetProperty.js] The attribute '" + this.property + "' of the SetProperty instruction is unknown.");
				break;
		}
	}

}
