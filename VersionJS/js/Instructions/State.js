/*
*   T
*/
class State extends Instruction {

    constructor(object, value) {
        super(object);
        this.value = value;
    }
    
    execute() {
        this.object.setState(value);
    }
}
