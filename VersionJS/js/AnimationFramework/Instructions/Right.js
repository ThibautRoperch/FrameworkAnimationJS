import { SimpleMovement } from "./SimpleMovement.js";
import { DEFAULT_STATE, MOVING_STATE } from "../Objects/AnimatedObject.js";
/**
 * This instruction moves the object right of x by interval of interval_x at a speed of loop_delay
 */
export class Right extends SimpleMovement {

	constructor(object, distance, interval, loop_delay) {
		super(object, distance, interval, loop_delay);
	}
	
	execute() {
		this.object.state = (MOVING_STATE);
		let original_distance = this.distance;

		right(this);
		function right(instruction) {
			if (instruction.distance > 0) {

				instruction.object.x += instruction.interval;
                instruction.distance -= instruction.interval;
				
				setTimeout(function() {
					right(instruction);
				}, instruction.loop_delay);
			} else {
				instruction.distance = original_distance;
				instruction.object.state = (DEFAULT_STATE);				
			}
		}

	}

}
