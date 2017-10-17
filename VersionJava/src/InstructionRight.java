
public class InstructionRight extends Instruction {
	

	protected int x, dx;
	protected int count;
	
	public InstructionRight(Program anim) {
		super(anim,Instruction.RIGHT);
		x=0;
		dx=0;
		count=0;
	}

	public InstructionRight(Program anim, int x, int dx) {
		super(anim, Instruction.RIGHT);
		set(x,dx);
	}
	
	public void set(int x, int dx) {
		this.x = x;
		this.dx = dx;
		this.count=x;
	}
	
	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}
	
	public int getDx() {
		return dx;
	}

	public void setDx(int dx) {
		this.dx = dx;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("RIGHT "+x+" "+dx);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		if (count>0) {
			count-=dx;
			obj.incX(dx);
			return false;
		} else {
			count=x;
			return true;
		}
	}
}
