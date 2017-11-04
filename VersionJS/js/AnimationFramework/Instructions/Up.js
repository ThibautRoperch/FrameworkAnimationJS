/**
 * This instruction move the object up of y by interval of interval_y at a rate of LOOP_DELAY
 */

class Up extends Instruction {

	constructor(object, distance, interval) {
		super(object);
		this.distance = distance;
		this.interval = interval;
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
				}, LOOP_DELAY);
			} else {
				instruction.object.setState(DEFAULT_STATE);
			}
		}

	}
	
}