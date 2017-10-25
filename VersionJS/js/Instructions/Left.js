/**
 * This instruction move the object left of x by interval of interval_x at a rate of FRAME_RATE
 */

class Left extends Instruction {

	constructor(object, distance, interval) {
		super(object);
		this.distance = distance;
		this.interval = interval;
	}

	execute() {
		this.object.setState(MOVING_STATE);

		left(this);
		function left(instruction) {
			if (instruction.distance > 0) {
				
				instruction.object.setX(instruction.object.getX() - instruction.interval);
				instruction.distance -= instruction.interval;

				setTimeout(function() {
					left(instruction);
				}, FRAME_RATE);
			} else {
				instruction.object.setState(DEFAULT_STATE);
			}
		}

	}
	
}
