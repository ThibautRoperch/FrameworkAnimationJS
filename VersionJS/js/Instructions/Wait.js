class Wait extends Instruction {
	
	constuctor(object, state) {
		super(object,"wait");
		this.expected_state = state;
	}

	execute() {
		this.object.setState(this.expected_state);
	
	}
}
