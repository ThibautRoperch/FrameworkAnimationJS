/**
 * This instruction move the object up of y by interval of interval_y at a rate of loop_delay
 */

class Up extends SimpleMovement {

	constructor(object, distance, interval, loop_delay) {
		super(object, distance, interval, loop_delay);
	}

	execute() {
		this.object.setState(MOVING_STATE);

		up(this);
		function up(instruction) {
			if (instruction.distance > 0) {
				
				instruction.object.setY(instruction.object.getY() - instruction.interval);
				instruction.distance -= instruction.interval;
				
				setTimeout(function() {
					up(instruction);
				}, instruction.loop_delay);
			} else {
				instruction.object.setState(DEFAULT_STATE);
			}
		}

	}
	
}
