class Image extends AnimatedObject {
    constructor(id, x, y, image, fgcolor, bgcolor, state, layer, opacity) {
        super(id, x, y, fgcolor, bgcolor, state, layer, opacity);
        this.image = image;
    }

    getImage() {
        return this.image;
    }

}