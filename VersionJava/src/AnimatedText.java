import java.applet.*;
import java.awt.*;
import java.util.*;

public class AnimatedText extends AnimatedObject {

	protected String text_lines[];
	protected Font font;
	protected int border;
	protected int text_ascent;
	protected int text_height;
	
	public AnimatedText(Applet applet, String name, 
			String ins, Font f, int border) {
		super(applet,name);
		font=f;
		this.border=border;
		setText(ins);
	}

	public void setText(String text) {
		StringTokenizer tokens=new StringTokenizer(text,"@");
		text_lines=new String[tokens.countTokens()];
		width=0;height=0;
		text_ascent=applet.getFontMetrics(font).getAscent();
		text_height=applet.getFontMetrics(font).getHeight();
		for (int i=0;i<text_lines.length;++i) {
			text_lines[i]=tokens.nextToken();
			int w=applet.getFontMetrics(font).stringWidth(text_lines[i]);
			width=Math.max(width,w);
			height+=text_height;
		}
		width+=border*2;
		height+=border*2;
	}
	
	public void draw(Graphics2D g2d) {
		g2d.translate(x, y);
		g2d.rotate(Math.toRadians(angle));
		if (!transparency) {
			g2d.setColor(bgcolor);
			g2d.fillRect(0,0,
					width,
					height);
		}
		if (bocolor!=null) {
			g2d.setColor(bocolor);
			g2d.drawRect(0, 0, width, height);
		}
		g2d.setColor(fgcolor);
		g2d.setFont(font);
		int xx=border;
		int yy=border;
		for (int i=0;i<text_lines.length;++i) {
			g2d.drawString(text_lines[i], border, yy+text_ascent);
			yy+=text_height;
		}
	}

	public boolean contains(int x, int y, Graphics2D g2d) {
		Rectangle r=new Rectangle((int)Math.round(this.x),
				(int)Math.round(this.y),
				width,
				height);
		g2d.setColor(Color.blue);
		
		return r.contains(x, y);
	}
	
	public void setProperty(String property, String value) {
		if (property.equalsIgnoreCase("text")) {
			setText(value);
		} else {
			super.setProperty(property, value);
		}
	}
}
