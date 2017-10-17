
public class InstructionTrigger extends Instruction {
	
	protected String object_name;
	protected String command;
	
	public InstructionTrigger(Program anim) {
		super(anim, Instruction.TRIGGER);
	}

	public InstructionTrigger(Program anim, String obj, String cmd) {
		super(anim, Instruction.TRIGGER);
		object_name=obj;
		command=cmd;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("TRIGGER "+object_name+" "+command);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		AnimatedObject obj2=program.getObject(object_name);
		if (obj2!=null) {
			obj2.setState(command);
		}
		return true;
	}
	
}
