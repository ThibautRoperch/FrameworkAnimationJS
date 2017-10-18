class Wait extends Instruction {
	constuctor(object, state) {
		this.object = object;
		this.type = "Wait";
		this.expected_state = state;
	}

	execute() {
		this.object.setState(this.expected_state);
	
	}
}
