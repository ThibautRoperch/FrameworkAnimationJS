class Image extends AnimatedObject {
    constructor(id, x, y, image, fgcolor, bgcolor, state, layer) {
        super(id, x, y, fgcolor, bgcolor, state, layer);
        this.image = image;
    }

    getImage() {
        return this.image;
    }








}