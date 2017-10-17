import java.applet.*;
import java.awt.*;
import java.awt.geom.Point2D;

public class AnimatedPolygon extends AnimatedObject {

	private int[] coord_x;
	private int[] coord_y;
	
	public AnimatedPolygon(Applet applet, String name) {
		super(applet, name);
	}
	
	public AnimatedPolygon(Applet applet, String name, 
			int cx[], int cy[]) {
		super(applet, name);
		coord_x=cx;
		coord_y=cy;
		setShape(new Polygon(cx,cy,cx.length));
		Rectangle r=shape.getBounds();
		width=r.width;
		height=r.height;
	}

	public void draw(Graphics2D g2d) {
		g2d.translate(x, y);
		g2d.rotate(Math.toRadians(angle));
		if (!transparency) {
			g2d.setColor(bgcolor);
			g2d.fill(shape);
		}
		if (fgcolor!=null) {
			g2d.setColor(fgcolor);
			g2d.drawPolygon((Polygon)shape);
		}
	}
	
	public boolean contains(int x, int y, Graphics2D g2d) {
		double xx=(double)x-this.x;
		double yy=(double)y-this.y;
		boolean val=shape.contains(new Point2D.Double((double)xx,(double)yy));
		return val;
	}
	
	public void setProperty(String property, String value) {
		super.setProperty(property, value);
	}
}
