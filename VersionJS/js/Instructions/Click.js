class Click extends Instruction {

    constructor(object) {
        super(object, "Click");
    }

    execute() {
        this.object.setState("waiting_click");
    }
}
