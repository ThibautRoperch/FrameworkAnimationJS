import { SimpleMovement } from "./SimpleMovement.js";
import { DEFAULT_STATE, MOVING_STATE } from "../Objects/AnimatedObject.js";
/**
 * This instruction moves the object left of x by interval of interval_x at a speed of loop_delay
 */
export class Left extends SimpleMovement {

	constructor(object, distance, interval, loop_delay) {
		super(object, distance, interval, loop_delay);
	}

	execute() {
		this.object.state = (MOVING_STATE);
		let original_distance = this.distance;

		left(this);
		function left(instruction) {
			if (instruction.distance > 0) {
				
				instruction.object.x -= instruction.interval;
				instruction.distance -= instruction.interval;

				setTimeout(function() {
					left(instruction);
				}, instruction.loop_delay);
			} else {
				instruction.distance = original_distance;
				instruction.object.state = (DEFAULT_STATE);
			}
		}

	}
	
}
