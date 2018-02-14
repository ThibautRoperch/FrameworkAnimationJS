/**
 * This instruction changes the state of the object to the value gave by the indtruction
 */

class State extends Instruction {

	constructor(object, value) {
		super(object);
		this.value = value;
	}
	
	execute() {
		this.object.setState(this.value);
	}

}
