
public class InstructionSetXY extends Instruction {
	
	protected int x, y;
	
	public InstructionSetXY(Program anim) {
		super(anim, Instruction.SETXY);
		x=y=0;
	}

	public InstructionSetXY(Program anim, int x, int y) {
		super(anim, Instruction.SETXY);
		this.x=x;
		this.y=y;
	}
	
	public void set(int x, int y) {
		this.x = x;
		this.y = y;
	}
	
	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("SETXY "+x+" "+y);
		return buf.toString();
	}

	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		obj.setX(x);
		obj.setY(y);
		return true;
	}
}
