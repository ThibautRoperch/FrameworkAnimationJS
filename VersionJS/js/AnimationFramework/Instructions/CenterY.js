/**
 * This instruction center verticaly the object atached to it
 */
import { Instruction } from "./Instruction.js";
export class CenterY extends Instruction {

	constructor(object) {
		super(object);
	}

	execute() {
		this.object.setY(HEIGHT-this.object.getHeight());
	}

}
