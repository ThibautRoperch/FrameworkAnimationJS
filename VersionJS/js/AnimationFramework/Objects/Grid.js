/**
 * 
 */

class Grid extends AnimatedObject {
    
    constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, lines, columns, line_height, column_width) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle);
        this.lines = lines;
        this.columns = columns;
        this.line_height = line_height;
        this.column_width = column_width;
    }

    getLines() {
        return this.lines;
    }

    getLine_height() {
        return this.line_height;
    }

    getColumns() {
        return this.columns;
    }

    getColumn_width() {
        return this.column_width;
    }

    setLines(lines) {
        this.lines = lines;
    }

    setLine_height(line_height) {
        return this.line_height = line_height;
    }

    setColumns(columns) {
        this.columns = columns;
    }

    setColumn_width(column_width) {
        this.column_width = column_width;
    }

    draw(drawing) {
        super.draw(drawing);
        for (i = 0; i < lines + 1; ++i) {
            // drawing.
        }
    }

    isClicked() {
        if((x >= this.x) && (x <= this.columns * this.column_width) && (y >= this.y) && (y <= this.lines * this.line_height))
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
        grid.setAttribute("line_height", this.line_height);
        grid.setAttribute("column_width", this.column_width);
        return grid;
    }

    clone() {
        return new Grid(this.id, this.x, this.y, this.bgcolor, this.bgtransparent, this.bocolor, this.botransparent, this.state, this.layer, this.visible, this.opacity, this.angle, this.lines, this.columns, this.line_height, this.column_width);
    }

}
