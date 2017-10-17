
public class InstructionCenterY extends Instruction {

	public InstructionCenterY(Program anim) {
		super(anim,Instruction.CENTERY);
	}

	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("CENTERY ");
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		int h=obj.getApplet().getSize().height;
		h=h-obj.getHeight();
		obj.setY(h/2);
		return true;
	}
}
