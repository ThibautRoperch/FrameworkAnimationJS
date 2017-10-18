class Polygon extends AnimatedObject {
	constructor(id, x, y, fgcolor, bgcolor, state, layer, width, height, bocolor) {
        super(id, x, y, fgcolor, bgcolor, state, layer);
        this.width = width;
        this.height = height;
        this.bocolor = bocolor;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getBocolor() {
        return this.bocolor;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }
    
}