/*
 *  This instruction make the object blink at each Delay*frame rate, for Times iteration
 */

class Blink extends Instruction {

	constructor(object, times, delay) {
		super(object);
		this.times = times;
		this.delay = delay;
		this.visible_before;
	}

	execute() {
		this.visible_before = this.object.getVisible();
		
		blink(this, 0);
		function blink(instruction, blinked_times) {

			instruction.object.setVisible(!instruction.object.getVisible());

			if (blinked_times < instruction.times && (instruction.object.getState() == DEFAULT_STATE || instruction.object.getState() == WAITING_CLICK_STATE)) {
				setTimeout(function() {
					blink(instruction, ++blinked_times);	
				}, LOOP_DELAY * instruction.delay);
			} else {
				instruction.object.setVisible(instruction.visible_before);
			}
		}
	}
	
}
