class Ellipse extends AnimatedObject {
    constructor(id, x, y, image, fgcolor, bgcolor, state, layer, opacity, width, height, bgtransparent) {
        super(id, x, y, fgcolor, bgcolor, state, layer, opacity);
        this.width = width;
        this.height = height;
        this.bgtransparent = bgtransparent;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getBgtransparent() {
        return this.bgtransparent;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    setBgtransparent(bgtransparent) {
        this.bgtransparent = bgtransparent;
    }

    draw() {
        ellipse(this.x, this.y, this.width, this.height);
    }
}