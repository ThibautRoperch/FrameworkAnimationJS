/**
 * 
 */

class Polygon extends AnimatedObject {
    
	constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, coord_x, coord_y) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle);
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

    draw() {
        super.draw();
        beginShape();
        for (var i = 0; i < this.coord_x.length; ++i) {
            vertex(this.coord_x[i], this.coord_y[i]);
        }
        endShape(CLOSE);
    }
    
    isClicked(x, y) {
        
    }
    
    toXml() {
        
        var polygon = document.createElement("object_polygon");
        polygon.setAttribute("id", this.id); 
        polygon.setAttribute("x", this.x);
        polygon.setAttribute("y",this.y);
        polygon.setAttribute("bgcolor", this.bgcolor);
        polygon.setAttribute("bgtransparent", this.bgtransparent);
        polygon.setAttribute("bocolor", this.bocolor);
        polygon.setAttribute("botransparent", this.botransparent);
        polygon.setAttribute("state", this.state);
        polygon.setAttribute("layer", this.layer);
        polygon.setAttribute("visible", this.visible);
        polygon.setAttribute("opacity", this.opacity);
        polygon.setAttribute("angle", this.angle); 
        polygon.setAttribute("coord_x", this.coord_x);
        polygon.setAttribute("coord_y", this.coord_y);
        return polygon;
    }

    clone() {
        return new Polygon(this.id, this.x, this.y, this.bgcolor, this.bgtransparent, this.bocolor, this.botransparent, this.state, this.layer, this.visible, this.opacity, this.angle, this.coord_x, this.coord_y);
    }

}