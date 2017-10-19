class Center extends Instruction {
    
    construct(object) {
        super(object, "Center")
    }
    
    execute() {
        this.object.setX((WIDTH-this.object.getWidth())/2);
        this.object.setY((HEIGHT-this.object.getHeight())/2);  
    }
}
