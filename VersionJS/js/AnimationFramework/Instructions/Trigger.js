/**
 * Give a token to the object, setting it in the normal state if the given token is the same as expected
 */
import { Instruction } from "./Instruction.js";
import { DEFAULT_STATE } from "../Objects/AnimatedObject.js";
export class Trigger extends Instruction {
	
	constructor(object, target, value) {
		super(object);
		this.target = target;
		this.value = value;
	}

	execute() {
		/*// If the expected value of the target is the same as the sent one, switch the target into the default state
		// But if the sent value arrives before the expected one, switch the target into the sent value, the wait instruction will switch the target into default state
		if (this.target.getState() == this.value) {
			this.target.setState(DEFAULT_STATE);
		} else if (this.target.getState() == DEFAULT_STATE) {
			this.target.setState(this.value);
		}*/
		if (this.target.state == this.value) {
			this.target.state = (DEFAULT_STATE);
		}
	}
	
}
