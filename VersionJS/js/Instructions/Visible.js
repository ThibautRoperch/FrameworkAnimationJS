class Visible extends Instruction {
	
	constructor(object, visible) {
		super(object);
		this.visible =  visible;
	}

	execute() {
		this.object.setVisible(this.visible);
	}
}
