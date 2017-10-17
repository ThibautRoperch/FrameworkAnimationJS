
public class InstructionSetX extends Instruction {
	
	protected int x;
	
	public InstructionSetX(Program anim) {
		super(anim, Instruction.SETX);
		x=0;
	}
	
	public InstructionSetX(Program anim, int x) {
		super(anim, Instruction.SETX);
		this.x=x;
	}
	
	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("SETX "+x);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		obj.setX(x);
		return true;
	}
}
