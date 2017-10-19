class Trigger extends Instruction {
    
    constructor(object, value) {
        super(object, "Triger");
        this.value = value
    }

    execute() {
        if(this.object.getState() == this.value) {
            this.object.setTate("normal");
        }
    }
}
