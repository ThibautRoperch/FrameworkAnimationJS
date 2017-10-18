class Visible extends Instruction{
    constructor(object, visible) {
        super(object, "Visible");
        this.visible =  visible;
    }
    execute() {
        this.object.setVisible(this.visible);
    }
}
