/**
 * 
 */

class Rectangle extends AnimatedObject {
    
	constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, width, height, round) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle);
        this.width = width;
        this.height = height;
        this.round = round; // tl, tr, bl, br
    }
    
    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getRound() {
        return this.round;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    setRound(round) {
        this.round = round;
    }

    draw(drawing) {
        super.draw(drawing);
        drawing.rect(this.x, this.y, this.width, this.height, this.round[0], this.round[1], this.round[2], this.round[3]);
    }
    
    isClicked(x, y) {
		if((x >= this.x) && (x <= this.x + this.width) && (y >= this.y) && (y <= this.y + this.height))
            return true;
        return false;
    }
    
    toXml() {
        var rectangle = document.createElement("object_rectangle");
        rectangle.setAttribute("id", this.id); 
        rectangle.setAttribute("x", this.x);
        rectangle.setAttribute("y",this.y);
        rectangle.setAttribute("bgcolor", this.bgcolor); 
        rectangle.setAttribute("bgtransparent", this.bgtransparent);
        rectangle.setAttribute("bocolor", this.bocolor); 
        rectangle.setAttribute("botransparent", this.botransparent);
        rectangle.setAttribute("state", this.state);
        rectangle.setAttribute("layer", this.layer);
        rectangle.setAttribute("visible", this.visible);
        rectangle.setAttribute("opacity", this.opacity);
        rectangle.setAttribute("angle", this.angle); 
        rectangle.setAttribute("width", this.width);
        rectangle.setAttribute("height", this.height);
        rectangle.setAttribute("round", this.round);
        return rectangle;
    }
    
    clone() {
        return new Text(this.id, this.x, this.y, this.bgcolor, this.bgtransparent, this.bocolor, this.botransparent, this.state, this.layer, this.visible, this.opacity, this.angle, this.width, this.height, this.round);
    }

}
