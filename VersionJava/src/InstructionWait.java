
public class InstructionWait extends Instruction {
	
	protected String expected_state;
	
	public InstructionWait(Program anim) {
		super(anim, Instruction.WAIT);
	}

	public InstructionWait(Program anim, String exp) {
		super(anim, Instruction.WAIT);
		expected_state=exp;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("WAIT "+expected_state);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		if (obj.getState().equals(expected_state)) return true;
		return false;
	}
}
