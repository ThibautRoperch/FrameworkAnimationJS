/**
 * This instruction set the object to a waiting state for a certain number of frame cycle
 */

class Sleep extends Instruction {

	constructor(object, value) {
		super(object);
		this.value = value;
	}

	execute() {
		this.object.setState(SLEEPING_STATE);
		
		sleep(this);
		function sleep(instruction) {
			setTimeout(function() {
				instruction.object.setState(DEFAULT_STATE);
			}, instruction.value * 20 * (parseFloat(LOOP_DELAY) / (LOOP_DELAY_MIN * 0.5 + LOOP_DELAY_MAX * 0.5)));
		}
	}
	
}
