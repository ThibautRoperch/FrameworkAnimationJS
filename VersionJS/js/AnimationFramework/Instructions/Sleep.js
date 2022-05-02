import { Instruction } from './Instruction.js';
import { DEFAULT_STATE, SLEEPING_STATE } from '../Objects/AnimatedObject.js';
import { LOOP_DELAY_MAX ,LOOP_DELAY_MIN } from '../animation_controller.js';
/**
 * This instruction set the object to a waiting state for a certain number of frame cycle
 */
export class Sleep extends Instruction {

	constructor(object, value, loop_delay) {
		super(object);
		this.value = value;
		this.loop_delay = loop_delay;
	}

	execute() {
		this.object.setState(SLEEPING_STATE);
		
		sleep(this);
		function sleep(instruction) {
			setTimeout(function() {
				instruction.object.setState(DEFAULT_STATE);
			}, instruction.value * 20 * (parseFloat(instruction.loop_delay) / (LOOP_DELAY_MIN * 0.5 + LOOP_DELAY_MAX * 0.5)));
		}
	}
	
}
