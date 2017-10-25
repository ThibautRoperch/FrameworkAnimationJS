/**
 * This instruction move the object right of x by interval of interval_x at a rate of FRAME_RATE
 */

class Right extends Instruction {

	constructor(object, distance, interval) {
		super(object);
		this.distance = distance;
		this.interval = interval;
	}
	
	execute() {
		this.object.setState(MOVING_STATE);

		right(this);
		function right(instruction) {
			if (instruction.distance > 0) {

				instruction.object.setX(instruction.object.getX() + instruction.interval);
                instruction.distance -= instruction.interval;
				
				setTimeout(function() {
					right(instruction);
				}, FRAME_RATE);
			} else {
				instruction.object.setState(DEFAULT_STATE);				
			}
		}
	}

}
