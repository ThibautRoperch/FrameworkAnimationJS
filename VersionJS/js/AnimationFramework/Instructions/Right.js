/**
 * This instruction move the object right of x by interval of interval_x at a speed of loop_delay
 */

class Right extends Instruction {

	constructor(object, distance, interval, loop_delay) {
		super(object);
		this.distance = distance;
		this.interval = interval;
		this.loop_delay = loop_delay;
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
				}, instruction.loop_delay);
			} else {
				instruction.object.setState(DEFAULT_STATE);				
			}
		}
	}

}
