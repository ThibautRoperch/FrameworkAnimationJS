

public abstract class Instruction {

	public final static int NONE=0;
	public final static int SETX=1;
	public final static int SETY=2;
	public final static int SETXY=3;
	public final static int MOVETO=4;
	public final static int WAIT=5;
	public final static int VISIBLE=6;
	public final static int SLEEP=7;
	public final static int GOTO=8;
	public final static int CLICK=9;
	public final static int LABEL=10;
	public final static int TRIGGER=11;
	public final static int STATE=12;
	public final static int UP=13;
	public final static int DOWN=14;
	public final static int LEFT=15;
	public final static int RIGHT=16;
	public final static int ANGLE=17;
	public final static int TRIGGERALL=18;
	public final static int CENTER=19;
	public final static int CENTERX=20;
	public final static int CENTERY=21;
	public final static int SETPROPERTY=22;
	public final static int BLINK=23;
	public final static int STOP=24;
	
	protected int type;
	protected Program program;

	
	public Instruction(Program prog, int type) {
		this.program=prog;
		this.type=type;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}
	
	private static String InstructionLabels[] = {
			"#<none",
			"SETX", "SETY", "SETXY", "MOVETO",
			"WAIT", "VISIBLE", "SLEEP",
			"GOTO", "CLICK", "LABEL", "TRIGGER",
			"STATE",
			"UP", "DOWN", "LEFT", "RIGHT",
			"ANGLE",
			"TRIGGERALL", "CENTER", "CENTERX", "CENTERY",
			"SETPROPERTY",
			"BLINK", "STOP"
	};
	
	public static int findInstructionType(String s) {
		for (int i=0; i<InstructionLabels.length; ++i) {
			if (s.equalsIgnoreCase(InstructionLabels[i])) return i;
		}
		return 0;
	}
	
	public boolean execute(AnimatedObject obj) {
		// not implemented, return true if completed
		return true;
	}
	

}
