class Box extends AnimatedObject {
	constructor(id, x, y, fgcolor, bgcolor, state, layer, width, height, bocolor, opacity, round) {
        super(id, x, y, fgcolor, bgcolor, state, layer, opacity);
        this.width = width;
        this.height = height;
        this.bocolor = bocolor;
        this.round = round; 
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
        rect(this.x, this.y, this.width, this.height, this.round[0], this.round[1], this.round[2], this.round[3]);
    }
}