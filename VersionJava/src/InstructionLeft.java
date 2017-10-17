
public class InstructionLeft extends Instruction {

	protected int x, dx;
	protected int count;
	
	public InstructionLeft(Program anim) {
		super(anim,Instruction.LEFT);
		x=0;
		dx=0;
		count=0;
	}

	public InstructionLeft(Program anim, int x, int dx) {
		super(anim, Instruction.LEFT);
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
		buf.append("LEFT "+x+" "+dx);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		if (count>0) {
			count-=dx;
			obj.incX(-dx);
			return false;
		} else {
			count=x;
			return true;
		}
	}
}
