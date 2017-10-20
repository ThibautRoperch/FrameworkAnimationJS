/*
*   This instruction move the object right of x by interval of interval_x at a rate of FRAME_RATE 
*/
class Right extends Instruction {

	constructor(object, x, interval_x) {
		super(object, "Right");
		this.x = x;
		this.interval_x = interval_x;
	}
	
	execute() {
		if (this.object.getX() < this.x) {
			
			this.object.setX(this.object.getX()+this.interval_x);
		
			setTimeout(function() {
		
				this.execute();
		
			}, FRAME_RATE/60);
		}
	}
}
