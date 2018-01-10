/**
 * This instruction move the object down of y by interval of interval_y at a speed of loop_delay
 */

class Down extends Instruction {

	constructor(object, distance, interval, loop_delay) {
		super(object);
		this.distance = distance;
        this.interval = interval;
        this.loop_delay = loop_delay;
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
                }, instruction.loop_delay);
            } else {
                instruction.object.setState(DEFAULT_STATE);
            }
        }
	}

}
