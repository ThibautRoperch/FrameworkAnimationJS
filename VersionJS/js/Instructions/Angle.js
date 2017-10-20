class Angle extends Instruction {
    
    constructor(object, value) {
        super(object, "Angle");
        this.value = value;
    }

    execute() {
        this.object.setAngle(this.value);
    }
}
