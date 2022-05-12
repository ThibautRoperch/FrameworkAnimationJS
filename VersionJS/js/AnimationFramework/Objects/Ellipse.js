import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */
export class Ellipse extends AnimatedObject {
    
    constructor(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width, height) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
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

    isClicked(x, y, drawing) {
        // Compute the distance between the ellipse center and the mouse position
        let delta_x = this.x + (this.width / 2) - x;
        let delta_y = this.y + (this.height / 2) - y;
        let distance = Math.pow(delta_x / (this.width / 2), 2) + Math.pow(delta_y / (this.height / 2), 2);
        return distance <= 1;
    }

    toXml() {
       let ellipse = document.createElement("object_ellipse");
       ellipse.innerHTML = this.id;
       ellipse.setAttribute("x", this.x);
       ellipse.setAttribute("y",this.y);
       ellipse.setAttribute("background_color", this.background_color); // r, g, b
       ellipse.setAttribute("background_transparent", this.background_transparent);
       ellipse.setAttribute("border_color", this.border_color); // r, g, b
       ellipse.setAttribute("border_transparency", this.border_transparency);
       ellipse.setAttribute("border_size", this.border_size);
       ellipse.setAttribute("layer", this.layer);
       ellipse.setAttribute("visible", this.visible);
       ellipse.setAttribute("opacity", this.opacity);
    //    ellipse.setAttribute("angle", this.angle); // degrees
       ellipse.setAttribute("width", this.width);
       ellipse.setAttribute("height", this.height)
       return ellipse;
    }

    clone() {
        return new Ellipse(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.state, this.layer, this.visible, this.opacity, this.angle, this.width, this.height);
    }

}
