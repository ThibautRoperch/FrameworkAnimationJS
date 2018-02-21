/**
 * 
 */

class Landmark extends AnimatedObject {
    
	constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, height, width, scaleX, scaleY, unitX, unitY) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle);
        this.height = height;
        this.width = width;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.unitX = unitX;
        this.unitY = unitY;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getScaleX() {
        return this.scaleX;
    }

    getScaleY() {
        return this.scaleY;
    }

    getUnitX() {
        return this.unitX;
    }

    getUnitY() {
        return this.unitY;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    setScaleX(scaleX) {
        this.scaleX = scaleX;
    }

    setScaleY(scaleY) {
        this.scaleY = scaleY;
    }

    setUnitX(unitX) {
        this.unitX = unitX;
    }

    setUnitY(unitY) {
        this.unitY = unitY;
    }

    draw(drawing) {
        super.draw(drawing);

        // Forcer la bordure pour les éléments du repère
        drawing.stroke(this.bocolor, this.opacity * 255);

		drawing.textFont("courrier");
		drawing.textSize(12);
        drawing.textStyle(drawing.NORMAL);
        drawing.angleMode(drawing.DEGREES);

        var axis1;       //Vector utilisé pour effectuer la rotation : à placer au milieu du texte
        var axis2;
        var i;
        if(this.height > 0 && this.width > 0) {
            drawing.line(this.x, this.y + this.width, this.x + this.width, this.y + this.width);
            drawing.line(this.x, this.y + this.height, this.x, this.y);
            // Dessin des triangles 
            drawing.triangle(this.x - this.width * 0.02, this.y, this.x + this.width * 0.02, this.y, this.x, this.y - this.height * 0.04);
            drawing.triangle(this.x + this.width, this.y + this.height + this.height * 0.02, this.x + this.width, this.y + this.height - this.height * 0.02, this.x + this.width + this.width * 0.04, this.y + this.height);
            // Enlever la bordure pour les textes et forcer l'arrière-plan
            if (this.botransparent) drawing.noStroke();
            else drawing.stroke(this.bocolor[0], this.bocolor[1], this.bocolor[2], this.opacity * 255);
            drawing.fill(this.bgcolor[0], this.bgcolor[1], this.bgcolor[2], this.opacity * 255);
            //texte x
            drawing.text(this.unitX, this.x + this.width/2, this.y + this.height + 25);
            //texte y (Ca serait bien d'orienter le texte)

            drawing.push();        //sert à pas faire la rotation et la translation sur tous les objets (s'arrête après pop)
                drawing.translate(this.x - 20, this.y + this.height/2);
                drawing.rotate(-90);
                drawing.text(this.unitY,0, 0);
            drawing.pop();
        }
        else if(this.height < 0 && this.width > 0) { 
            drawing.line(this.x, this.y + this.width, this.x + this.width, this.y + this.width);
            drawing.line(this.x + this.width, this.y - this.height, this.x + this.width, this.y);
            // Enlever la bordure pour les textes et forcer l'arrière-plan
            if (this.botransparent) drawing.noStroke();
            else drawing.stroke(this.bocolor[0], this.bocolor[1], this.bocolor[2], this.opacity * 255);
            drawing.fill(this.bgcolor[0], this.bgcolor[1], this.bgcolor[2], this.opacity * 255);
            //texte x
            drawing.text(this.unitX, this.x + this.width/2, this.y + this.width + 25);
            
            //application de la translation pour fixer le point initial et rotation
            darwing.translate(this.x + this.width + 20, this.y - this.height/2);
            darwing.rotate(90);
            //texte y
            if (this.botransparent) drawing.noStroke();
            else drawing.stroke(this.bocolor[0], this.bocolor[1], this.bocolor[2], this.opacity * 255);
            drawing.text(this.unitY, 0, 0);
        }
        else if(this.height > 0 && this.width < 0) {
            drawing.line(this.x - this.width, this.y + this.height, this.x - this.width, this.y); 
            drawing.line(this.x, this.y - this.width, this.x - this.width, this.y - this.width);
            // Enlever la bordure pour les textes et forcer l'arrière-plan
            if (this.botransparent) drawing.noStroke();
            else drawing.stroke(this.bocolor[0], this.bocolor[1], this.bocolor[2], this.opacity * 255);
            drawing.fill(this.bgcolor[0], this.bgcolor[1], this.bgcolor[2], this.opacity * 255);
            //texte x
            drawing.text(this.unitX, this.x - this.width/2, this.y + this.height + 25);
            //texte y (Ca serait bien d'orienter le texte)
            axis1 = drawing.createVector(this.x - this.width/2, this.y + this.height + 25);
            //axis2 = drawing.createVector(this.x - this.width/2, this.y + this.height + 40);
            //for(i = 0; i>-180; --i) {
            //drawing.push();
            drawing.translate(this.x - this.width + 10, this.y + this.height/2 );
            drawing.rotate(-90);
            drawing.text(this.unitY, 0, 0);
            //drawing.pop();
        }
        else if(this.height < 0 && this.width < 0) {
            drawing.line(this.x, this.y - this.width, this.x - this.width, this.y - this.width);
            drawing.line(this.x, this.y - this.height, this.x, this.y);
            // Enlever la bordure pour les textes et forcer l'arrière-plan
            if (this.botransparent) drawing.noStroke();
            else drawing.stroke(this.bocolor[0], this.bocolor[1], this.bocolor[2], this.opacity * 255);
            drawing.fill(this.bgcolor[0], this.bgcolor[1], this.bgcolor[2], this.opacity * 255);
            //texte x
            drawing.text(this.unitX, this.x + this.width/2, this.y + 25);
            //texte y (Ca serait bien d'orienter le texte)
            axis1 = drawing.createVector(this.x + this.width/2, this.y + 25);
            drawing.rotate(90, axis1);
            drawing.text(this.unitY, this.x + this.width + 25, this.y + this.height/2 );
        }
    }

    isClicked(x, y) {
		return (x >= this.x) && (x <= this.x + this.width) && (y >= this.y) && (y <= this.y + this.height);
    }
    
    toXml() {
        var landmark = document.createElement("object_landmark");
        landmark.setAttribute("id", this.id); 
        landmark.setAttribute("x", this.x);
        landmark.setAttribute("y",this.y);
        landmark.setAttribute("bgcolor", this.bgcolor); // r, g, b
        landmark.setAttribute("bgtransparent", this.bgtransparent);
        landmark.setAttribute("bocolor", this.bocolor); // r, g, b
        landmark.setAttribute("botransparent", this.botransparent);
        landmark.setAttribute("state", this.state);
        landmark.setAttribute("layer", this.layer);
        landmark.setAttribute("visible", this.visible);
        landmark.setAttribute("opacity", this.opacity);
        landmark.setAttribute("angle", this.angle); // degrees
        landmark.setAttribute("width", this.width);
        landmark.setAttribute("height", this.height);
        landmark.setAttribute("scalex", this.scaleX);
        landmark.setAttribute("scaley", this.scaleY);
        landmark.setAttribute("unitx", this.unitX);
        landmark.setAttribute("unity", this.unitY);
        return landmark;
    }

    clone() {
        return new Landmark(this.id, this.x, this.y, this.bgcolor, this.bgtransparent, this.bocolor, this.botransparent, this.state, this.layer, this.visible, this.opacity, this.angle, this.width, this.height, this.scaleX, this.scaleY, this.unitX, this.unitY);
    }

}
