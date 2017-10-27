/**
 * 
 */

class ImageFile extends AnimatedObject {
    
    constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, width, height, image) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle);
        this.width = width;
        this.height = height;
        this.image = image;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getImage() {
        return this.image;
    }

    setImage(image) {
        this.image = image;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    draw() {
        super.draw();
        image(this.image, this.x, this.y);
    }

    isCliked(x, y) {
		if((x >= this.x) && (x <= this.x + this.width) && (y >= this.y) && (y <= this.y + this.height))
            return true;
        return false;
    }
    
    toXml() {
        
        var image = document.createElement("object_image");
        image.setAttribute("id", this.id); 
        image.setAttribute("x", this.x);
        image.setAttribute("y",this.y);
        image.setAttribute("bgcolor", this.bgcolor); // r, g, b
        image.setAttribute("bgtransparent", this.bgtransparent);
        image.setAttribute("bocolor", this.bocolor); // r, g, b
        image.setAttribute("botransparent", this.botransparent);
        image.setAttribute("state", this.state);
        image.setAttribute("layer", this.layer);
        image.setAttribute("visible", this.visible);
        image.setAttribute("opacity", this.opacity);
        image.setAttribute("angle", this.angle); // degrees
        image.setAttribute("width", this.width);
        image.setAttribute("height", this.height);
        image.setAttribute("image", this.image);
        return image;

    }

    clone() {
        return new ImageFile(this.id, this.x, this.y, this.bgcolor, this.bgtransparent, this.bocolor, this.botransparent, this.state, this.layer, this.visible, this.opacity, this.angle, this.width, this.height, this.image);
    }

}
