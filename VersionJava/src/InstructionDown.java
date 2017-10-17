
public class InstructionDown extends Instruction {

	protected int y, dy;
	protected int count;
	
	public InstructionDown(Program anim) {
		super(anim,Instruction.DOWN);
		y=0;
		dy=0;
		count=0;
	}

	public InstructionDown(Program anim, int y, int dy) {
		super(anim, Instruction.DOWN);
		set(y,dy);
	}
	
	public void set(int y, int dy) {
		this.y = y;
		this.dy = dy;
		this.count=y;
	}
	
	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}
	
	public int getDy() {
		return dy;
	}

	public void setDy(int dy) {
		this.dy = dy;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("DOWN "+y+" "+dy);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		if (count>0) {
			count-=dy;
			obj.incY(dy);
			return false;
		} else {
			count=y;
			return true;
		}
	}
}
