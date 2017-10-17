
public class InstructionAngle extends Instruction {
	
	int angle;
	
	public InstructionAngle(Program anim) {
		super(anim,Instruction.ANGLE);
		angle=0;
	}

	public InstructionAngle(Program anim, int angle) {
		super(anim, Instruction.ANGLE);
		this.angle=angle;
	}

	public int getAngle() {
		return angle;
	}

	public void setAngle(int angle) {
		this.angle = angle;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("ANGLE "+angle);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		obj.setAngle(angle);
		return true;
	}

}
