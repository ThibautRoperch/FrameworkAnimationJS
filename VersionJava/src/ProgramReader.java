import java.io.*;
import java.util.*;
import java.applet.*;

public class ProgramReader {
	
	
	public static Program load(Applet applet, ArrayList<AnimatedObject> arr, String file_name) {
		BufferedReader input;
		Program anim=new Program(applet,arr);
		StringTokenizer token;
		
		try {
			//System.err.println("/home/richer/workspace/Animation/" + file_name);
			input = new BufferedReader(new FileReader("/home/richer/workspace/Animation/" + file_name));
			String line = input.readLine();
			while (line != null) {
				line=line.trim();
				if (line.length()==0) {
					
				} else if (line.startsWith( "#" )) {
					// comment
				} else {
					token=new StringTokenizer(line);
					int type=Instruction.findInstructionType(token.nextToken().toUpperCase());
					if (type != Instruction.NONE) {
						anim.add(InstructionFactory.create(anim,type,token));
					}
					
				}
				line = input.readLine();
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return anim;
	}
}
