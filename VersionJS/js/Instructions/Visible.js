class Visible extends Instruction{
    constructor(object, visibility) {
        super(object, "Visible");
        this.visibility =  visibility;
    }
    execute() {
        this.object.setVisibility(this.visibility);
    }
}
