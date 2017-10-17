import java.applet.*;
import java.awt.*;
import java.util.*;
import org.xml.sax.Attributes;
import java.lang.reflect.*;

public class AnimatedObjectFactory {

	public static Color createColor(String txt)
	throws IllegalArgumentException {
		StringTokenizer tokens=new StringTokenizer(txt," ,");
		if (tokens.countTokens()!=3) throw new IllegalArgumentException();
		Color color=new Color(Integer.parseInt(tokens.nextToken()),
				Integer.parseInt(tokens.nextToken()),
				Integer.parseInt(tokens.nextToken()));
		return color;
	}
	
	private static void parse_colors(AnimatedObject obj, Attributes attr) {
		
		String fgcolor=attr.getValue("fgcolor");
		if (fgcolor!=null) {
			obj.setFgcolor(createColor(fgcolor));
		}
		String bgcolor=attr.getValue("bgcolor");
		if (bgcolor!=null) {
			obj.setBgcolor(createColor(bgcolor));
		}
		String bocolor=attr.getValue("bocolor");
		if (bocolor!=null) {
			obj.setBocolor(createColor(bocolor));
		}
	}
	
	private static void parse_layer(AnimatedObject obj, Attributes attr) {
		
		String layer=attr.getValue("layer");
		if (layer!=null) {
			obj.setLayer(Integer.parseInt(layer));
		}
	}
	
	private static void parse_transparency(AnimatedObject obj, 
			Attributes attr) {
		
		String tr=attr.getValue("transparency");
		if (tr!=null) {
			obj.setTransparency(Boolean.parseBoolean(tr));
		}
	}

	public static AnimatedObject create_text(Applet applet, String name,
			Attributes attr) throws Exception {
		AnimatedObject object=null;
		
		System.out.println("TEXT");
		
		String text=attr.getValue("text");
		String font_info=attr.getValue("font");
		StringTokenizer tokens=new StringTokenizer(font_info,",");
		
		if (tokens.countTokens()!=3) throw new IllegalArgumentException();
		
		String font_family=tokens.nextToken();
		int font_size=Integer.parseInt(tokens.nextToken());
		String font_weight=tokens.nextToken();
		
		int font_weight_int=Font.PLAIN;
		if (font_weight.equalsIgnoreCase("bold")) {
			font_weight_int=Font.BOLD;
		} else if (font_weight.equalsIgnoreCase("italic")) {
			font_weight_int=Font.ITALIC;
		}
		
		String border=attr.getValue("border");
		int border_value=2;
		if (border!=null) {
			border_value=Integer.parseInt(border);
		}
		
		object=new AnimatedText(applet,name,text,
				new Font(font_family,font_weight_int, font_size ),
				border_value);
		
		String transparency=attr.getValue("transparency");
		boolean value=true;
		if (transparency!=null) {
			value=Boolean.parseBoolean(transparency);
			((AnimatedText)object).setTransparency(value);
		}
		
		parse_colors(object, attr);
		parse_layer(object,attr);
		parse_transparency(object, attr);
		return object;
	}
	
	public static AnimatedObject create_image(Applet applet, String name,
			Attributes attr) throws Exception {
		AnimatedObject object=null;
		
		String image_name=attr.getValue("image");
		Image image=applet.getImage(applet.getCodeBase(),image_name);
		
		String width=attr.getValue("width");
		String height=attr.getValue("height");
		object=new AnimatedImage(applet,name,image,
				Integer.parseInt(width),
				Integer.parseInt(height));
		
		parse_colors(object, attr);
		parse_layer(object,attr);
		parse_transparency(object, attr);
		
		return object;
	}
	
	public static AnimatedObject create_rectangle(Applet applet, String name,
			Attributes attr) throws Exception {
		AnimatedObject object=null;
		
		String width=attr.getValue("width");
		String height=attr.getValue("height");
	
		object=new AnimatedRectangle(applet,name,
			Integer.parseInt(width),
			Integer.parseInt(height));
		
		parse_colors(object, attr);
		parse_layer(object,attr);
		parse_transparency(object, attr);
		
		return object;
	}
	
	public static AnimatedObject create_polygon(Applet applet, String name,
			Attributes attr) throws Exception {
		AnimatedObject object=null;
		int i;
		int tabx[];
		int taby[];
		
		String coord_x=attr.getValue("coord_x");
		String coord_y=attr.getValue("coord_y");
	
		StringTokenizer tokens;
		tokens=new StringTokenizer(coord_x," ,");
		tabx=new int [tokens.countTokens()];
		i=0;
		while (tokens.hasMoreTokens()) {
			tabx[i++]=Integer.parseInt(tokens.nextToken());
		}
		tokens=new StringTokenizer(coord_y," ,");
		taby=new int [tokens.countTokens()];
		i=0;
		while (tokens.hasMoreTokens()) {
			taby[i++]=Integer.parseInt(tokens.nextToken());
		}
		if (tabx.length!=taby.length) throw new Exception("Coordinates");
		
		object=new AnimatedPolygon(applet,name,
			tabx,
			taby);
		
		parse_colors(object, attr);
		parse_layer(object,attr);
		parse_transparency(object, attr);
		
		return object;
	}
	
	public static AnimatedObject create_circle(Applet applet, String name,
			Attributes attr) throws Exception {
		AnimatedObject object=null;
		
		String rayon=attr.getValue("rayon");
	
		object=new AnimatedCircle(applet,name,
			Integer.parseInt(rayon));
		
		parse_colors(object, attr);
		parse_layer(object,attr);
		parse_transparency(object, attr);
		
		return object;
	}
	
	public static AnimatedObject create_ellipse(Applet applet, String name,
			Attributes attr) throws Exception {
		AnimatedObject object=null;
		
		String width=attr.getValue("width");
		String height=attr.getValue("height");
		
		object=new AnimatedEllipse(applet,name,
			Integer.parseInt(width),
			Integer.parseInt(height));
		
		parse_colors(object, attr);
		parse_layer(object,attr);
		parse_transparency(object, attr);
		
		return object;
	}
	
	public static AnimatedObject create_extern(Applet applet, String name,
			Attributes attr) throws Exception {
		AnimatedObject object=null;
		
		String this_class=attr.getValue("class");
		
		System.out.println("CREATE_EXTERN: ");
		try {
			Class maclasse=Class.forName(this_class);
			Class[] types = { Applet.class, String.class, String.class };
			Constructor cons=maclasse.getConstructor(types);
			Object objs[]=new Object[3];
			objs[0]=applet;
			objs[1]=name;
			objs[2]=attr.getValue("constructor");
			object=(AnimatedObject) cons.newInstance(objs);
			parse_colors(object, attr);
			parse_layer(object,attr);
			parse_transparency(object, attr);
		} catch(Exception e) {
			e.printStackTrace();
		}	
		return object;
	}
}
