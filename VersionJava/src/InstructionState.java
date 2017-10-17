
public class InstructionState extends Instruction {
	
	protected String state;
	
	public InstructionState(Program anim) {
		super(anim, Instruction.STATE);
		this.state="";
	}
	
	public InstructionState(Program anim, String state) {
		super(anim, Instruction.STATE);
		this.state=state;
	}

	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("STATE "+state);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		obj.setState(state);
		return true;
	}
}
