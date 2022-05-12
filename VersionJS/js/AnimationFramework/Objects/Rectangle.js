import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Rectangle extends AnimatedObject {

    /**
     * The rect width
     * @type number
     */
    _width;
    get width () {
        return this._width;
    }
    set width (value) {
        this._width = value;
    }

    /**
     * The rect height
     * @type number
     */
    _height;
    get height () {
        return this._height;
    }
    set height (value) {
        this._height = value;
    }

    /**
     * The array of the rounded corner value
     * top-left, top-right, bottom-left, bottom-right
     * @type [number]
     */
    _round;
    get round () {
        return this._round;
    }
    set round (value) {
        this._round = value;
    }

    constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width, height, round) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this._width = width;
        this._height = height;
        this._round = round; // tl, tr, bl, br
    }

    draw (drawing) {
        super.draw(drawing);
        drawing.rect(this._x, this._y, this._width, this._height, this._round[0], this._round[1], this._round[2], this._round[3]);
    }

    isClicked (x, y) {
        return (x >= this._x) && (x <= this._x + this._width) && (y >= this._y) && (y <= this._y + this._height);
    }

    toXml () {
        let rectangle = document.createElement("object_rectangle");
        rectangle.innerHTML = this._id;
        rectangle.setAttribute("x", this._x);
        rectangle.setAttribute("y", this._y);
        rectangle.setAttribute("background_color", this._background_color);
        rectangle.setAttribute("background_transparent", this._background_transparent);
        rectangle.setAttribute("border_color", this._border_color);
        rectangle.setAttribute("border_transparency", this._border_transparency);
        rectangle.setAttribute("border_size", this._border_size);
        rectangle.setAttribute("layer", this._layer);
        rectangle.setAttribute("visible", this._visible);
        rectangle.setAttribute("opacity", this._opacity);
        // rectangle.setAttribute("angle", this._angle); 
        rectangle.setAttribute("width", this._width);
        rectangle.setAttribute("height", this._height);
        rectangle.setAttribute("round", this._round);
        return rectangle;
    }

    clone () {
        return new Text(this._id, this._x, this._y, this._background_color, this._background_transparent, this._border_color, this._border_transparency, this._state, this._layer, this._visible, this._opacity, this._angle, this._width, this._height, this._round);
    }
}
