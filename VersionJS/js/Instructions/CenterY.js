/**
 * This instruction center verticaly the object atached to it
 */

class CenterY extends Instruction {

	constructor(object) {
		super(object);
	}

	execute() {
		this.object.setY(HEIGHT-this.object.getHeight());
	}

}
