
public class InstructionStop extends Instruction {
	
	public InstructionStop(Program prog) {
		super(prog,Instruction.STOP);
	}

	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("STOP ");
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		program.stop_applet();
		return true;
	}

}
