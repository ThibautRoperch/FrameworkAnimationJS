/**
 * Set the object as waiting for a given token, triggerable by the Trigger instruction
 */
import { Instruction } from "./Instruction.js";
export class Wait extends Instruction {
	
	constructor(object, state) {
		super(object);
		this.expected_state = state;
	}

	execute() {
		/*// If the object is already in the expected state that means that the trigger instruction did the wait one work, so switch the object into the default state
		if (this.object.getState() == this.expected_state) {
			this.object.setState(DEFAULT_STATE);
		} else {
			this.object.setState(this.expected_state);
		}*/
		this.object.state = (this.expected_state);
	}
	
}
