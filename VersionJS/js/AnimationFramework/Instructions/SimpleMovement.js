/**
 * This instruction moves the object on a distance by interval at a rate of loop_delay
 */
import { Instruction } from "./Instruction.js";
export class SimpleMovement extends Instruction {

	constructor(object, distance, interval, loop_delay) {
		super(object);
		this.distance = distance;
		this.interval = interval;
		this.loop_delay = loop_delay;
	}

}
