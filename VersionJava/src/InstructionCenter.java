
public class InstructionCenter extends Instruction {

	public InstructionCenter(Program anim) {
		super(anim,Instruction.CENTER);
	}

	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("CENTER ");
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		int w=obj.getApplet().getSize().width;
		int h=obj.getApplet().getSize().height;
		w=w-obj.getWidth();
		h=h-obj.getHeight();
		obj.setX(w/2);
		obj.setY(h/2);
		return true;
	}
}
