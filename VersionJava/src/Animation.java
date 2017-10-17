
import java.util.*;

public class Animation {

	protected ArrayList<AnimatedObject> objects;

	public Animation() {
		objects=new ArrayList<AnimatedObject>();
	}
	
	ArrayList<AnimatedObject> getObjects() {
		return objects;
	}
	
	public void addObject(AnimatedObject obj) {
		objects.add(obj);
	}
	
	public AnimatedObject findObjectByName(String name) {
		for(AnimatedObject obj : objects) {
			if (obj.getName().equals(name)) {
				return obj;
			}
		}
		return null;
	}
	
	public void assinProgramTo(String name, Program prog) {
		for(AnimatedObject obj : objects) {
			if (obj.getName().equals(name)) {
				obj.setProgram(prog);
			}
		}
	}
	
	public String toString() {
		StringBuffer buf=new StringBuffer();
		buf.append("Animation:\n");
		for(AnimatedObject obj : objects) {
			buf.append("=================\n");
			buf.append("Object : "+obj.getName()+"\n");
			if (obj.getProgram()!=null) {
				buf.append("\thas program of length "+
						obj.getProgram().getNbrInstructions()+"\n");
				buf.append(obj.getProgram().toString());
			}
		}
		return buf.toString();
	}
	
	public void orderByLayer() {
		Collections.sort(objects);
	}
}
