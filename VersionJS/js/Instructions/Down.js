/**
 * This instruction move the object down of y by interval of interval_y at a speed of LOOP_DELAY
 */

class Down extends Instruction {

	constructor(object, distance, interval) {
		super(object);
		this.distance = distance;
        this.interval = interval;
	}
	
	execute() {
        this.object.setState(MOVING_STATE);

        down(this);
        function down(instruction) {
            if (instruction.distance > 0) {
                
                instruction.object.setY(instruction.object.getY() + instruction.interval);
                instruction.distance -= instruction.interval;
                
                setTimeout(function() {
                    down(instruction);
                }, LOOP_DELAY);
            } else {
                instruction.object.setState(DEFAULT_STATE);
            }
        }
	}

}
