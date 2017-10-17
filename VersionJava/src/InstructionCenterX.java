
public class InstructionCenterX extends Instruction {

	public InstructionCenterX(Program anim) {
		super(anim,Instruction.CENTERX);
	}

	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("CENTERX ");
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		int w=obj.getApplet().getSize().width;
		w=w-obj.getWidth();
		obj.setX(w/2);
		return true;
	}
}
