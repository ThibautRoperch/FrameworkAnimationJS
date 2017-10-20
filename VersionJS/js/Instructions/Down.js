/**
 * This instruction move the object down of y by interval of interval_y at a rate of FRAME_RATE
 */

class Down extends Instruction {

	constructor(object, y, interval_y) {
		super(object);
		this.y = y;
		this.interval_y = interval_y;
	}
	
	execute() {
		if (this.object.getY() > this.y) {
			this.object.setY(this.object.getY() - this.interval_y);
			setTimeout(function() {
				this.execute();
			}, FRAME_RATE/60);
		}
	}

}
