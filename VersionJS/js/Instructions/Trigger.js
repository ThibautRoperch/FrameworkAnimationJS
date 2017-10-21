/**
 * 
 */

class Trigger extends Instruction {
	
	constructor(object, target, value) {
		super(object);
		this.target = target;
		this.value = value;
	}

	execute() {
		if(this.target.getState() == this.value) {
			this.target.setState(DEFAULT_STATE);
		}
	}
	
}
