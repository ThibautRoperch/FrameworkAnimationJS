/**
 * This instruction move the object down of y by interval of interval_y at a rate of FRAME_RATE
 */

class Down extends Instruction {

	constructor(object, y, interval_y) {
		super(object);
		this.y = y;
        this.interval_y = interval_y;
        this.destination = object.getY() + y;
	}
	
	execute() {
        this.object.setState(MOVING_STATE);

        down(this);
        function down(instruction) {
            if (instruction.object.getY() < instruction.destination) {
                
                instruction.object.setY(instruction.object.getY() + instruction.interval_y);
                
                setTimeout(function() {
                    down(instruction);
                }, FRAME_RATE);
            }
        }

        this.object.setState(DEFAULT_STATE);
	}

}
