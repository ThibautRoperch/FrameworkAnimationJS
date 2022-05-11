/**
 * This instruction center horizontaly the object atached to it
 */
import { Text } from "../Objects/Text.js";
import { Instruction } from "./Instruction.js";
export class CenterX extends Instruction {

	constructor(object) {
		super(object);
	}

	execute() {
		if (this.object instanceof Text) {
			this.object.x = ((WIDTH - this.object.real_width) / 2);
		} else {
			this.object.x = ((WIDTH - this.object.width) / 2);
		}
	}
	
}
