import java.applet.*;
import java.awt.*;
import java.awt.geom.*;

public class AnimatedEllipse extends AnimatedObject {

	
	public AnimatedEllipse(Applet applet, String name,
			int width, int height) {
		super(applet,name);
		this.width=width;
		this.height=height;
		shape=new Ellipse2D.Double(x,y,(double)width,(double)height);
	}
	
	public void draw(Graphics2D g2d) {
		g2d.translate(x, y);
		g2d.rotate(Math.toRadians(angle));
		
		if (!transparency) {
			g2d.setColor(bgcolor);
			g2d.fill(shape);
		}
		
		g2d.setColor(fgcolor);
		g2d.draw(shape);
	}

	public boolean contains(int x, int y, Graphics2D g2d) {
		double xx = this.x + ((double)width) - (double)x;
		double yy = this.y + ((double)height) - (double)y;
		//System.out.println("xx="+xx);
		//System.out.println("yy="+yy);
		//System.out.println("inside ellipse ?"+shape.contains(new Point2D.Double(x,y)));
		return shape.contains(new Point2D.Double(xx,yy));
	}
	
	public void setProperty(String property, String value) {
		super.setProperty(property, value);
	}
	
	
}
