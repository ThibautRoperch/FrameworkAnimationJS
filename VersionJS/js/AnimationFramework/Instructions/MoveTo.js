/**
 * This instruction moves the object atached to it, at a precise position at interval and a delay
 */
import { Instruction } from "./Instruction.js";
import { DEFAULT_STATE, MOVING_STATE } from "../Objects/AnimatedObject.js";
import { LOOP_DELAY_MAX, LOOP_DELAY_MIN } from '../animation_controller.js';
export class MoveTo extends Instruction {

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
		this.object.state = (MOVING_STATE);

		move(this);

		function move(instruction) {
			if ((instruction.object.y === instruction.y) && (instruction.object.x === instruction.x)) {
				instruction.object.state = (DEFAULT_STATE);
				return;
			}

			if (instruction.object.y > instruction.y) {
				instruction.object.y = (instruction.object.y - instruction.interval_y);
			}
			else if (instruction.object.y < instruction.y) {
				instruction.object.y = (instruction.object.y + instruction.interval_y);
			}

			if (instruction.object.x > instruction.x) {
				instruction.object.x = (instruction.object.x - instruction.interval_x);
			}
			else if (instruction.object.x < instruction.x) {
				instruction.object.x = (instruction.object.x + instruction.interval_x);
			}

			if ((instruction.object.y !== instruction.y) || (instruction.object.x !== instruction.x)) {
				setTimeout(function () {
					move(instruction);
				}, instruction.delay * 20 * (parseFloat(instruction.loop_delay) / (LOOP_DELAY_MIN * 0.5 + LOOP_DELAY_MAX * 0.5)));
			}
			else {
				instruction.object.state = (DEFAULT_STATE);
			}
		}
	}
}
