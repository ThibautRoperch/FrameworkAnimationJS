class Blink extends Instruction {

    constructor(object, times, delay) {
        super(object, "Blink");
        this.times = times;
        this. delay = delay;
    }

    execute() {
        for(i = 0 ; i < times; i++) {
            this.object.setVisible(true);
            setTimeout(function() {
                
                this.object.setVisible(false);
                
                    }, (FRAME_RATE/60)*this.delay);
        }
    }
}
