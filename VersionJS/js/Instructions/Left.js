/**
 * This instruction move the object left of x by interval of interval_x at a rate of FRAME_RATE
 */

class Left extends Instruction {

    constructor(object, x, interval_x) {
        super(object);
        this.x = x;
        this.interval_x = interval_x;
    }

    execute() {
        this.object.setState(MOVING_STATE);

        left(this);
        function left(instruction) {
            if (instruction.object.getX() > instruction.x) {
                
                instruction.object.setX(instruction.object.getX()-instruction.interval_x);
                
                setTimeout(function() {
                    left(instruction);
                }, FRAME_RATE/60);
            }
        }

        this.object.setState(DEFAULT_STATE);
    }
    
}
