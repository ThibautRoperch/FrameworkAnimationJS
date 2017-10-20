/*
* This instruction move the object atached to it, at a precise position at interval and a delay
*/
class MoveTo extends Instruction {

	constructor(object, x, y, interval_x, interval_y, delay) {
		super(object);
		this.x = x;
		this.y = y;
		this.interval_x = interval_x;
		this.interval_y = interval_y;
		this.delay = delay;
	}

	execute() {
		if ((this.object.getY() > this.y) && (this.object.getX() > this.x)) {
				
			this.object.setY(this.object.getY()-this.interval_y);
			this.object.setX(this.object.getX()-this.interval_x);
			
			setTimeout(function() {
	
				this.execute();
	
			}, (FRAME_RATE/60)*this.delay);
		}
		else if ((this.object.getY() < this.y) && (this.object.getX() > this.x)) {
				
			this.object.setY(this.object.getY()+this.interval_y);
			this.object.setX(this.object.getX()-this.interval_x);
	
			setTimeout(function() {
	
				this.execute();
	
			}, (FRAME_RATE/60)*this.delay);
		}
		else if ((this.object.getY() > this.y) && (this.object.getX() < this.x)) {
				
			this.object.setY(this.object.getY()-this.interval_y);
			this.object.setX(this.object.getX()+this.interval_x);
	
			setTimeout(function() {
	
				this.execute();
	
			}, (FRAME_RATE/60)*this.delay);
		}
		else if ((this.object.getY() < this.y) && (this.object.getX() < this.x)) {
				
			this.object.setY(this.object.getY()+this.interval_y);
			this.object.setX(this.object.getX()+this.interval_x);
		
			setTimeout(function() {
	
				this.execute();
	
			}, (FRAME_RATE/60)*this.delay);
		}
	}
}
