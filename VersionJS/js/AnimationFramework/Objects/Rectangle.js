import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Rectangle extends AnimatedObject {
    
	constructor(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width, height, round) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this.width = width;
        this.height = height;
        this.round = round.lenght == 4 ? round : [round[0], round[0], round[0], round[0]]; // tl, tr, bl, br
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
        drawing.push();
        super.draw(drawing);
        drawing.rect(this.x, this.y, this.width, this.height, this.round[0], this.round[1], this.round[2], this.round[3]);
        drawing.pop();
    }
    
    isClicked(x, y) {
		return (x >= this.x) && (x <= this.x + this.width) && (y >= this.y) && (y <= this.y + this.height);
    }
    
    toXml() {
        let rectangle = document.createElement("object_rectangle");
        rectangle.innerHTML = this.id;
        rectangle.setAttribute("x", this.x);
        rectangle.setAttribute("y",this.y);
        rectangle.setAttribute("background_color", this.background_color); 
        rectangle.setAttribute("background_transparent", this.background_transparent);
        rectangle.setAttribute("border_color", this.border_color); 
        rectangle.setAttribute("border_transparency", this.border_transparency);
        rectangle.setAttribute("border_size", this.border_size);
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
        return new Text(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.state, this.layer, this.visible, this.opacity, this.angle, this.width, this.height, this.round);
    }

}
