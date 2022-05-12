import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Grid extends AnimatedObject {

    /**
     * The number of lines
     * @type number
     */
    _lines;
    get lines () {
        return this._lines;
    }
    set lines (value) {
        this._lines = value;
    }

    /**
     * The number of columns
     * @type number
     */
    _columns;
    get columns () {
        return this._columns;
    }
    set columns (value) {
        this._columns = value;
    }

    /**
     * The line height
     * @type number
     */
    _line_height;
    get line_height () {
        return this._line_height;
    }
    set line_height (value) {
        this._line_height = value;
    }

    /** 
     * The column width
     * @type number
     */
    _column_width;
    get column_width () {
        return this._column_width;
    }
    set column_width (value) {
        this._column_width = value;
    }

    constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, lines, columns, line_height, column_width) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this._lines = lines;
        this._columns = columns;
        this._line_height = line_height;
        this._column_width = column_width;
    }

    draw (drawing) {
        super.draw(drawing);
        drawing.rect(this._x, this._y, this._column_width * this._columns, this._line_height * this._lines);
        for (let i = 1; i < this._lines; ++i) {
            drawing.line(this._x, this._y + i * this._line_height, this._x + this._column_width * this._columns, this._y + i * this._line_height);
        }
        for (let i = 1; i < this._columns; ++i) {
            drawing.line(this._x + i * this._column_width, this._y, this._x + i * this._column_width, this._y + this._line_height * this._lines);
        }
    }

    isClicked (x, y) {
        return (x >= this._x) && (x <= this._columns * this._column_width) && (y >= this._y) && (y <= this._lines * this._line_height);
    }

    toXml () {
        let grid = document.createElement("object_grid");
        grid.innerHTML = this.id;
        grid.setAttribute("x", this._x);
        grid.setAttribute("y", this._y);
        grid.setAttribute("background_color", this._background_color); // r, g, b
        grid.setAttribute("background_transparent", this._background_transparent);
        grid.setAttribute("border_color", this._border_color); // r, g, b
        grid.setAttribute("border_transparency", this._border_transparency);
        grid.setAttribute("border_size", this._border_size);
        grid.setAttribute("layer", this._layer);
        grid.setAttribute("visible", this._visible);
        grid.setAttribute("opacity", this._opacity);
        // grid.setAttribute("angle", this._angle); // degrees
        grid.setAttribute("lines", this._lines);
        grid.setAttribute("columns", this._columns);
        grid.setAttribute("line_height", this._line_height);
        grid.setAttribute("column_width", this._column_width);
        return grid;
    }

    clone () {
        return new Grid(this.id, this._x, this._y, this._background_color, this._background_transparent, this._border_color, this._border_transparency, this._state, this._layer, this._visible, this._opacity, this._angle, this._lines, this._columns, this._line_height, this._column_width);
    }
}
