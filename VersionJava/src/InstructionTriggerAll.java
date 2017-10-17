import java.util.*;

public class InstructionTriggerAll extends Instruction {
	
	protected String state;
	
	public InstructionTriggerAll(Program anim) {
		super(anim,Instruction.TRIGGERALL);
		state="";
	}

	public InstructionTriggerAll(Program anim, String state) {
		super(anim,Instruction.TRIGGERALL);
		this.state=state;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("TRIGGERALL "+state);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		ArrayList<AnimatedObject> l=program.getObjects();
		for (AnimatedObject m : l) {
			if (m!=obj) {
				m.setState(state);
			}
		}
		return true;
	}
}
