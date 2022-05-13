import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Arrow extends AnimatedObject {

    _width_line;
    _height_line;
    _width_triangle;
    _height_triangle;
    _rotation;

    constructor(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width_line, height_line, width_triangle, height_triangle, rotation){
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this._width_line = width_line;
        this._height_line = height_line;
        this._width_triangle = width_triangle;
        this._height_triangle = height_triangle;
        this._rotation = rotation;
    }

    get width_line() {
        return this._width_line;
    }
    set width_line(value) {
        this._width_line = value;
    }

    get height_line() {
        return this._height_line;
    }
    set height_line(value) {
        this._height_line = value;
    }

    get width_triangle() {
        return this._width_triangle;
    }
    set width_triangle(value) {
        this._width_triangle = value;
    }

    get height_triangle() {
        return this._width_triangle;
    }
    set height_triangle(value) {
        this._width_triangle = value;
    }

    get rotation() {
        return this._rotation;
    }
    set rotation(value) {
        this._rotation = value;
    }

    draw(drawing) {
        drawing.push();
        super.draw(drawing);
        drawing.translate(this.x, this.y);
        drawing.angleMode(drawing.DEGREES);
        drawing.rotate(this._rotation);
        drawing.rect(0, 0, this._width_line, this._height_line);
        drawing.translate(this._width_line, this._height_line / 2);
        drawing.triangle(0, -(this._width_triangle / 2), this._height_triangle, 0, 0, this._width_triangle / 2);
        drawing.pop();
    }
    
    isClicked(x, y, drawing) {
        drawing.push();
        drawing.rotate(this._rotation);
        // Clic in rectangle's zone
        let inRectangleZone = (x >= this.x) && (x <= this.x + this._width_line) && (y >= this.y) && (y <= this.y + this._height_line)
        // Clic in triangle's zone
        let inTriangleZone =  (x <= this.x + this._width_line + this._width_triangle && x >= this.x + this._width_line && y >= (this.y - this._height_triangle / 4) && y <= (this.y + this._height_line + this._height_triangle/4));
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
        arrow.setAttribute("width_line", this._width_line);
        arrow.setAttribute("height_line", this._height_line);
        arrow.setAttribute("width_triangle", this._width_triangle);
        arrow.setAttribute("height_triangle", this._height_triangle);
        arrow.setAttribute("rotation", this._rotation);
        return arrow;
    }
    
    clone() {
        return new Arrow(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.state, this.layer, this.visible, this.opacity, this.angle, this._width_line, this._height_line, this._width_triangle, this._height_triangle, this._rotation);
    }
}