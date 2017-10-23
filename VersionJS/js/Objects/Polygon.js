/**
 * 
 */

class Polygon extends AnimatedObject {
    
	constructor(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, coord_x, coord_y) {
        super(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity);
        this.coord_x = coord_x;
        this.coord_y = coord_y;
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
        // var angle = TWO_PI / npoints;
        // beginShape();
        // for (var a = 0; a < TWO_PI; a += angle) {
        //     var sx = x + cos(a) * radius;
        //     var sy = y + sin(a) * radius;
        //     vertex(sx, sy);
        // }
        // endShape(CLOSE);
    }
    
}
