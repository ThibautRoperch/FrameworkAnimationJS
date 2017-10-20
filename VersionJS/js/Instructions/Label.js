class Label extends Instruction {
    
        constructor(object, value) {
            super(object);
            this.value = value;
        }
        
        getValue() {
            return this.value;
        }

        execute() {}
    
    }