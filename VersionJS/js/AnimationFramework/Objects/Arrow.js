import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Arrow extends AnimatedObject {

    width_line;
    height_line;
    width_triangle;
    height_triangle;
    rotation;

    constructor(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width_line, height_line, width_triangle, height_triangle, rotation){
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this.width_line = width_line;
        this.height_line = height_line;
        this.width_triangle = width_triangle;
        this.height_triangle = height_triangle;
        this.rotation = rotation;
    }

    get width_line() {
        return this.width_line;
    }
    set width_line(value) {
        this.width_line = value;
    }

    get height_line() {
        return this.height_line;
    }
    set height_line(value) {
        this.height_line = value;
    }

    get width_triangle() {
        return this.width_triangle;
    }
    set width_triangle(value) {
        this.width_triangle = value;
    }

    get height_triangle() {
        return this.width_triangle;
    }
    set height_triangle(value) {
        this.width_triangle = value;
    }

    get rotation() {
        return this.rotation;
    }
    set rotation(value) {
        this.rotation = value;
    }

    draw(drawing) {
        drawing.push();
        super.draw(drawing);
        drawing.translate(this.x, this.y);
        drawing.rotate(this.rotation);
        drawing.rect(0, 0, this.width_line, this.height_line);
        drawing.translate(this.width_line, this.height_line / 2);
        drawing.triangle(0, -(this.width_triangle / 2), this.height_triangle, 0, 0, this.width_triangle / 2);
        drawing.pop();
    }
    
    isClicked(x, y, drawing) {
        drawing.push();
        drawing.rotate(this.rotation);
        // Clic in rectangle's zone
        let inRectangleZone = (x >= this.x) && (x <= this.x + this.width_line) && (y >= this.y) && (y <= this.y + this.height_line)
        // Clic in triangle's zone
        let inTriangleZone =  (x <= this.x + this.width_line + this.width_triangle && x >= this.x + this.width_line && y >= (this.y - this.height_triangle / 4) && y <= (this.y + this.height_line + this.height_triangle/4));
        drawing.pop();
		return inRectangleZone || inTriangleZone;
    }
    
    toXml() {
        let arrow = document.createElement("object_arrow");
        arrow.innerHTML = this.id;
        arrow.setAttribute("x", this.x);
        arrow.setAttribute("y",this.y);
        arrow.setAttribute("background_color", this.background_color); 
        arrow.setAttribute("background_transparent", this.background_transparent);
        arrow.setAttribute("border_color", this.border_color); 
        arrow.setAttribute("border_transparency", this.border_transparency);
        arrow.setAttribute("border_size", this.border_size);
        arrow.setAttribute("layer", this.layer);
        arrow.setAttribute("visible", this.visible);
        arrow.setAttribute("opacity", this.opacity);
        arrow.setAttribute("angle", this.angle); 
        arrow.setAttribute("width_line", this.width_line);
        arrow.setAttribute("height_line", this.height_line);
        arrow.setAttribute("width_triangle", this.width_triangle);
        arrow.setAttribute("height_triangle", this.height_triangle);
        arrow.setAttribute("rotation", this.rotation);
        return arrow;
    }
    
    clone() {
        return new Arrow(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.state, this.layer, this.visible, this.opacity, this.angle, this.width_line, this.height_line, this.width_triangle, this.height_triangle, this.rotation);
    }
}