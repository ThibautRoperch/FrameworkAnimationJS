import java.applet.*;
import java.awt.*;
import java.awt.geom.*;

public class AnimatedRectangle extends AnimatedObject {

	
	public AnimatedRectangle(Applet applet, String name, 
			int width, int height) {
		super(applet,name);
		this.width=width;
		this.height=height;
		shape=new Rectangle2D.Double(0,0,(double)width,(double)height);
	}
	
	public void draw(Graphics2D g2d) {
		g2d.translate(x, y);
		g2d.rotate(Math.toRadians(angle));
		g2d.setColor(bgcolor);
		g2d.fillRect(0,0,width,height);
		if (bocolor!=null) {
			g2d.setColor(bocolor);
			g2d.drawRect(0, 0, width, height);
		}
		g2d.setColor(fgcolor);
		g2d.drawRect(0,0,width,height);
	}

	public boolean contains(int x, int y, Graphics2D g2d) {
		Rectangle rect=new Rectangle((int)Math.round(this.x),
				(int)Math.round(this.y),
				width,height);
		return rect.contains(x, y);
	}
	
	public void setProperty(String property, String value) {
		if (property.equalsIgnoreCase("width")) {
			width=Integer.parseInt(value);
		} else if (property.equalsIgnoreCase("height")) {
			height=Integer.parseInt(value);
		} else {
			super.setProperty(property, value);
		}
	}
}
