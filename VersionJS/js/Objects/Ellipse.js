/**
 * 
 */

class Ellipse extends AnimatedObject {
    
    constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, width, height) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity);
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
    
}
