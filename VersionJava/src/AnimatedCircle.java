import java.applet.*;
import java.awt.*;

public class AnimatedCircle extends AnimatedObject {

	protected int radius;
	
	public AnimatedCircle(Applet applet, String name, int radius) {
		super(applet,name);
		setRadius(radius);
	}
	
	public int getRadius() {
		return radius;
	}

	public void setRadius(int radius) {
		this.radius = radius;
		width=height=radius;
	}

	public void draw(Graphics2D g2d) {
		g2d.translate(x, y);
		g2d.rotate(Math.toRadians(angle));
		g2d.setColor(bgcolor);
		g2d.drawRect(0, 0, width, height);
		g2d.fillOval(0, 0, radius, radius);
		g2d.setColor(fgcolor);
		g2d.drawOval(0,0, radius, radius);
		
	}
	
	public boolean contains(int x, int y, Graphics2D g2d) {
		double xx = this.x + ((double)radius/2) - (double)x;
		double yy = this.y + ((double)radius/2) - (double)y;
		double r=Math.sqrt(xx*xx+yy*yy);
		return (r < (double)radius);
	}
	
	public void setProperty(String property, String value) {
		if (property.equalsIgnoreCase("radius")) {
			setRadius(Integer.parseInt(value));
		} else {
			super.setProperty(property, value);
		}
	}
}
