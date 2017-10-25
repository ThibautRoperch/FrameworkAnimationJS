/**
 * 
 */

class Ellipse extends AnimatedObject {
    
    constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, width, height) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle);
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

    draw() {
        super.draw();
        ellipse(this.x, this.y, this.width, this.height);
    }

    isClicked(x, y) { //probably false
        x = this.x - x;
        y = this.y - y;
        distance = Math.pow(x/(width/2),2) + Math.pow(y/(height/2),2);
        return distance <= 1;
    }
    toXml() {

       var ellipse = document.createElement("object_ellipse");
       ellipse.setAttribute("id", this.id); 
       ellipse.setAttribute("x", this.x);
       ellipse.setAttribute("y",this.y);
       ellipse.setAttribute("bgcolor", this.bgcolor); // r, g, b
       ellipse.setAttribute("bgtransparent", this.bgtransparent);
       ellipse.setAttribute("bocolor", this.bocolor); // r, g, b
       ellipse.setAttribute("botransparent", this.botransparent);
       ellipse.setAttribute("state", this.state);
       ellipse.setAttribute("layer", this.layer);
       ellipse.setAttribute("visible", this.visible);
       ellipse.setAttribute("opacity", this.opacity);
       ellipse.setAttribute("angle", this.angle); // degrees
       ellipse.setAttribute("width", this.width);
       ellipse.setAttribute("height", this.height)
       return ellipse;
    }
}
