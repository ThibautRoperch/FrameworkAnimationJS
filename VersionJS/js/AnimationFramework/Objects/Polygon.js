import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Polygon extends AnimatedObject {

    /**
     * X coordinate of all the points
     * @type [number]
     */
    coord_x;

    /**
     * Y coordinate of all the points
     * @type [number]
     */
    coord_y;

    constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, coord_x, coord_y) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this.coord_x = coord_x; // x coords' list
        this.coord_y = coord_y; // y coords' list
    }

    draw (drawing) {
        super.draw(drawing);
        drawing.beginShape();
        for (let i = 0; i < this.coord_x.length; ++i) {
            drawing.vertex(this.x + this.coord_x[i], this.y + this.coord_y[i]);
        }
        drawing.endShape(drawing.CLOSE);
    }

    isClicked (x, y) {
        let min_x = this.coord_x[0];
        let max_x = this.coord_x[0];
        let min_y = this.coord_y[0];
        let max_y = this.coord_y[0];

        for (let i = 1; i < this.coord_x.length; ++i) {
            max_x = (this.coord_x[i] > max_x) ? this.coord_x[i] : max_x;
            min_x = (this.coord_x[i] < min_x) ? this.coord_x[i] : min_x;
            max_y = (this.coord_y[i] > max_y) ? this.coord_y[i] : max_y;
            min_y = (this.coord_y[i] < min_y) ? this.coord_y[i] : min_y;
        }

        return (x >= this.x + min_x) && (x <= this.x + max_x) && (y >= this.y + min_y) && (y <= this.y + max_y);
    }

    toXml () {
        let polygon = document.createElement("object_polygon");
        polygon.innerHTML = this.id;
        polygon.setAttribute("x", this.x);
        polygon.setAttribute("y", this.y);
        polygon.setAttribute("background_color", this.background_color);
        polygon.setAttribute("background_transparent", this.background_transparent);
        polygon.setAttribute("border_color", this.border_color);
        polygon.setAttribute("border_transparency", this.border_transparency);
        polygon.setAttribute("border_size", this.border_size);
        polygon.setAttribute("layer", this.layer);
        polygon.setAttribute("visible", this.visible);
        polygon.setAttribute("opacity", this.opacity);
        // polygon.setAttribute("angle", this.angle); 
        polygon.setAttribute("coord_x", this.coord_x);
        polygon.setAttribute("coord_y", this.coord_y);
        return polygon;
    }

    clone () {
        return new Polygon(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.state, this.layer, this.visible, this.opacity, this.angle, this.coord_x, this.coord_y);
    }

    get coord_x () {
        return this.coord_x;
    }

    set coord_x (value) {
        this.coord_x = value;
    }

    get coord_y () {
        return this.coord_y;
    }

    set coord_y (value) {
        this.coord_y = value;
    }
}
