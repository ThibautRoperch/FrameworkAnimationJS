
public class InstructionGoto extends Instruction {
	
	public String label;
	
	public InstructionGoto(Program anim) {
		super(anim,Instruction.GOTO);
	}
	
	public InstructionGoto(Program anim, String label) {
		super(anim,Instruction.GOTO);
		this.label=label;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("GOTO "+label);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		int ip=program.findLabel(label);
		if (ip!=0) program.goto_instruction(ip);
		return true;
	}
	

}
