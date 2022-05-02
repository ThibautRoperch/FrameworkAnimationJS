/** 
 * Reach a mark in the program of the object defined by the instruction Label
 */
import { Instruction } from "./Instruction.js";
export class GoTo extends Instruction {

	constructor(object, value) {
		super(object);
		this.value = value;
	}
	
	getValue() {
		return this.value;
	}

	execute() {
		// Nothing to do
	}

}
