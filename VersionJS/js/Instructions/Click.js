/**
 * This instruction set the state of the object atached to it to waiting_click
 */

class Click extends Instruction {

	constructor(object) {
		super(object);
	}

	execute() {
		this.object.setState("waiting_click");
	}
	
}
