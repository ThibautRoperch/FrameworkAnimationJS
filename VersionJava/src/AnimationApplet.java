import java.applet.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.geom.*;
import java.awt.image.*;
import java.util.*;

import org.xml.sax.Attributes;

public class AnimationApplet extends Applet 
	implements Runnable, KeyListener, MouseListener {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	Thread main_thread;
	
	BufferedImage back_buffer;
	Graphics2D g2d;
	AffineTransform identity=new AffineTransform();
	Random rand=new Random();
	
	ArrayList<AnimatedObject> objects;
	Font font=new Font("courier",Font.BOLD,12);
	
	protected String background_img_name="";
	protected Image background_img=null;
	
	protected Dimension applet_dimension;
	
	protected boolean init_error=false;
	protected Animation animation=null;
	
	protected int start_button_x=-1;
	protected int start_button_y=-1;
	protected String start_button_text="Click me to start";
	protected boolean start_button_present=true;
	
	public boolean getStartButtonPresent() {
		return start_button_present;
	}
	
	public void setStartButton(Attributes attr) {
		String value;
		
		value=attr.getValue("x");
		if (value!=null) start_button_x=Integer.parseInt(value);
		value=attr.getValue("y");
		if (value!=null) start_button_y=Integer.parseInt(value);
		value=attr.getValue("text");
		if (value!=null) start_button_text=value;
		value=attr.getValue("present");
		if (value!=null) start_button_present=Boolean.parseBoolean(value);
	}
	
	private void prepare(Animation animation) {
		Program program;
		
		if (start_button_present) {
			AnimatedText text=new AnimatedText(this,
					"start_button",
					start_button_text,
					new Font("Courier",Font.PLAIN,14),
					5);
			text.setBgcolor(Color.white);
			text.setFgcolor(Color.blue);
			text.setBocolor(Color.black);
			text.setTransparency(false);
			animation.addObject(text);
			program=new Program(this,animation.getObjects());
			if ((start_button_x!=-1) && (start_button_y!=-1)) {
				program.add(new InstructionSetXY(program,
						start_button_x,
						start_button_y));
			} else {
				program.add(new InstructionCenter(program));
			}
			program.add(new InstructionVisible(program,true));
			program.add(new InstructionBlink(program,6,20));
			program.add(new InstructionClick(program));
			program.add(new InstructionVisible(program,false));
			program.add(new InstructionTriggerAll(program,"start"));
			program.setObject(text);
			text.setProgram(program);
		}
		
		AnimatedText text2=new AnimatedText(this,
				"<first_of_text>",
				"(C) 2008 Jean-Michel Richer",
				new Font("Courier",Font.PLAIN,12),
				1);
		text2.setFgcolor(Color.gray);
		animation.addObject(text2);
		program=new Program(this,animation.getObjects());
		program.add(new InstructionCenterX(program));
		program.add(new InstructionSetY(program,
				getHeight()-text2.getHeight()-2));
		program.add(new InstructionVisible(program,true));
		program.add(new InstructionWait(program,"start"));
		//program.add(new InstructionVisible(program,false));
		program.setObject(text2);
		text2.setProgram(program);
		
	}
	
	public void init() {
		init_error=false;
		applet_dimension=new Dimension(this.getWidth(),this.getHeight());
		// build interface
		//System.out.println(getDocumentBase());
		back_buffer=new BufferedImage(applet_dimension.width,
				applet_dimension.height,
				BufferedImage.TYPE_INT_RGB);
		g2d=back_buffer.createGraphics();
		this.addKeyListener(this);
		this.addMouseListener(this);
		
		// load configuration file
		String param_config_file=this.getParameter("config");
		
		SAXAnimationParser parser=new SAXAnimationParser(this);
		animation=parser.parse(getCodeBase()+param_config_file);
		//animation=new Animation();
		if (animation==null) {
			init_error=true;
		}
		
		if (background_img_name.length()!=0) {
			background_img=getImage(getCodeBase(),background_img_name);
		}
		
		prepare(animation);
		animation.orderByLayer();
	}

	public void setBackgroundImgName(String name) {
		//System.out.println("set background img name "+name);
		background_img_name=name;
	}
	
	public void update(Graphics g) {
		if (init_error) {
			g2d.setColor(Color.red);
			g2d.drawString("An error occurred", 20, 20);
		} else {
			g2d.setTransform(identity);
			g2d.setColor(Color.black);
			g2d.fillRect(0, 0, applet_dimension.width, applet_dimension.height);
			if (background_img!=null) {
				g2d.drawImage(background_img, 0, 0, this);
				
			} 
			
			//g2d.setTransform(identity);
			//g2d.setColor(Color.blue);
			//g2d.drawString(background_img_name, 20, 20);
			//g2d.fillRect(200, 200, 200, 200);
			drawAnimatedObjects();
		}
	
		paint(g);
	}
	
	public void paint(Graphics g) {
		g.drawImage(back_buffer, 0, 0, this);
	}
	
	public void drawAnimatedObjects() {
		if (animation==null) return ;
		objects=animation.getObjects();
		for (AnimatedObject obj : objects) {
			//System.out.print("draw "+obj.toString());
			if (obj.getProgram()!=null) {
				//System.out.println("execute for "+obj);
				obj.getProgram().execute();
			}
			if (obj.isVisible()) {
				g2d.setTransform(identity);
				obj.draw(g2d);
				//System.out.println(" at "+obj.getX()+" "+obj.getY());
			}
		}
	}
	
	public void start() {
		main_thread=new Thread(this);
		main_thread.start();
	}
	
	@Override
	public void run() {
		Thread t=Thread.currentThread();
		
		while (t==main_thread) {
			try {
				Thread.sleep(20);
			} catch(InterruptedException e) {
				e.printStackTrace();
			}
			repaint();
		}
	}

	public void stop() {
		main_thread=null;
	}
	
	@Override
	public void keyPressed(KeyEvent e) {
		//System.out.println("key pressed");
		
	}

	@Override
	public void keyReleased(KeyEvent e) {
		//System.out.println("key released");
	}

	@Override
	public void keyTyped(KeyEvent e) {
		// TODO Auto-generated method stub
		int key_code=e.getKeyCode();
		char key_char=e.getKeyChar();
		
//		switch(key_char) {
//		case 'b':
//			ship.incFace_angle(-10);
//			if (ship.getFace_angle()<0) ship.setFace_angle(360-10);
//			break;
//		case 'n':
//			ship.incFace_angle(10);
//			if (ship.getFace_angle()>360) ship.setFace_angle(10);
//			break;
//		case 'a':
//			ship.setMove_angle(ship.getFace_angle()-90);
//			ship.incVelocity_X(calcAngleMoveX(ship.getMove_angle())*0.1);
//			ship.incVelocity_Y(calcAngleMoveY(ship.getMove_angle())*0.1);
//			break;
//		}
		//System.out.println("key typed "+key_code+" "+key_char);
	}
	
	protected double calcAngleMoveX(double angle) {
		return (double) Math.cos(angle*Math.PI/180);
	}

	protected double calcAngleMoveY(double angle) {
		return (double) Math.sin(angle*Math.PI/180);
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		for (AnimatedObject obj : animation.getObjects()) {
			if (obj.isVisible()) {
				if (obj.contains(e.getX(),e.getY(), g2d)) {
					obj.setClicked(true);
				}
			}
		}
		
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseExited(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mousePressed(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}
		
}
