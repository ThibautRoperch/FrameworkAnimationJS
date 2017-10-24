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
		// TODO refaire avec une fonction, comme Up/Down/Sleep/etc...
		for(i = 0 ; i < times; i++) {
			this.object.setVisible(true);
			setTimeout(function() {
				this.object.setVisible(false);	
			}, (FRAME_RATE/60)*this.delay);
		}
	}
	
}
