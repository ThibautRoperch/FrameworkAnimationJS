import java.applet.*;
import java.awt.*;

public class AnimatedOval extends AnimatedObject {

	protected int rayon;
	
    public AnimatedOval(Applet applet, String name, String cons) {
		super(applet,name);
		this.rayon=Integer.parseInt(cons);
		width=height=rayon;
	}
	
	public void draw(Graphics2D g2d) {
		g2d.translate(x, y);
		g2d.rotate(Math.toRadians(face_angle));
		g2d.setColor(bgcolor);
		g2d.drawRect(0, 0, width, height);
		g2d.fillOval(0, 0, rayon, rayon);
		g2d.setColor(fgcolor);
		g2d.drawOval(0,0, rayon, rayon);
		
	}

	public boolean isInside(int x, int y, Graphics2D g2d) {
		double xx = this.x + ((double)rayon/2) - (double)x;
		double yy = this.y + ((double)rayon/2) - (double)y;
		System.out.println("xx="+xx);
		System.out.println("yy="+yy);
		double r=Math.sqrt(xx*xx+yy*yy);
		System.out.println("r="+r+",rayon="+rayon);
		return (r < (double)rayon);
	}
}
