
public class InstructionClick extends Instruction {
	
	public InstructionClick(Program anim) {
		super(anim,Instruction.CLICK);
	}

	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("CLICK ");
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		if (obj.isClicked()) {
			obj.setClicked(false);
			return true;
		}
		return false;
	}
}
