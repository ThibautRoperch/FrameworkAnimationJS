/**
 * This instruction set the state of the object atached to it to waiting_click
 */
 import { WAITING_CLICK_STATE } from "../Objects/AnimatedObject.js";
import { Instruction } from "./Instruction.js";
export class Click extends Instruction {

	constructor(object) {
		super(object);
	}

	execute() {
		this.object.state = (WAITING_CLICK_STATE);
	}
	
}
