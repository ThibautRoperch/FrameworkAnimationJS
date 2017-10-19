class Down extends Instruction {
    
    constructor(object, y, interval_y) {
        this.object = object;
        this.type = "Down";
        this.y = y;
        this.interval_y = interval_Y;
    }
    
    execute() {
        if (this.object.getY() > this.y) {
            
                this.object.setY(this.object.getY()-this.interval_y);
            
                setTimeout(function() {
            
                  this.execute();
            
                }, FRAME_RATE/60);
        }
    }
}
