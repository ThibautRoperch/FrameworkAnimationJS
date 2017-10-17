import java.applet.*;
import java.awt.*;

public class AnimatedImage extends AnimatedObject {
	
	protected Image image;
	
	public AnimatedImage(Applet applet, String name, Image image,
			int width, int height) {
		super(applet,name);
		this.image=image;
		this.width=width;
		this.height=height;
	}

	public void draw(Graphics2D g2d) {
		g2d.translate(x, y);
		g2d.rotate(Math.toRadians(angle));
		g2d.drawImage(image,0,0,applet);
	}
	
	public boolean isInside(int x, int y, Graphics2D g2d) {
		Rectangle rect=new Rectangle((int)Math.round(this.x),
				(int)Math.round(this.y),
				width,height);
		return rect.contains(x, y);
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}
}
