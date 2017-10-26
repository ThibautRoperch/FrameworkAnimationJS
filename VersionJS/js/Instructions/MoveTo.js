/**
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
		this.object.setState(MOVING_STATE);

		move(instruction);
		function move(instruction) {
			if ((instruction.object.getY() > instruction.y) && (instruction.object.getX() > instruction.x)) {
				
				instruction.object.setY(instruction.object.getY()-instruction.interval_y);
				instruction.object.setX(instruction.object.getX()-instruction.interval_x);
				
				setTimeout(function() {
					move(instruction);
				}, LOOP_DELAY*instruction.delay);
			}
			else if ((instruction.object.getY() < instruction.y) && (instruction.object.getX() > instruction.x)) {
					
				instruction.object.setY(instruction.object.getY()+instruction.interval_y);
				instruction.object.setX(instruction.object.getX()-instruction.interval_x);
		
				setTimeout(function() {
					move(instruction);
				}, LOOP_DELAY*instruction.delay);
			}
			else if ((instruction.object.getY() > instruction.y) && (instruction.object.getX() < instruction.x)) {
					
				instruction.object.setY(instruction.object.getY()-instruction.interval_y);
				instruction.object.setX(instruction.object.getX()+instruction.interval_x);
		
				setTimeout(function() {
					move(instruction);
				}, LOOP_DELAY*instruction.delay);
			}
			else if ((instruction.object.getY() < instruction.y) && (instruction.object.getX() < instruction.x)) {
					
				instruction.object.setY(instruction.object.getY()+instruction.interval_y);
				instruction.object.setX(instruction.object.getX()+instruction.interval_x);
			
				setTimeout(function() {
					move(instruction);
				}, LOOP_DELAY*this.delay);
			}
		}

		this.object.setState(DEFAULT_STATE);
	}

}
