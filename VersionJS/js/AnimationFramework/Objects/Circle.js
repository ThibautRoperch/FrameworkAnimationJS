/**
 * 
 */
import { Ellipse } from "./Ellipse.js";
export class Circle extends Ellipse {

    /**
     * Raduis of the circle
     * @type number
     */
    _radius;

    constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, radius) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, radius * 2, radius * 2);
        this._radius = radius;
    }

    draw (drawing) {
        super.draw(drawing);
    }

    isClicked (x, y) {
        // Compute the distance between the circle center and the mouse position
        let delta_x = this._x + this._radius - x;
        let delta_y = this._y + this._radius - y;
        let distance = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
        return distance <= this._radius;
    }

    toXml () {
        let circle = document.createElement("object_circle");
        circle.innerHTML = this._id;
        circle.setAttribute("x", this._x);
        circle.setAttribute("y", this._y);
        circle.setAttribute("background_color", this._background_color); // r, g, b
        circle.setAttribute("background_transparent", this._background_transparent);
        circle.setAttribute("border_color", this._border_color); // r, g, b
        circle.setAttribute("border_transparency", this._border_transparency);
        circle.setAttribute("border_size", this._border_size);
        circle.setAttribute("layer", this._layer);
        circle.setAttribute("visible", this._visible);
        circle.setAttribute("opacity", this._opacity);
        // circle.setAttribute("angle", this.angle); // degrees
        circle.setAttribute("radius", this._radius);
        return circle;
    }

    clone () {
        return new Circle(this._id, this._x, this._y, this._background_color, this._background_transparent, this._border_color, this._border_transparency, this._state, this._layer, this._visible, this._opacity, this.angle, this._radius);
    }

    get radius () {
        return this._radius;
    }
    set radius (value) {
        this._radius = value;
        super.width = (value * 2);
        super.height = (value * 2);
    }

}
