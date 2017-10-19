/*
*   T
*/
class State extends Instruction {

    construct(object, value) {
        super(object , "State");
        this.value = value;
    }
    
    execute() {
        this.object.setState(value);
    }
}
