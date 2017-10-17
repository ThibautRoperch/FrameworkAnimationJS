
public class InstructionSleep extends Instruction {

	protected int value;
	protected int count;
	
	public InstructionSleep(Program anim) {
		super(anim, Instruction.SLEEP);
		this.value=this.count=0;
	}
	
	public InstructionSleep(Program anim, int value) {
		super(anim, Instruction.SLEEP);
		count=this.value=Math.abs(value);
	}

	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("SLEEP "+value);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		if (count>0) {
			--count;
			return false;
		} else {
			count=value;
			return true;
		}
	}
}
