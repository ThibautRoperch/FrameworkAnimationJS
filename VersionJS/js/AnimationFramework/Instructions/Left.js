/**
 * This instruction move the object left of x by interval of interval_x at a speed of loop_delay
 */

class Left extends Instruction {

	constructor(object, distance, interval, loop_delay) {
		super(object);
		this.distance = distance;
		this.interval = interval;
		this.loop_delay = loop_delay;
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
				}, instruction.loop_delay);
			} else {
				instruction.object.setState(DEFAULT_STATE);
			}
		}

	}
	
}
