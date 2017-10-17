import java.util.*;
import java.applet.*;

public class Program {

	protected ArrayList<Instruction> instructions;
	protected int instruction_pointer;
	protected AnimatedObject object;
	protected ArrayList<AnimatedObject> others;
	protected Applet applet;
	
	public Program(Applet applet, ArrayList<AnimatedObject> arr) {
		instructions=new ArrayList<Instruction>();
		instruction_pointer=0;
		object=null;
		others=arr;
		this.applet=applet;
	}
	
	public int getNbrInstructions() {
		return instructions.size();
	}
	
	public void setObject(AnimatedObject obj) {
		object=obj;
	}
	
	public void add(Instruction m) {
		instructions.add(m);
	}
	
	public Instruction get(int n) {
		return instructions.get(n);
	}
	
	public void reset() {
		instruction_pointer=0;
	}
	
	public void nextInstruction() {
		if (instruction_pointer<instructions.size()) ++instruction_pointer;
	}
	
	public void goto_instruction(int n) {
		instruction_pointer=n;
	}
	
	public void stop_applet() {
		applet.stop();
	}
	
	public int findLabel(String label) {
		for (int i=0; i<instructions.size();++i) {
			Instruction m=instructions.get(i);
			if (m instanceof InstructionLabel) {
				if (((InstructionLabel)m).getLabel().equals(label)) {
					return  i;
				}
			}
		}
		return 0;
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		for(Instruction m : instructions) {
			buf.append(m.toString()+'\n');
		}
		return buf.toString();
	}
	
	public void execute() {
		if (instruction_pointer>=instructions.size()) return ;
		if (object==null) return ;
		Instruction instruction=instructions.get(instruction_pointer);
		if (instruction.execute(object)==true) {
			nextInstruction();
		}
	}
	
	AnimatedObject getObject(String name) {
		for (AnimatedObject obj : others) {
			if (obj.getName().equals(name)) return obj;
		}
		return null;
	}
	
	ArrayList<AnimatedObject> getObjects() {
		return others;
	}
}
