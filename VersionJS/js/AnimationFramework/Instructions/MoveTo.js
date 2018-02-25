/**
 * This instruction move the object atached to it, at a precise position at interval and a delay
 */

class MoveTo extends Instruction {

	constructor(object, x, y, interval_x, interval_y, delay, loop_delay) {
		super(object);
		this.x = x;
		this.y = y;
		this.interval_x = interval_x;
		this.interval_y = interval_y;
		this.delay = delay;
		this.loop_delay = loop_delay;
	}

	execute() {
		this.object.setState(MOVING_STATE);

		move(this);
		function move(instruction) {
			if ((instruction.object.getY() > instruction.y) && (instruction.object.getX() > instruction.x)) {
				
				instruction.object.setY(instruction.object.getY()-instruction.interval_y);
				instruction.object.setX(instruction.object.getX()-instruction.interval_x);
				
				if ((instruction.object.getY() > instruction.y) || (instruction.object.getX() > instruction.x))
					setTimeout(function() {
						move(instruction);
					}, instruction.delay * 20 * (parseFloat(instruction.loop_delay) / (LOOP_DELAY_MIN * 0.5 + LOOP_DELAY_MAX * 0.5)));
			}
			else if ((instruction.object.getY() < instruction.y) && (instruction.object.getX() > instruction.x)) {
					
				instruction.object.setY(instruction.object.getY()+instruction.interval_y);
				instruction.object.setX(instruction.object.getX()-instruction.interval_x);
		
				if ((instruction.object.getY() < instruction.y) || (instruction.object.getX() > instruction.x))
					setTimeout(function() {
						move(instruction);
					}, instruction.delay * 20 * (parseFloat(instruction.loop_delay) / (LOOP_DELAY_MIN * 0.5 + LOOP_DELAY_MAX * 0.5)));
			}
			else if ((instruction.object.getY() == instruction.y) && (instruction.object.getX() > instruction.x)) {
					
				instruction.object.setX(instruction.object.getX()-instruction.interval_x);
		
				if (instruction.object.getX() > instruction.x)
					setTimeout(function() {
						move(instruction);
					}, instruction.delay * 20 * (parseFloat(instruction.loop_delay) / (LOOP_DELAY_MIN * 0.5 + LOOP_DELAY_MAX * 0.5)));
			}
			else if ((instruction.object.getY() > instruction.y) && (instruction.object.getX() < instruction.x)) {
					
				instruction.object.setY(instruction.object.getY()-instruction.interval_y);
				instruction.object.setX(instruction.object.getX()+instruction.interval_x);
		
				if ((instruction.object.getY() > instruction.y) || (instruction.object.getX() < instruction.x))
					setTimeout(function() {
						move(instruction);
					}, instruction.delay * 20 * (parseFloat(instruction.loop_delay) / (LOOP_DELAY_MIN * 0.5 + LOOP_DELAY_MAX * 0.5)));
			}
			else if ((instruction.object.getY() < instruction.y) && (instruction.object.getX() < instruction.x)) {
					
				instruction.object.setY(instruction.object.getY()+instruction.interval_y);
				instruction.object.setX(instruction.object.getX()+instruction.interval_x);
			
				if ((instruction.object.getY() < instruction.y) || (instruction.object.getX() < instruction.x))
					setTimeout(function() {
						move(instruction);
					}, instruction.delay * 20 * (parseFloat(instruction.loop_delay) / (LOOP_DELAY_MIN * 0.5 + LOOP_DELAY_MAX * 0.5)));
			}
			else if ((instruction.object.getY() == instruction.y) && (instruction.object.getX() < instruction.x)) {
					
				instruction.object.setX(instruction.object.getX()+instruction.interval_x);
			
				if ((instruction.object.getX() < instruction.x))
					setTimeout(function() {
						move(instruction);
					}, instruction.delay * 20 * (parseFloat(instruction.loop_delay) / (LOOP_DELAY_MIN * 0.5 + LOOP_DELAY_MAX * 0.5)));
			}
			else if ((instruction.object.getY() > instruction.y) && (instruction.object.getX() == instruction.x)) {
					
				instruction.object.setY(instruction.object.getY()-instruction.interval_y);
			
				if ((instruction.object.getY() > instruction.y))
					setTimeout(function() {
						move(instruction);
					}, instruction.delay * 20 * (parseFloat(instruction.loop_delay) / (LOOP_DELAY_MIN * 0.5 + LOOP_DELAY_MAX * 0.5)));
			}
			else if ((instruction.object.getY() < instruction.y) && (instruction.object.getX() == instruction.x)) {
					
				instruction.object.setY(instruction.object.getY()+instruction.interval_y);
			
				if ((instruction.object.getY() < instruction.y))
					setTimeout(function() {
						move(instruction);
					}, instruction.delay * 20 * (parseFloat(instruction.loop_delay) / (LOOP_DELAY_MIN * 0.5 + LOOP_DELAY_MAX * 0.5)));
			}
		}

		this.object.setState(DEFAULT_STATE);
	}

}
