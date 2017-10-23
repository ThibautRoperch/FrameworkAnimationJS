/**
 * 
 */

class ImageFile extends AnimatedObject {
    
    constructor(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, width, height, image) {
        super(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity);
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

}
