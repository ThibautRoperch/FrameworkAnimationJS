/*
 * This instruction center horizontaly and verticaly the object atached to it
 */
import { Instruction } from "./Instruction.js";
export class Center extends Instruction {

	constructor(object) {
		super(object);
	}
	
	execute() {
		this.object.x = ((WIDTH-this.object.getWidth())/2);
		this.object.y = ((HEIGHT-this.object.getHeight())/2);  
	}
	
}
