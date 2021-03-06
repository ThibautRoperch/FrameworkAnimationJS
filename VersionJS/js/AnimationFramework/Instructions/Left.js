/**
 * This instruction moves the object left of x by interval of interval_x at a speed of loop_delay
 */

class Left extends SimpleMovement {

	constructor(object, distance, interval, loop_delay) {
		super(object, distance, interval, loop_delay);
	}

	execute() {
		this.object.setState(MOVING_STATE);
		var original_distance = this.distance;

		left(this);
		function left(instruction) {
			if (instruction.distance > 0) {
				
				instruction.object.setX(instruction.object.getX() - instruction.interval);
				instruction.distance -= instruction.interval;

				setTimeout(function() {
					left(instruction);
				}, instruction.loop_delay);
			} else {
				instruction.distance = original_distance;
				instruction.object.setState(DEFAULT_STATE);
			}
		}

	}
	
}
