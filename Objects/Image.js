class Image extends Object {
    constructor(id, x, y, image, red, green, blue, state, layer) {
        super(id, x, y, red, green, blue, state, layer);
        this.image = image;
    }

    getImage() {
        return this.image;
    }








}