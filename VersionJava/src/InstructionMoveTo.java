
public class InstructionMoveTo extends Instruction {

	protected int x, y, dx, dy;
	protected int delay;
	protected int count;
	
	public InstructionMoveTo(Program anim) {
		super(anim,Instruction.MOVETO);
		x=y=0;
		dx=dy=0;
		delay=count=0;
	}

	public InstructionMoveTo(Program anim, int x, int y, int dx, int dy, int d) {
		super(anim, Instruction.MOVETO);
		set(x,y,dx,dy,d);
	}
	
	public void set(int x, int y, int dx, int dy,int d) {
		this.x= x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.delay=d;
		this.count=d;
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

	public int getDx() {
		return dx;
	}

	public void setDx(int dx) {
		this.dx = dx;
	}

	public int getDy() {
		return dy;
	}

	public void setDy(int dy) {
		this.dy = dy;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("MOVETO "+x+" "+y+" "+dx+" "+dy+" "+delay);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		if ((obj.getX()!=x) || (obj.getY()!=y)) {
			if (count>0) {
				--count;
			} else {
				obj.incX(dx);
				obj.incY(dy);
				count=delay;
			}
			return false;
		} else {
			return true;
		}
	}
}
