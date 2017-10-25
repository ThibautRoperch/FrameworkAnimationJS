/**
 * 
 */

class Grid extends AnimatedObject {
    
    constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity,angle, line, column, lineHeight, columnnHeight) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle);
        this.line = line;
        this.column = column;
        this.lineHeight = lineHeight;
        this.columnnHeight = columnnHeight;
    }

    getline() {
        return this.line;
    }

    getLineHeight() {
        return this.lineHeight;
    }

    getColumn() {
        return this.column;
    }

    getColumnHeight() {
        return this.columnnHeight;
    }

    setLine(line) {
        this.line = line;
    }

    setLineHeight(lineHeight) {
        return this.lineHeight = lineHeight;
    }

    setColumn(column) {
        this.column = column;
    }

    setColumnHeight(columnnHeight) {
        this.columnnHeight = columnnHeight;
    }

    isClicked() {
        if((x >= this.x) && (x <= this.x + this.width) && (y >= this.y) && (y <= this.y + this.height))
            return true;
        return false;        
    }

    toXml() {
        
        var grid = document.createElement("object_grid");
        grid.setAttribute("id", this.id); 
        grid.setAttribute("x", this.x);
        grid.setAttribute("y",this.y);
        grid.setAttribute("bgcolor", this.bgcolor); // r, g, b
        grid.setAttribute("bgtransparent", this.bgtransparent);
        grid.setAttribute("bocolor", this.bocolor); // r, g, b
        grid.setAttribute("botransparent", this.botransparent);
        grid.setAttribute("state", this.state);
        grid.setAttribute("layer", this.layer);
        grid.setAttribute("visible", this.visible);
        grid.setAttribute("opacity", this.opacity);
        grid.setAttribute("angle", this.angle); // degrees
        grid.setAttribute("line", this.line);
        grid.setAttribute("column", this.column);
        grid.setAttribute("lineHeight", this.lineHeight);
        grid.setAttribute("columnHeight", this.columnnHeight);
        return grid;
    }
}
