/**
 * This instruction center horizontaly the object atached to it
 */
import { Instruction } from "./Instruction.js";
export class CenterX extends Instruction {

	constructor(object) {
		super(object);
	}

	execute() {
		this.object.x = ((WIDTH-this.object.getWidth())/2);
	}
	
}
