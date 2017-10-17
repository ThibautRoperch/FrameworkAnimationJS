import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;

import org.xml.sax.helpers.DefaultHandler;

public class SAXAnimationParser  extends DefaultHandler {
	
	protected Animation animation;
	protected String value;
	protected String program_assigned_to;
	protected Program program=null;
	protected AnimationApplet applet;
	protected Attributes attributes;
	
	public SAXAnimationParser(AnimationApplet applet) {
		animation=null;
		this.applet=applet;
	}

	private int isInstruction(String text) {
		return Instruction.findInstructionType(text);
	}
	
	//Event Handlers
	public void startElement(String uri, 
			String localName, 
			String qName, 
			Attributes attributes) throws SAXException {
		int instruction_type;
		
		
		this.attributes=attributes;
		
		if (qName.equalsIgnoreCase("background")) {
			// nothing
		} else if (qName.equalsIgnoreCase("object")) {
			//
		} else if (qName.equalsIgnoreCase("program")) {
			program_assigned_to=attributes.getValue("assigned_to");
			program=new Program(applet, animation.getObjects());
			if (applet.getStartButtonPresent()) {
				program.add(new InstructionWait(program,"start"));
			}
		} 
		
	}

	public void endElementObject_(String qName) throws SAXException {
		try {
			if (qName.equals("object_text")) {
				animation.addObject(AnimatedObjectFactory.create_text(applet,value, attributes));
			} else if (qName.equals("object_image")) {
				animation.addObject(AnimatedObjectFactory.create_image(applet,value, attributes));
			} else if (qName.equals("object_rectangle")) {
				animation.addObject(AnimatedObjectFactory.create_rectangle(applet,value, attributes));
			} else if (qName.equals("object_polygon")) {
				animation.addObject(AnimatedObjectFactory.create_polygon(applet,value, attributes));
			} else if (qName.equals("object_circle")) {
				animation.addObject(AnimatedObjectFactory.create_circle(applet,value, attributes));
			} else if (qName.equals("object_ellipse")) {
				animation.addObject(AnimatedObjectFactory.create_ellipse(applet,value, attributes));
			} else if (qName.equals("object_extern")) {
				animation.addObject(AnimatedObjectFactory.create_extern(applet,value, attributes));
			}
		} catch(Exception e) {
			e.printStackTrace();
			throw new SAXException();
		}
	}
	
	public void endElementInstruction(int instruction) throws SAXException {
		try {
			Instruction i=InstructionFactory.createInstruction(program, 
					instruction, attributes);
			program.add(i);
		} catch(Exception e) {
			e.printStackTrace();
			throw new SAXException();
		}
	}
	
	public void endElement(String uri, 
			String localName, 
			String qName) throws SAXException {
		int instruction=0;
		
		qName=qName.toLowerCase();
		if (qName.startsWith("object_")) {
			endElementObject_(qName);
		} else if (qName.equals("background")) {
			applet.setBackgroundImgName(value);
		} else if ((instruction=isInstruction(qName))!=0) {
			endElementInstruction(instruction);
		} else if (qName.equals("program")) {
			AnimatedObject obj=animation.findObjectByName(program_assigned_to);
			if (obj!=null) {
				obj.setProgram(program);
			}
		} else if (qName.equals("start_button")) {
			applet.setStartButton(attributes);
		}
			
	}
	
	public void characters(char[] ch, 
			int start, 
			int length) throws SAXException {
		value=new String(ch,start,length);
	}

	

	private void parse_document(String file_name) {
		SAXParserFactory spf = SAXParserFactory.newInstance();
		try {

			//get a new instance of parser
			SAXParser sp = spf.newSAXParser();
			sp.parse(file_name, this);

		}catch(SAXException se) {
			se.printStackTrace();
			animation=null;
		}catch(ParserConfigurationException pce) {
			pce.printStackTrace();
			animation=null;
		}catch (IOException ie) {
			ie.printStackTrace();
			animation=null;
		}
	}	

	public Animation parse(String file_name) {
		animation=new Animation();
		parse_document(file_name);
		return animation;
	}


}
