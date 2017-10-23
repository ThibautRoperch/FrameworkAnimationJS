/*
*   This instruction move the object left of x by interval of interval_x at a rate of FRAME_RATE 
*/
class Left extends Instruction{

    constructor(object, x, interval_x) {
        super(object);
        this.x = x;
        this.interval_x = interval_x;
    }
    execute() {
        this.object.setState(MOVING_STATE);
        //left();
        function left() {
            if (this.object.getX() > this.x) {
                
                    this.object.setX(this.object.getX()-this.interval_x);
                
                    setTimeout(function() {
                
                    left();
                
                    }, FRAME_RATE/60);
            }
        }
        this.object.setState(DEFAULT_STATE);
    }
}
