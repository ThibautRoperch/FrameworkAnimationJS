class SetProperty extends Instruction {
    constructor(object, property, value) {
        this.object = object;
        this.type = "SetProperty";
        this.value = value;
        this.property = property;
    }
    execute() {
        switch(property) {
            case "x":
                this.object.setX(this.value);
                break;

            case "y":
                this.object.setX(this.value);
                break;


            case "visible":
                this.object.setText(this.value);
                break;

            case "text":
                this.object.setText(this.value);
                break;

            case "fgcolor":
                this.object.setFgcolor(this.value);
                break;

            case "bgcolor":
                this.object.setBgcolor(this.value);
                break;

            case "bocolor":
                this.object.setBocolor(this.value);
                break;

        }
    }
}
