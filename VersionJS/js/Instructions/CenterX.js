class CenterX extends Instruction {

    constructor(object) {
        super(object, "CenterX");
    }

    execute() {
        this.object.setX((WIDTH-this.object.getWidth())/2);
    }
}
