/**
 * Set a marker in the program of the object, reachable by the GoTo instruction
 */

class Label extends Instruction {
	
	constructor(object, value) {
		super(object);
		this.value = value;
	}
	
	getValue() {
		return this.value;
	}

	execute() {
		// Nothing to do
	}

}