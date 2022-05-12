import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Polygon extends AnimatedObject {

    /**
     * X coordinate of all the points
     * @type [number]
     */
    _coord_x;
    get coord_x () {
        return this._coord_x;
    }
    set coord_x (value) {
        this._coord_x = value;
    }

    /**
     * Y coordinate of all the points
     * @type [number]
     */
    _coord_y;
    get coord_y () {
        return this._coord_y;
    }
    set coord_y (value) {
        this._coord_y = value;
    }

    constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, coord_x, coord_y) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this._coord_x = coord_x; // x coords' list
        this._coord_y = coord_y; // y coords' list
    }

    draw (drawing) {
      drawing.push();
        super.draw(drawing);
        drawing.beginShape();
        for (let i = 0; i < this._coord_x.length; ++i) {
            drawing.vertex(this._x + this._coord_x[i], this._y + this._coord_y[i]);
        }
        drawing.endShape(drawing.CLOSE);
        drawing.pop();
    }

    isClicked (x, y, drawing) {
        let min_x = this._coord_x[0];
        let max_x = this._coord_x[0];
        let min_y = this._coord_y[0];
        let max_y = this._coord_y[0];

        for (let i = 1; i < this._coord_x.length; ++i) {
            max_x = (this._coord_x[i] > max_x) ? this._coord_x[i] : max_x;
            min_x = (this._coord_x[i] < min_x) ? this._coord_x[i] : min_x;
            max_y = (this._coord_y[i] > max_y) ? this._coord_y[i] : max_y;
            min_y = (this._coord_y[i] < min_y) ? this._coord_y[i] : min_y;
        }

        return (x >= this._x + min_x) && (x <= this._x + max_x) && (y >= this._y + min_y) && (y <= this._y + max_y);
    }

    toXml () {
        let polygon = document.createElement("object_polygon");
        polygon.innerHTML = this._id;
        polygon.setAttribute("x", this._x);
        polygon.setAttribute("y", this._y);
        polygon.setAttribute("background_color", this._background_color);
        polygon.setAttribute("background_transparent", this._background_transparent);
        polygon.setAttribute("border_color", this._border_color);
        polygon.setAttribute("border_transparency", this._border_transparency);
        polygon.setAttribute("border_size", this._border_size);
        polygon.setAttribute("layer", this._layer);
        polygon.setAttribute("visible", this._visible);
        polygon.setAttribute("opacity", this._opacity);
        // polygon.setAttribute("angle", this._angle); 
        polygon.setAttribute("coord_x", this._coord_x);
        polygon.setAttribute("coord_y", this._coord_y);
        return polygon;
    }

    clone () {
        return new Polygon(this._id, this._x, this._y, this._background_color, this._background_transparent, this._border_color, this._border_transparency, this._state, this._layer, this._visible, this._opacity, this._angle, this._coord_x, this._coord_y);
    }
}
