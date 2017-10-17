
public class InstructionSetProperty extends Instruction {

	protected String object_name;
	protected String property;
	protected String value;
	
	public InstructionSetProperty(Program anim) {
		super(anim, Instruction.SETPROPERTY);
	}

	public InstructionSetProperty(Program anim, 
			String obj, String property, String value) {
		super(anim, Instruction.SETPROPERTY);
		object_name=obj;
		this.property=property;
		this.value=value;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("SETPROPERTY "+object_name+" "+property+" "+value);
		return buf.toString();
	}
	
	public boolean execute(AnimatedObject obj) {
		obj.setClicked(false);
		//System.out.println(this);
		AnimatedObject obj2=program.getObject(object_name);
		if (obj2!=null) {
			obj2.setProperty(property,value);
		}
		return true;
	}
}
