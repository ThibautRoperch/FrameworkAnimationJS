/**
 * 
 */

class Wait extends Instruction {
	
	constructor(object, state) {
		super(object);
		this.expected_state = state;
	}

	execute() {
		this.object.setState(this.expected_state);
	}
	
}
