/**
 * 
 */

class StartButton extends AnimatedObject {
    
	constructor(x, y, text, present) {
        super(null, x, y, [255, 255, 255], false, [0, 0, 0], false, DEFAULT_STATE, null, true, 1, 0);
        this.text = text;
        this.present = present;

        this.font_size = 12;
        this.width = this.text.length * (parseInt(this.font_size) / 2 + 1) + 2;
        this.height = this.font_size + 13;
    }
    
    getText() {
        return this.text;
    }
    
    getPresent() {
        return this.present;
    }

    setText(text) {
        this.text = text;
    }

    setPresent(present) {
        this.present = present;
    }

    draw(drawing) {
		super.draw(drawing);
        // Background
       	drawing.rect(this.x - this.width / 2 + 2, this.y - this.height / 2 + 2, this.width, this.height); 
		// Remplacer les @ par \n TODO p-ê utiliser textLeading (https://p5js.org/reference/#/p5/textLeading)
        // Text's color, size and style
        drawing.noStroke();
        drawing.fill(0, 0, 255, this.opacity * 255);
		drawing.textSize(this.font_size);
		drawing.textStyle(drawing.NORMAL);
		// Text alignment
		drawing.textAlign(drawing.CENTER, drawing.CENTER);
		// Display
		drawing.text(this.text, this.x + 2, this.y + 4);
    }

    isClicked(x, y) {
		if((x >= this.x - this.width / 2 + 2) && (x <= this.x + this.width / 2 + 2) && (y >= this.y - this.height / 2 + 2) && (y <= this.y + this.height / 2 + 2))
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
