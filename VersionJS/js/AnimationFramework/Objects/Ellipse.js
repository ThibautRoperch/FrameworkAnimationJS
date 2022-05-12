import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */
export class Ellipse extends AnimatedObject {

    /**
     * Width of the ellipse in pixels
     * @type number
     */
    _width;

    /**
     * Height of the ellipse in pixels
     * @type number
     */
    _height;

    constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width, height) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this._width = width;
        this._height = height;
    }

    draw (drawing) {
        super.draw(drawing);
        drawing.ellipse(this._x + this._width / 2, this._y + this._height / 2, this._width, this._height);
    }

    isClicked (x, y) {
        // Compute the distance between the ellipse center and the mouse position
        let delta_x = this._x + (this._width / 2) - x;
        let delta_y = this._y + (this._height / 2) - y;
        let distance = Math.pow(delta_x / (this._width / 2), 2) + Math.pow(delta_y / (this._height / 2), 2);
        return distance <= 1;
    }

    toXml () {
        let ellipse = document.createElement("object_ellipse");
        ellipse.innerHTML = this._id;
        ellipse.setAttribute("x", this._x);
        ellipse.setAttribute("y", this._y);
        ellipse.setAttribute("background_color", this._background_color); // r, g, b
        ellipse.setAttribute("background_transparent", this._background_transparent);
        ellipse.setAttribute("border_color", this._border_color); // r, g, b
        ellipse.setAttribute("border_transparency", this._border_transparency);
        ellipse.setAttribute("border_size", this._border_size);
        ellipse.setAttribute("layer", this._layer);
        ellipse.setAttribute("visible", this._visible);
        ellipse.setAttribute("opacity", this._opacity);
        //    ellipse.setAttribute("angle", this._angle); // degrees
        ellipse.setAttribute("width", this._width);
        ellipse.setAttribute("height", this._height);
        return ellipse;
    }

    clone () {
        return new Ellipse(this._id, this._x, this._y, this._background_color, this._background_transparent, this._border_color, this._border_transparency, this._state, this._layer, this._visible, this._opacity, this._angle, this._width, this._height);
    }


    draw(drawing) {
        drawing.push();
        super.draw(drawing);
        drawing.ellipse(this._x + this._width / 2, this._y + this._height / 2, this._width, this._height);
        drawing.pop();
    }

    isClicked(x, y, drawing) {
        // Compute the distance between the ellipse center and the mouse position
        let delta_x = this._x + (this._width / 2) - x;
        let delta_y = this._y + (this._height / 2) - y;
        let distance = Math.pow(delta_x / (this._width / 2), 2) + Math.pow(delta_y / (this._height / 2), 2);
        return distance <= 1;
    }

    get width () {
        return this._width;
    }

    set width (value) {
        this._width = value;
    } 
      
    get height () {
        return this._height;
    }

    set height (value) {
        this._height = value;
    }
}
