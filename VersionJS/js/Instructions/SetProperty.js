/**
 * This instruction set the property of the object at a certain value
 */

class SetProperty extends Instruction {

	constructor(object, property, value) {
		super(object);
		this.value = value;
		this.property = property;
	}

	execute() {
		switch(property) {
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
				this.value = this.value.split(",");
				for (c in this.value) this.value[c] = parseInt(this.value[c]);
				this.object.setFgcolor(this.value);
				break;

			case "bgcolor":
				this.value = this.value.split(",");
				for (c in this.value) this.value[c] = parseInt(this.value[c]);
				this.object.setBgcolor(this.value);
				break;

			case "bocolor":
				this.object.setBocolor(this.value);
				break;
			
			case "bgtransparent":
				this.object.setBgtransparent(this.value);
				break;

			case "layer":
				this.object.setLayer(parseInt(this.value));
				break;

			case "opacity":
				this.object.setOpacity(parseFloat(this.value));
				break;
			
			default:
				console.log("[SetProperty.js] Attribut '" + property + "' de l'instruction SetProperty inconnu");
				break;
		}
	}

}
