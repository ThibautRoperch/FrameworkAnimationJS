/**
 * 
 */

class Trigger extends Instruction {
	
	constructor(object, value) {
		super(object);
		this.value = value;
	}

	execute() {
		if(this.object.getState() == this.value) {
			this.object.setTate(DEFAULT_STATE);
		}
	}
	
}
