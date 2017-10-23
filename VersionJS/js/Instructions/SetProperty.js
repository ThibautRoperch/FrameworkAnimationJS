/**
 * This instruction set the property of the target at a certain value
 */

class SetProperty extends Instruction {

	constructor(object, target, property, value) {
		super(object);
		this.property = property;
		this.value = value;
		this.target = target;
	}

	execute() {
		switch(this.property) {
			case "x":
				this.target.setX(parseInt(this.value));
				break;

			case "y":
				this.target.setY(parseInt(this.value));
				break;

			case "visible":
				this.target.setVisible(this.value == "true" ? true : false);
				break;

			case "text":
				this.target.setText(this.value);
				break;

			case "fgcolor":
				this.target.setFgcolor(parseIntArray(this.value));
				break;

			case "bgcolor":
				this.target.setBgcolor(parseIntArray(this.value));
				break;

			case "bocolor":
				this.target.setBocolor(parseIntArray(this.value));
				break;
			
			case "bgtransparent":
				this.target.setBgtransparent(this.value == "true" | false);
				break;

			case "layer":
				this.target.setLayer(parseInt(this.value));
				break;

			case "opacity":
				this.target.setOpacity(parseFloat(this.value));
				break;
			
			default:
				console.log("[SetProperty.js] Attribut '" + property + "' de l'instruction SetProperty non pris en charge");
				break;
		}
	}

}
