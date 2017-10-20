/*
*	This instruction set the property of the object at a certain value
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
				this.object.setX(this.value);
				break;

			case "y":
				this.object.setX(this.value);
				break;

			case "visible":
				this.object.setText(this.value);
				break;

			case "text":
				this.object.setText(this.value);
				break;

			case "fgcolor":
				this.object.setFgcolor(this.value);
				break;

			case "bgcolor":
				this.object.setBgcolor(this.value);
				break;

			case "bocolor":
				this.object.setBocolor(this.value);
				break;
			
			case "bgtransparent":
				this.object.setBgtransparent(this.value);
				break;

			case "layer":
				this.object.setLayer(this.value);
				break;

			case "opacity":
				this.object.setOpacity(this.value);
				break;
		}
	}
}
