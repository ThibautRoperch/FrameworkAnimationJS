/*
*   This instruction center horizontaly the object atached to it
*/
class CenterX extends Instruction {

    constructor(object) {
        super(object);
    }

    execute() {
        this.object.setX((WIDTH-this.object.getWidth())/2);
    }
}
