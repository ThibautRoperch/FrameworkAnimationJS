/**
 * 
 */

class Ellipse extends AnimatedObject {
    
    constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, state, layer, visible, opacity, angle, width, height) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, bosize, state, layer, visible, opacity, angle);
        this.width = width;
        this.height = height;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    draw(drawing) {
        super.draw(drawing);
        drawing.ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width, this.height);
    }

    isClicked(x, y) {
        // Compute the distance between the ellipse center and the mouse position
        var delta_x = this.x + (this.width / 2) - x;
        var delta_y = this.y + (this.height / 2) - y;
        var distance = Math.pow(delta_x / (this.width / 2), 2) + Math.pow(delta_y / (this.height / 2), 2);
        return distance <= 1;
    }

    toXml() {
       var ellipse = document.createElement("object_ellipse");
       ellipse.innerHTML = this.id;
       ellipse.setAttribute("x", this.x);
       ellipse.setAttribute("y",this.y);
       ellipse.setAttribute("bgcolor", this.bgcolor); // r, g, b
       ellipse.setAttribute("bgtransparent", this.bgtransparent);
       ellipse.setAttribute("bocolor", this.bocolor); // r, g, b
       ellipse.setAttribute("botransparent", this.botransparent);
       ellipse.setAttribute("bosize", this.bosize);
       ellipse.setAttribute("layer", this.layer);
       ellipse.setAttribute("visible", this.visible);
       ellipse.setAttribute("opacity", this.opacity);
    //    ellipse.setAttribute("angle", this.angle); // degrees
       ellipse.setAttribute("width", this.width);
       ellipse.setAttribute("height", this.height)
       return ellipse;
    }

    clone() {
        return new Ellipse(this.id, this.x, this.y, this.bgcolor, this.bgtransparent, this.bocolor, this.botransparent, this.state, this.layer, this.visible, this.opacity, this.angle, this.width, this.height);
    }

}
