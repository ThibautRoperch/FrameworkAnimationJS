/**
 * 
 */

class Angle extends Instruction {
	
	constructor(object, value) {
		super(object);
		this.value = value;
	}

	execute() {
		this.object.setAngle(this.value);
	}
	
}
