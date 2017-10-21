/**
 * This instruction set the property of the object at a certain value
 */

class SetProperty extends Instruction {

	constructor(object, property, value) {
		super(object);
		this.property = property;
		this.value = value;
	}

	execute() {
		switch(this.property) {
			case "x":
				this.object.setX(parseInt(this.value));
				break;

			case "y":
				this.object.setY(parseInt(this.value));
				break;

			case "visible":
				this.object.setVisible(this.value == "true" | false);
				break;

			case "text":
				this.object.setText(this.value);
				break;

			case "fgcolor":
				this.object.setFgcolor(parseIntArray(this.value));
				break;

			case "bgcolor":
				this.object.setBgcolor(parseIntArray(this.value));
				break;

			case "bocolor":
				this.object.setBocolor(parseIntArray(this.value));
				break;
			
			case "bgtransparent":
				this.object.setBgtransparent(this.value == "true" | false);
				break;

			case "layer":
				this.object.setLayer(parseInt(this.value));
				break;

			case "opacity":
				this.object.setOpacity(parseFloat(this.value));
				break;
			
			default:
				console.log("[SetProperty.js] Attribut '" + property + "' de l'instruction SetProperty non pris en charge");
				break;
		}
	}

}
