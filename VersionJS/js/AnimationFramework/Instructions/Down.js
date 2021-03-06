/**
 * This instruction moves the object down of y by interval of interval_y at a speed of loop_delay
 */

class Down extends SimpleMovement {

	constructor(object, distance, interval, loop_delay) {
		super(object, distance, interval, loop_delay);
	}
	
	execute() {
        this.object.setState(MOVING_STATE);
		var original_distance = this.distance;

        down(this);
        function down(instruction) {
            if (instruction.distance > 0) {
                
                instruction.object.setY(instruction.object.getY() + instruction.interval);
                instruction.distance -= instruction.interval;
                
                setTimeout(function() {
                    down(instruction);
                }, instruction.loop_delay);
            } else {
				instruction.distance = original_distance;
                instruction.object.setState(DEFAULT_STATE);
            }
        }
	}

}
