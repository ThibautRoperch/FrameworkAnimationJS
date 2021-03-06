/**
 * This instruction moves the object right of x by interval of interval_x at a speed of loop_delay
 */

class Right extends SimpleMovement {

	constructor(object, distance, interval, loop_delay) {
		super(object, distance, interval, loop_delay);
	}
	
	execute() {
		this.object.setState(MOVING_STATE);
		var original_distance = this.distance;

		right(this);
		function right(instruction) {
			if (instruction.distance > 0) {

				instruction.object.setX(instruction.object.getX() + instruction.interval);
                instruction.distance -= instruction.interval;
				
				setTimeout(function() {
					right(instruction);
				}, instruction.loop_delay);
			} else {
				instruction.distance = original_distance;
				instruction.object.setState(DEFAULT_STATE);				
			}
		}

	}

}
