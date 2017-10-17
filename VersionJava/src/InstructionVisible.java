
public class InstructionVisible extends Instruction {
	
	protected boolean visible;
	
	public InstructionVisible(Program anim) {
		super(anim, Instruction.VISIBLE);
		visible=false;
	}

	public InstructionVisible(Program anim, boolean b) {
		super(anim, Instruction.VISIBLE);
		visible=b;
	}
	
	public boolean isVisible() {
		return visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("VISIBLE "+visible);
		return buf.toString();
	}

	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		obj.setVisible(visible);
		return true;
	}
}
