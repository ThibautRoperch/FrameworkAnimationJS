/**
 * 
 */

class Grid extends AnimatedObject {
    
    constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity,angle, lines, columns, lineHeight, columnHeight) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle);
        this.lines = lines;
        this.columns = columns;
        this.lineHeight = lineHeight;
        this.columnHeight = columnHeight;
    }

    getlines() {
        return this.lines;
    }

    getLineHeight() {
        return this.lineHeight;
    }

    getColumns() {
        return this.columns;
    }

    getColumnHeight() {
        return this.columnHeight;
    }

    setLines(lines) {
        this.lines = lines;
    }

    setLineHeight(lineHeight) {
        return this.lineHeight = lineHeight;
    }

    setColumns(columns) {
        this.columns = columns;
    }

    setColumnHeight(columnnHeight) {
        this.columnHeight = columnHeight;
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

    clone() {
        return new ImageFile(this.id, this.x, this.y, this.bgcolor, this.bgtransparent, this.bocolor, this.botransparent, this.state, this.layer, this.visible, this.opacity, this.angle, this.lines, this.columns, this.image);
    }

}
