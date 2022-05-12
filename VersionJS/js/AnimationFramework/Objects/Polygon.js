import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Polygon extends AnimatedObject {
    
	constructor(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, coord_x, coord_y) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this.coord_x = coord_x; // x coords' list
        this.coord_y = coord_y; // y coords' list
    }

    getCoordx() {
        return this.coord_x;
    }

    getCoordy() {
        return this.coord_y;
    }

    setCoordx(coord_x) {
        this.coord_x = coord_x;
    }

    setCoordy(coord_y) {
        this.coord_y = coord_y;
    }

    draw(drawing) {
        super.draw(drawing);
        drawing.beginShape();
        for (let i = 0; i < this.coord_x.length; ++i) {
            drawing.vertex(this.x + this.coord_x[i], this.y + this.coord_y[i]);
        }
        drawing.endShape(drawing.CLOSE);
    }
    
    isClicked(x, y, drawing) {
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
    
    toXml() {
        let polygon = document.createElement("object_polygon");
        polygon.innerHTML = this.id;
        polygon.setAttribute("x", this.x);
        polygon.setAttribute("y",this.y);
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

    clone() {
        return new Polygon(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.state, this.layer, this.visible, this.opacity, this.angle, this.coord_x, this.coord_y);
    }

}
