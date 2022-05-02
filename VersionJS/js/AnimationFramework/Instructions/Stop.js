/**
 * This instruction stops all the programs
 */
import { Instruction } from "./Instruction.js";
export class Stop extends Instruction {

	constructor(object) {
		super(object);
	}

	execute() {
		// Nothing to do
	}

}
