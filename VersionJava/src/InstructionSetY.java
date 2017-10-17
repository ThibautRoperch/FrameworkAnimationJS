
public class InstructionSetY extends Instruction {

	protected int y;

	public InstructionSetY(Program anim) {
		super(anim, Instruction.SETY);
		y=0;
	}

	public InstructionSetY(Program anim, int y) {
		super(anim, Instruction.SETY);
		this.y=y;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}


	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("SETY "+y);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		obj.setY(y);
		return true;
	}
}

