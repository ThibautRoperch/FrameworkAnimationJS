import java.util.*;
import org.xml.sax.Attributes;

public class InstructionFactory {

	private static void checkNbrParams(int n,StringTokenizer t) throws Exception {
		if (t.countTokens()!=n) throw new Exception("bad number of arguments");
	}
	
	public static Instruction create(Program prog, int type, StringTokenizer tokens)  throws Exception {
		Instruction movement=null;
		
		switch(type) {
		case Instruction.SETX:
			checkNbrParams(1,tokens);
			movement=new InstructionSetX(prog, Integer.parseInt(tokens.nextToken()));
			break;
			
		case Instruction.SETY:
			checkNbrParams(1,tokens);
			movement=new InstructionSetY(prog, Integer.parseInt(tokens.nextToken()));
			break;
			
		case Instruction.SETXY:
			checkNbrParams(2,tokens);
			movement=new InstructionSetXY(prog, Integer.parseInt(tokens.nextToken()),
					Integer.parseInt(tokens.nextToken()));
			break;	
			
		case Instruction.MOVETO:
			checkNbrParams(5,tokens);
			movement=new InstructionMoveTo(prog, Integer.parseInt(tokens.nextToken()),
					Integer.parseInt(tokens.nextToken()),
					Integer.parseInt(tokens.nextToken()),
					Integer.parseInt(tokens.nextToken()),
					Integer.parseInt(tokens.nextToken()));
			break;	
			
		case Instruction.WAIT:
			checkNbrParams(1,tokens);
			movement=new InstructionWait(prog, tokens.nextToken());
			break;
			
		case Instruction.VISIBLE:
			checkNbrParams(1,tokens);
			movement=new InstructionVisible(prog, 
					Boolean.parseBoolean(tokens.nextToken()));
			break;
		
		case Instruction.LABEL:
			checkNbrParams(1,tokens);
			movement=new InstructionLabel(prog, tokens.nextToken());
			break;
			
		case Instruction.GOTO:
			checkNbrParams(1,tokens);
			movement=new InstructionGoto(prog, tokens.nextToken());
			break;
			
		case Instruction.CLICK:
			checkNbrParams(0,tokens);
			movement=new InstructionClick(prog);
			break;
			
		case Instruction.TRIGGER:
			checkNbrParams(2,tokens);
			movement=new InstructionTrigger(prog,
						tokens.nextToken(),
						tokens.nextToken());
			break;	
		
		case Instruction.STATE:
			checkNbrParams(1,tokens);
			movement=new InstructionState(prog,
					tokens.nextToken());
			break;
			
		case Instruction.UP:
			checkNbrParams(2,tokens);
			movement=new InstructionUp(prog,
					Integer.parseInt(tokens.nextToken()),
					Integer.parseInt(tokens.nextToken()));
			break;
		}
		
		return movement;
	}
	
	private static void checkNbrParams(int n, Attributes t) throws Exception {
		if (t.getLength()!=n) throw new Exception("bad number of arguments");
	}
	
	public static Instruction createInstruction(Program prog, 
			int type, Attributes attr) 
	throws Exception {
		Instruction instruction=null;
		
		switch(type) {
		case Instruction.SETX:
			checkNbrParams(1,attr);
			instruction=new InstructionSetX(prog, 
					Integer.parseInt(attr.getValue("x")));
			break;
			
		case Instruction.SETY:
			checkNbrParams(1,attr);
			instruction=new InstructionSetY(prog, 
					Integer.parseInt(attr.getValue("y")));
			break;
			
		case Instruction.SETXY:
			checkNbrParams(2,attr);
			instruction=new InstructionSetXY(prog, 
					Integer.parseInt(attr.getValue("x")),
					Integer.parseInt(attr.getValue("y")));
			break;	
			
		case Instruction.MOVETO:
			checkNbrParams(5,attr);
			instruction=new InstructionMoveTo(prog, 
					Integer.parseInt(attr.getValue("x")),
					Integer.parseInt(attr.getValue("y")),
					Integer.parseInt(attr.getValue("dx")),
					Integer.parseInt(attr.getValue("dy")),
					Integer.parseInt(attr.getValue("delay")));
			break;	
			
		case Instruction.WAIT:
			checkNbrParams(1,attr);
			instruction=new InstructionWait(prog, 
					attr.getValue("value"));
			break;
			
		case Instruction.VISIBLE:
			checkNbrParams(1,attr);
			instruction=new InstructionVisible(prog, 
					Boolean.parseBoolean(attr.getValue("value")));
			break;
			
		case Instruction.LABEL:
			checkNbrParams(1,attr);
			instruction=new InstructionLabel(prog, 
					attr.getValue("value"));
			break;
			
		case Instruction.GOTO:
			checkNbrParams(1,attr);
			instruction=new InstructionGoto(prog, 
					attr.getValue("value"));
			break;
			
		case Instruction.CLICK:
			checkNbrParams(0,attr);
			instruction=new InstructionClick(prog);
			break;
		
		case Instruction.TRIGGER:
			checkNbrParams(2,attr);
			instruction=new InstructionTrigger(prog,
					attr.getValue("object"),
					attr.getValue("value"));
			break;	
		
		case Instruction.STATE:
			checkNbrParams(1,attr);
			instruction=new InstructionState(prog,
					attr.getValue("value"));
			break;	
		
		case Instruction.UP:
			checkNbrParams(2,attr);
			instruction=new InstructionUp(prog,
					Integer.parseInt(attr.getValue("y")),
					Integer.parseInt(attr.getValue("dy")));
			break;
			
		case Instruction.DOWN:
			checkNbrParams(2,attr);
			instruction=new InstructionDown(prog,
					Integer.parseInt(attr.getValue("y")),
					Integer.parseInt(attr.getValue("dy")));
			break;
			
		case Instruction.LEFT:
			checkNbrParams(2,attr);
			instruction=new InstructionLeft(prog,
					Integer.parseInt(attr.getValue("x")),
					Integer.parseInt(attr.getValue("dx")));
			break;
		
		case Instruction.RIGHT:
			checkNbrParams(2,attr);
			instruction=new InstructionRight(prog,
					Integer.parseInt(attr.getValue("x")),
					Integer.parseInt(attr.getValue("dx")));
			break;
			
		case Instruction.ANGLE:
			checkNbrParams(1,attr);
			instruction=new InstructionAngle(prog,
					Integer.parseInt(attr.getValue("degrees")));
			break;
			
		case Instruction.TRIGGERALL:
			checkNbrParams(1,attr);
			instruction=new InstructionTriggerAll(prog,
					attr.getValue("degrees"));
			break;	
		
		case Instruction.CENTER:
			checkNbrParams(0,attr);
			instruction=new InstructionCenter(prog);
			break;
			
		case Instruction.CENTERX:
			checkNbrParams(0,attr);
			instruction=new InstructionCenterX(prog);
			break;
			
		case Instruction.CENTERY:
			checkNbrParams(0,attr);
			instruction=new InstructionCenterY(prog);
			break;	
			
		case Instruction.SLEEP:
			checkNbrParams(1,attr);
			instruction=new InstructionSleep(prog,
					Integer.parseInt(attr.getValue("value")));
			break;
			
		case Instruction.SETPROPERTY:
			checkNbrParams(3,attr);
			instruction=new InstructionSetProperty(prog,
					attr.getValue("object"),
					attr.getValue("property"),
					attr.getValue("value"));
			break;
			
		case Instruction.BLINK:
			checkNbrParams(2,attr);
			instruction=new InstructionBlink(prog,
					Integer.parseInt(attr.getValue("times")),
					Integer.parseInt(attr.getValue("delay")));
			break;	
		
		case Instruction.STOP:
			checkNbrParams(0,attr);
			instruction=new InstructionStop(prog);
			break;	
		}
		return instruction;
	}
}
