class Wait extends Instruction {
	
	constructor(object, state) {
		super(object,"wait");
		this.expected_state = state;
	}

	execute() {
		this.object.setState(this.expected_state);
	
	}
}
