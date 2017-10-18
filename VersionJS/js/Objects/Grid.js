class Grid extends AnimatedObject {
    constructor(id, x, y, image, fgcolor, bgcolor, state, layer, line, column, lineHeight, columnnHeight) {
        super(id, x, y, fgcolor, bgcolor, state, layer);
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

}