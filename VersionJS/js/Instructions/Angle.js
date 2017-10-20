class Angle extends Instruction {
    
    construct(object, value) {
        super(object, "Angle");
        this.value = value;
    }

    execute() {
        this.object.setAngle(this.value);
    }
}
