
public class InstructionLabel extends Instruction {
	
	protected String label;
	
	public InstructionLabel(Program anim) {
		super(anim,Instruction.LABEL);
	}

	public InstructionLabel(Program anim, String label) {
		super(anim,Instruction.LABEL);
		this.label=label;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("LABEL "+label);
		return buf.toString();
	}
	
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		return true;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
}
