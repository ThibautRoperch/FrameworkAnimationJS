import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Grid extends AnimatedObject {

    /**
     * The number of lines
     * @type number
     */
    lines;

    /**
     * The number of columns
     * @type number
     */
    columns;

    /**
     * The line height
     * @type number
     */
    line_height;

    /** 
     * The column width
     * @type number
     */
    column_width;

    constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, lines, columns, line_height, column_width) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this.lines = lines;
        this.columns = columns;
        this.line_height = line_height;
        this.column_width = column_width;
    }

    draw (drawing) {
        super.draw(drawing);
        drawing.rect(this.x, this.y, this.column_width * this.columns, this.line_height * this.lines);
        for (let i = 1; i < this.lines; ++i) {
            drawing.line(this.x, this.y + i * this.line_height, this.x + this.column_width * this.columns, this.y + i * this.line_height);
        }
        for (let i = 1; i < this.columns; ++i) {
            drawing.line(this.x + i * this.column_width, this.y, this.x + i * this.column_width, this.y + this.line_height * this.lines);
        }
    }

    isClicked (x, y) {
        return (x >= this.x) && (x <= this.columns * this.column_width) && (y >= this.y) && (y <= this.lines * this.line_height);
    }

    toXml () {
        let grid = document.createElement("object_grid");
        grid.innerHTML = this.id;
        grid.setAttribute("x", this.x);
        grid.setAttribute("y", this.y);
        grid.setAttribute("background_color", this.background_color); // r, g, b
        grid.setAttribute("background_transparent", this.background_transparent);
        grid.setAttribute("border_color", this.border_color); // r, g, b
        grid.setAttribute("border_transparency", this.border_transparency);
        grid.setAttribute("border_size", this.border_size);
        grid.setAttribute("layer", this.layer);
        grid.setAttribute("visible", this.visible);
        grid.setAttribute("opacity", this.opacity);
        // grid.setAttribute("angle", this.angle); // degrees
        grid.setAttribute("lines", this.lines);
        grid.setAttribute("columns", this.columns);
        grid.setAttribute("line_height", this.line_height);
        grid.setAttribute("column_width", this.column_width);
        return grid;
    }

    clone () {
        return new Grid(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.state, this.layer, this.visible, this.opacity, this.angle, this.lines, this.columns, this.line_height, this.column_width);
    }

    get lines () {
        return this.lines;
    }

    set lines (value) {
        this.lines = value;
    }

    get columns () {
        return this.columns;
    }

    set columns (value) {
        this.columns = value;
    }

    get line_height () {
        return this.line_height;
    }

    set line_height (value) {
        this.line_height = value;
    }

    get column_width () {
        return this.column_width;
    }

    set column_width (value) {
        this.column_width = value;
    }
}
