
public class InstructionBlink extends Instruction {

	protected int value;
	protected int count;
	protected int delay;
	protected int ddddd;
	
	public InstructionBlink(Program anim) {
		super(anim, Instruction.BLINK);
		value=count=delay=0;
	}
	
	public InstructionBlink(Program anim, int value, int delay) {
		super(anim, Instruction.BLINK);
		count=this.value=Math.abs(value);
		this.delay=ddddd=Math.abs(delay);
	}

	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("BLINK "+value);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		//System.out.println("BLINK "+count+" "+ddddd);
		if (count>0) {
			if (ddddd>0) {
				--ddddd;
			} else {
				ddddd=delay;
				--count;
				obj.setVisible(!obj.isVisible());
			}
			return false;
		} else {
			count=value;
			ddddd=delay;
			return true;
		}
	}
}
