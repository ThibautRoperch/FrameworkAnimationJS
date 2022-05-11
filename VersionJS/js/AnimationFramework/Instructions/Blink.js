import { Instruction } from './Instruction.js';
import { DEFAULT_STATE, WAITING_CLICK_STATE } from '../Objects/AnimatedObject.js';
import { LOOP_DELAY_MAX, LOOP_DELAY_MIN } from '../animation_controller.js';
/*
 *  This instruction make the object blink at each Delay*frame rate, for Times iteration
 */
export class Blink extends Instruction {

	constructor(object, times, delay, loop_delay) {
		super(object);
		this.times = times;
		this.delay = delay;

		this.initial_opacity;
		this.visible_opacity;

		this.loop_delay = loop_delay;
	}

	execute() {
		this.initial_opacity = this.object.opacity;
		this.visible_opacity = this.object.opacity == 0 ? 1 : this.object.opacity;

		blink(this, 0);
		function blink(instruction, blinked_times) {

			if (instruction.object.opacity == 0) instruction.object.opacity = (instruction.visible_opacity);
			else instruction.object.opacity = (0);

			if (blinked_times < instruction.times && (instruction.object.state == DEFAULT_STATE || instruction.object.state == WAITING_CLICK_STATE)) {
				setTimeout(function () {
					blink(instruction, ++blinked_times);
				}, instruction.delay * 20 * (parseFloat(instruction.loop_delay) / (LOOP_DELAY_MIN * 0.5 + LOOP_DELAY_MAX * 0.5)));
			} else {
				instruction.object.opacity = (instruction.initial_opacity);
			}
		}
	}

}
