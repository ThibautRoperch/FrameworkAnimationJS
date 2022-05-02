import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Landmark extends AnimatedObject {
    
	constructor(id, x, y, bgcolor, bgtransparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, height, width, scale_x, scale_y, unit_x, unit_y) {
        super(id, x, y, bgcolor, bgtransparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this.height = height;
        this.width = width;
        this.scale_x = scale_x;
        this.scale_y = scale_y;
        this.unit_x = unit_x;
        this.unit_y = unit_y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getScaleX() {
        return this.scale_x;
    }

    getScaleY() {
        return this.scale_y;
    }

    getUnitX() {
        return this.unit_x;
    }

    getUnitY() {
        return this.unit_y;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    setScaleX(scale_x) {
        this.scale_x = scale_x;
    }

    setScaleY(scale_y) {
        this.scale_y = scale_y;
    }

    setUnitX(unit_x) {
        this.unit_x = unit_x;
    }

    setUnitY(unit_y) {
        this.unit_y = unit_y;
    }

    draw(drawing) {
        super.draw(drawing);

        // Forcer la bordure pour les éléments du repère
        drawing.stroke(this.border_color, this.opacity * 255);

		drawing.textFont("courrier");
		drawing.textSize(12);
        drawing.textStyle(drawing.NORMAL);
        drawing.angleMode(drawing.DEGREES);

        let axis1;       //Vector utilisé pour effectuer la rotation : à placer au milieu du texte
        if(this.height > 0 && this.width > 0) {
            drawing.line(this.x, this.y + this.width, this.x + this.width, this.y + this.width);
            drawing.line(this.x, this.y + this.height, this.x, this.y);
            // Dessin des triangles 
            drawing.triangle(this.x - this.width * 0.02, this.y, this.x + this.width * 0.02, this.y, this.x, this.y - this.height * 0.04);
            drawing.triangle(this.x + this.width, this.y + this.height + this.height * 0.02, this.x + this.width, this.y + this.height - this.height * 0.02, this.x + this.width + this.width * 0.04, this.y + this.height);
            // Enlever la bordure pour les textes et forcer l'arrière-plan
            if (this.border_transparency) drawing.noStroke();
            else drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
            drawing.fill(this.bgcolor[0], this.bgcolor[1], this.bgcolor[2], this.opacity * 255);
            //texte x
            drawing.text(this.unit_x, this.x + this.width/2, this.y + this.height + 25);
            //texte y (Ca serait bien d'orienter le texte)

            drawing.push();        //sert à pas faire la rotation et la translation sur tous les objets (s'arrête après pop)
                drawing.translate(this.x - 20, this.y + this.height/2);
                drawing.rotate(-90);
                drawing.text(this.unit_y,0, 0);
            drawing.pop();
        }
        else if(this.height < 0 && this.width > 0) { 
            drawing.line(this.x, this.y + this.width, this.x + this.width, this.y + this.width);
            drawing.line(this.x + this.width, this.y - this.height, this.x + this.width, this.y);
            // Enlever la bordure pour les textes et forcer l'arrière-plan
            if (this.border_transparency) drawing.noStroke();
            else drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
            drawing.fill(this.bgcolor[0], this.bgcolor[1], this.bgcolor[2], this.opacity * 255);
            //texte x
            drawing.text(this.unit_x, this.x + this.width/2, this.y + this.width + 25);
            
            //application de la translation pour fixer le point initial et rotation
            darwing.translate(this.x + this.width + 20, this.y - this.height/2);
            darwing.rotate(90);
            //texte y
            if (this.border_transparency) drawing.noStroke();
            else drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
            drawing.text(this.unit_y, 0, 0);
        }
        else if(this.height > 0 && this.width < 0) {
            drawing.line(this.x - this.width, this.y + this.height, this.x - this.width, this.y); 
            drawing.line(this.x, this.y - this.width, this.x - this.width, this.y - this.width);
            // Enlever la bordure pour les textes et forcer l'arrière-plan
            if (this.border_transparency) drawing.noStroke();
            else drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
            drawing.fill(this.bgcolor[0], this.bgcolor[1], this.bgcolor[2], this.opacity * 255);
            //texte x
            drawing.text(this.unit_x, this.x - this.width/2, this.y + this.height + 25);
            //texte y (Ca serait bien d'orienter le texte)
            axis1 = drawing.createVector(this.x - this.width/2, this.y + this.height + 25);
            //axis2 = drawing.createVector(this.x - this.width/2, this.y + this.height + 40);
            //for(let i = 0; i>-180; --i) {
            //drawing.push();
            drawing.translate(this.x - this.width + 10, this.y + this.height/2 );
            drawing.rotate(-90);
            drawing.text(this.unit_y, 0, 0);
            //drawing.pop();
        }
        else if(this.height < 0 && this.width < 0) {
            drawing.line(this.x, this.y - this.width, this.x - this.width, this.y - this.width);
            drawing.line(this.x, this.y - this.height, this.x, this.y);
            // Enlever la bordure pour les textes et forcer l'arrière-plan
            if (this.border_transparency) drawing.noStroke();
            else drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
            drawing.fill(this.bgcolor[0], this.bgcolor[1], this.bgcolor[2], this.opacity * 255);
            //texte x
            drawing.text(this.unit_x, this.x + this.width/2, this.y + 25);
            //texte y (Ca serait bien d'orienter le texte)
            axis1 = drawing.createVector(this.x + this.width/2, this.y + 25);
            drawing.rotate(90, axis1);
            drawing.text(this.unit_y, this.x + this.width + 25, this.y + this.height/2 );
        }
    }

    isClicked(x, y) {
		return (x >= this.x) && (x <= this.x + this.width) && (y >= this.y) && (y <= this.y + this.height);
    }
    
    toXml() {
        let landmark = document.createElement("object_landmark");
        landmark.innerHTML = this.id;
        landmark.setAttribute("x", this.x);
        landmark.setAttribute("y",this.y);
        landmark.setAttribute("bgcolor", this.bgcolor); // r, g, b
        landmark.setAttribute("bgtransparent", this.bgtransparent);
        landmark.setAttribute("border_color", this.border_color); // r, g, b
        landmark.setAttribute("border_transparency", this.border_transparency);
        landmark.setAttribute("border_size", this.border_size);
        landmark.setAttribute("layer", this.layer);
        landmark.setAttribute("visible", this.visible);
        landmark.setAttribute("opacity", this.opacity);
        // landmark.setAttribute("angle", this.angle); // degrees
        landmark.setAttribute("width", this.width);
        landmark.setAttribute("height", this.height);
        landmark.setAttribute("scale_x", this.scale_x);
        landmark.setAttribute("scale_y", this.scale_y);
        landmark.setAttribute("unit_x", this.unit_x);
        landmark.setAttribute("unit_y", this.unit_y);
        return landmark;
    }

    clone() {
        return new Landmark(this.id, this.x, this.y, this.bgcolor, this.bgtransparent, this.border_color, this.border_transparency, this.state, this.layer, this.visible, this.opacity, this.angle, this.width, this.height, this.scale_x, this.scale_y, this.unit_x, this.unit_y);
    }

}
