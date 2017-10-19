class Box extends AnimatedObject {
	constructor(id, x, y, fgcolor, bgcolor, state, layer, width, height, bocolor, opacity) {
        super(id, x, y, fgcolor, bgcolor, state, layer, opacity);
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

    setBocolor(bocolor) {
        this.bocolor = bocolor;
    }

    draw() {
        rect(this.x, this.y, this.width, this.height);
    }
}