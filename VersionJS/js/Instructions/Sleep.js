class Sleep extends Instruction {
    
    constructor(object, value) {
        super(object, "Sleep");
        this.value = value;
    }

    execute() {
        this.object.setState("waiting_click");
        setTimeout(function() {
            this.object.setState("normal");
        }, (FRAME_RATE/60)*this.value);
    }
}
