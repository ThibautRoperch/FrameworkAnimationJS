/**
 * This instruction move the object up of y by interval of interval_y at a rate of FRAME_RATE
 */

class Up extends Instruction {

	constructor(object, y, interval_y) {
		super(object);
		this.y = y;
		this.interval_y = interval_y;
	}

	execute() {
		this.object.setState(MOVING_STATE);
		up(this);
		function up(instruction) {
			if (instuction.object.getY() < instruction.y) {
				
				instruction.object.setY(instruction.object.getY()+instruction.interval_y);
			
				setTimeout(function() {
			
					up(instruction);
			
				}, FRAME_RATE/60);
			}
		}
		this.object.setState(DEFAULT_STATE);
	}
}
