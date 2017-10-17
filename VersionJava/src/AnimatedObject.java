import java.applet.*;
import java.awt.*;

public class AnimatedObject implements Comparable {
	protected String name;
	protected Shape shape;
	protected boolean visible;
	protected double x, y;
	protected double angle;
	protected String state;
	protected boolean clicked;
	protected Program program;
	protected Color bgcolor; // background
	protected Color fgcolor; // foreground
	protected Color bocolor; // border
	protected Applet applet;
	protected int width;
	protected int height;
	protected int layer;
	protected boolean transparency;

	
	public AnimatedObject(Applet applet, String name) {
		this.applet=applet;
		setName(name);
		setShape(null);
		setVisible(false);
		setX(0.0);
		setY(0.0);
		state="created";
		clicked=false;
		program=null;
		bgcolor=Color.black;
		fgcolor=Color.white;
		bocolor=null;
		width=height=0;
		layer=1;
		transparency=false;
	}

	public void setName(String name) {
		this.name=name;
	}
	
	public String getName() {
		return name;
	}
	
	public Shape getShape() {
		return shape;
	}

	public void setShape(Shape shape) {
		this.shape = shape;
	}

	public boolean isVisible() {
		return visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}

	public double getAngle() {
		return angle;
	}

	public void setAngle(double angle) {
		this.angle = angle;
	}

	public void incX(double i) {
		x += i;
	}
	
	public void incX(int i) {
		x += i;
	}
	
	public void incY(double i) {
		y += i;
	}
	
	public void incY(int i) {
		y += i;
	}
	
	public void incAngle(int n) {
		angle+=n;
	}
	
	public void incAngle(double n) {
		angle+=n;
	}
	
	public void draw(Graphics2D g2d) {
		
	}

	public Program getProgram() {
		return program;
	}

	public void setProgram(Program program) {
		this.program = program;
		program.setObject(this);
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public boolean isClicked() {
		return clicked;
	}

	public void setClicked(boolean clicked) {
		this.clicked = clicked;
	}
	
	public boolean contains(int x, int y, Graphics2D g2d) {
		return false;
	}

	public Color getBgcolor() {
		return bgcolor;
	}

	public void setBgcolor(Color bgcolor) {
		this.bgcolor = bgcolor;
	}

	public Color getFgcolor() {
		return fgcolor;
	}

	public void setFgcolor(Color fgcolor) {
		this.fgcolor = fgcolor;
	}

	public Applet getApplet() {
		return applet;
	}

	public void setApplet(Applet applet) {
		this.applet = applet;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public void setProperty(String property, String value) {
		if (property.equalsIgnoreCase("fgcolor")) {
			fgcolor=AnimatedObjectFactory.createColor(value);
		} else if (property.equalsIgnoreCase("bgcolor")) {
			bgcolor=AnimatedObjectFactory.createColor(value);
		} if (property.equalsIgnoreCase("bocolor")) {
			bocolor=AnimatedObjectFactory.createColor(value);
		} if (property.equalsIgnoreCase("layer")) {
			layer=Integer.parseInt(value);
			// need to reorder objects of Animation !!
		} if (property.equalsIgnoreCase("transparency")) {
			transparency=Boolean.parseBoolean(value);
		}
	}

	public Color getBocolor() {
		return bocolor;
	}

	public void setBocolor(Color bocolor) {
		this.bocolor = bocolor;
	}

	public int getLayer() {
		return layer;
	}

	public void setLayer(int layer) {
		this.layer = layer;
	}

	@Override
	public int compareTo(Object o) {
		return layer - ((AnimatedObject)o).layer;
	}

	public boolean isTransparency() {
		return transparency;
	}

	public void setTransparency(boolean transparency) {
		this.transparency = transparency;
	}
}
