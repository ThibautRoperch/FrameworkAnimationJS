class MoveTo extends Instruction {
    constructor(object, x, y, interval_x, interval_y, delay) {
        this.object = object;
        this.type = "MoveTo";
        this.x = x;
        this.y = y;
        this.interval_x = interval_x;
        this.interval_y = interval_y;
        this.delay = delay;
    }

    execute() {
        if ((object.getY() > y)&&(object.getX() > x)) {
            
                object.setY(object.getY()-interval_y);
                object.setX(object.getX()-interval_x);
                
            
                setTimeout(function() {
            
                  execute();
            
                }, 10);
        }
        else if ((object.getY() < y)&&(object.getX() > x)) {
            
                object.setY(object.getY()+interval_y);
                object.setX(object.getX()-interval_x);
                
            
                setTimeout(function() {
            
                  execute();
            
                }, 10);
        }
        else if ((object.getY() > y)&&(object.getX() < x)) {
            
                object.setY(object.getY()-interval_y);
                object.setX(object.getX()+interval_x);
                
            
                setTimeout(function() {
            
                  execute();
            
                }, 10);
        }else if ((object.getY() < y)&&(object.getX() < x)) {
            
                object.setY(object.getY()+interval_y);
                object.setX(object.getX()+interval_x);
                
            
                setTimeout(function() {
            
                  execute();
            
                }, 10);
        }
    }
}
