import { SimpleMovement } from "./SimpleMovement.js";
import { DEFAULT_STATE, MOVING_STATE } from "../Objects/AnimatedObject.js";
/**
 * This instruction moves the object down of y by interval of interval_y at a speed of loop_delay
 */
export class Down extends SimpleMovement {

	constructor(object, distance, interval, loop_delay) {
		super(object, distance, interval, loop_delay);
	}
	
	execute() {
        this.object.state = (MOVING_STATE);
		let original_distance = this.distance;

        down(this);
        function down(instruction) {
            if (instruction.distance > 0) {
                
                instruction.object.y = (instruction.object.y + instruction.interval);
                instruction.distance -= instruction.interval;
                
                setTimeout(function() {
                    down(instruction);
                }, instruction.loop_delay);
            } else {
				instruction.distance = original_distance;
                instruction.object.state = (DEFAULT_STATE);
            }
        }
	}

}
