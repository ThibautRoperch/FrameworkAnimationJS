/**
 * 
 */

class Grid extends AnimatedObject {
    
    constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, line, column, lineHeight, columnnHeight) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity);
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

}
