/*
 *  This instruction make the object blink at each Delay*frame rate, for Times iteration
 */

class Blink extends Instruction {

	constructor(object, times, delay) {
		super(object);
		this.times = times;
		this.delay = delay;
	}

	execute() {
		blink(this, 0);
		function blink(instruction, blinked_times) {

			instruction.object.setVisible(!instruction.object.getVisible());

			if(blinked_times < instruction.times) {	
				setTimeout(function() {
					blink(instruction, blinked_times++);	
				}, FRAME_RATE * instruction.delay);
			}	
		}
	}
	
}
