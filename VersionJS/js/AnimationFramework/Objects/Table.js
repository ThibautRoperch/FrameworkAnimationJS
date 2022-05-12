import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Table extends AnimatedObject {

    /**
     * String of the cells value
     * row1col1 | row1col2 | row1col3 $ row2col1 | row2col1
     * @type string
     */
    _values;

    /**
     * The line's height
     * @type number
     */
    _line_height;

    /**
     * The column's width
     * @type number
     */
    _column_width;

    /**
     * The font caracteristic
     * FontName, FontSize, FontWeight
     * @type string
     */
    _font;

    /**
     * The normal text color
     * r, g, b
     * @type string
     */
    _color;

    /**
     * The padding in the xml
     * top, right, bottom, left or 1 value for all
     * @type string
     */
    _padding;

    /**
     * The text horizontal alignement
     * @type string
     */
    _halignment;

    /**
     * The text vertical alignement
     * @type string
     */
    _valignment;

    /**
     * Presence of header on the column
     * @type bool
     */
    _has_header_columns;

    /**
     * Presence of header on the rows
     * @type bool
     */
    _has_header_rows;

    /**
     * The font caracteristic of the text in header
     * FontName, FontSize, FontWeight
     * @type string
     */
    _header_font;

    /**
     * The color of the text in header
     * r, g, b
     * @type string
     */
    _header_color;

    /**
     * The background color of the text in header
     * r, g, b
     * @type string
     */
    _header_background_color;

    /**
     * 2D array of the cells value
     * @type [[number]]
     */
    _value_tab;

    /**
     * Array of the cells index in value_tab
     * @type [[number, number]]
     */
    _index_tab;

    /**
     * Coordinate of each cells
     * [[x_start, y_start, x_end, y_end]]
     * @type [[number, number, number, number]]
     */
    coord_cells;

    /**
     * Number of columns
     * @type number
     */
    _nb_columns;

    /**
     * Number of rows
     * @type number
     */
    _nb_row;

    /**
     * padding_top
     * @type number
     */
    _padding_top;

    /**
     * padding_right
     * @type number
     */
    _padding_right;

    /**
     * padding_bottom
     * @type number
     */
    _padding_bottom;

    /**
     * padding_left
     * @type number
     */
    _padding_left;

    _header_column_width;

    _header_line_height;

    constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, values, line_height, column_width, font, color, padding, halignment, valignment, has_header_columns, has_header_rows, header_font, header_color, header_background_color, header_column_width, header_line_height) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this._values = values; // row1col1 | row1col2 | row1col3 $ row2col1 | row2col1
        this._line_height = line_height;
        this._column_width = column_width;
        this._font = font; // FontName, FontSize, FontWeight
        this._color = color; // r, g, b
        this._padding = padding;
        this._halignment = halignment;
        this._valignment = valignment;
        this._has_header_columns = has_header_columns;
        this._has_header_rows = has_header_rows;
        this._header_font = header_font; // FontName, FontSize, FontWeight
        this._header_color = header_color; // r, g, b
        this._header_background_color = header_background_color; // r, g, b
        this._header_column_width = header_column_width;
        this._header_line_height = header_line_height;

        this._value_tab = [];
        this._index_tab = [];
        this._coord_cells = new Map();
        this._nb_columns = 0;
        this._nb_rows = 0;
        this._padding_top = 0;
        this._padding_right = 0;
        this._padding_bottom = 0;
        this._padding_left = 0;
        this.fillValueTab();
        this.fillCoordCells();
        this.setPaddingValues();
    }

    draw (drawing) {
        super.draw(drawing);
        drawing.rect(this._x, this._y, this._header_column_width + this._column_width * (this._nb_columns - 1), this._header_line_height + this._line_height * (this._nb_rowss - 1));

        if (this._has_header_columns) {
            drawing.push();
            drawing.fill(this._header_background_color[0], this._header_background_color[1], this._header_background_color[2], this._opacity * 255);
            drawing.rect(this._x, this._y, this._header_column_width + this._column_width * (this._nb_columns-1), this._header_line_height);
            drawing.pop();
        }

        if (this._has_header_rows) {
            drawing.push();
            drawing.fill(this._header_background_color[0], this._header_background_color[1], this._header_background_color[2], this._opacity * 255);
            drawing.rect(this._x, this._y, this._header_column_width, this._header_line_height + this._line_height * (this._nb_rows - 1));
            drawing.pop();
        }

        for (let i = 1; i < this._nb_rows; ++i) {
            if (this.has_header_rows && i == 1) {
                drawing.line(this._x, this._y + this._header_line_height, this._x + this._header_column_width + this._column_width * (this._nb_columns-1), this._y + this._header_line_height);
            } else {
                drawing.line(this._x, this._y + this._header_line_height + (i - 1) * this._line_height, this._x + this._header_column_width + this._column_width * (this._nb_columns-1), this._y + this._header_line_height + (i - 1) * this._line_height);
            }
        }
        for (let i = 1; i < this._nb_columns; ++i) {
            if (this.has_header_columns && i == 1) {
                drawing.line(this._x + i * this._header_column_width, this._y, this._x + i * this._header_column_width, this._y + this._header_line_height + this._line_height * (this._nb_rows-1));
            } else {
                drawing.line(this._x + this._header_column_width + (i - 1) * this._column_width, this._y, this._x + this._header_column_width + (i - 1) * this._column_width, this._y + this._header_line_height + this._line_height * (this._nb_rows - 1));
            }
        }

        drawing.fill(this._color[0], this._color[1], this._color[2], this._opacity * 255);
        drawing.textFont(this._font[0]);
        drawing.textSize(parseInt(this._font[1]));
        drawing.textStyle(this._font[2] == "bold" ? drawing.BOLD : this._font[2] == "italic" ? drawing.ITALIC : drawing.NORMAL);
        // Text alignment
        drawing.textAlign(this._halignment == "right" ? drawing.RIGHT : this._halignment == "center" ? drawing.CENTER : drawing.LEFT,
            this._valignment == "center" ? drawing.CENTER : this._valignment == "bottom" ? drawing.BOTTOM : this._valignment == "baseline" ? drawing.BASELINE : drawing.TOP);
        drawing.noStroke();

        for (let i = 0; i < this._index_tab.length; i++) {
            let index_value = this._index_tab[i]; // index_value[0] -> n° column ; index_value[1] -> n° row
            let coords = this._coord_cells.get(index_value); // coords[0] -> x ; coords[1] -> y
            let value = this._value_tab[index_value[0]][index_value[1]];

            if (value != null) {
                if ((this._has_header_columns && index_value[0] == 0) || (this._has_header_rows && index_value[1] == 0)) {
                    drawing.push();
                    if (this._header_color != null) {
                        drawing.fill(this._header_color[0], this._header_color[1], this._header_color[2], this._opacity * 255);
                    }
                    if (this._header_font != null) {
                        drawing.textFont(this._header_font[0]);
                        drawing.textSize(parseInt(this._header_font[1]));
                        drawing.textStyle(this._header_font[2] == "bold" ? drawing.BOLD : this._header_font[2] == "italic" ? drawing.ITALIC : drawing.NORMAL);
                    }
                    this.drawText(drawing, value, coords[0], coords[1], coords[2]- coords[0], coords[3] - coords[1]);
                    drawing.pop();
                } else {
                    this.drawText(drawing, value, coords[0], coords[1], coords[2]- coords[0], coords[3] - coords[1]);
                }
            }
        }
    }

    drawText (drawing, text, x, y, width, height) {
        switch (this._halignment) {
            case "left":
                x += this._padding_left;
                break;
            case "right":
                x -= this._padding_right;
                break;
        }

        switch (this._valignment) {
            case "top":
                y += this._padding_top;
                break;
            case "bottom":
                y -= this._padding_bottom;
        }
        drawing.text(text, x, y, width, height);
    }

    isClicked (x, y) {
        return (x >= this._x) && (x <= this._nb_columns * this._column_width) && (y >= this._y) && (y <= this._nb_rows * this._line_height);
    }

    toXml () {
        let table = document.createElement("object_table");
        table.innerHTML = this.id;
        table.setAttribute("x", this.x);
        table.setAttribute("y", this.y);
        table.setAttribute("background_color", this.background_color); // r, g, b
        table.setAttribute("background_transparent", this.background_transparent);
        table.setAttribute("border_color", this.border_color); // r, g, b
        table.setAttribute("border_transparency", this.border_transparency);
        table.setAttribute("border_size", this.border_size);
        table.setAttribute("layer", this.layer);
        table.setAttribute("visible", this.visible);
        table.setAttribute("opacity", this.opacity);
        // table.setAttribute("angle", this.angle); // degrees
        table.setAttribute("values", this.values);
        table.setAttribute("font", this.font); // FontName, FontSize, FontWeight
        table.setAttribute("color", this.color); // r, g, b
        table.setAttribute("padding", this.padding);
        table.setAttribute("halignment", this.halignment);
        table.setAttribute("valignment", this.valignment);
        table.setAttribute("line_height", this.line_height);
        table.setAttribute("column_width", this.column_width);
        table.setAttribute("has_header_columns", this.has_header_columns);
        table.setAttribute("has_header_rows", this.has_header_rows);
        table.setAttribute("header_background_color", this.header_background_color);
        table.setAttribute("header_color", this.header_color);
        table.setAttribute("header_font", this.header_font);
        table.setAttribute("header_line_height", this._header_line_height);
        table.setAttribute("header_column_width", this._header_column_width);
        return table;
    }

    clone () {
        return new Table(this._id, this._x, this._y, this._background_color, this._background_transparent, this._border_color, this._border_transparency,
            this._border_size, this._state, this._layer, this._visible, this._opacity, this._angle, this._values, this._line_height, this._column_width,
            this._font, this._color, this._padding, this._halignment, this._valignment, this._has_header_columns, this._has_header_rows, this._header_font,
            this._header_color, this._header_background_color, this._header_column_width, this._header_line_height);
    }

    fillValueTab () {
        let rows = this._values.split("$");
        let columns;
        this._value_tab = [];
        for (let row of rows) {
            columns = row.split("|");
            let rowTab = [];
            for (let column of columns) {
                rowTab.push(column.trim().replaceAll("@", "\n"));
            }
            this._value_tab.push(rowTab);

            if (columns.length > this._nb_columns) {
                this._nb_columns = columns.length;
            }
        }
        this._nb_rows = this._value_tab.length;
    }

    fillCoordCells () {
        this._index_tab = [];
        for (let i = 0; i < this._nb_rows; i++) {

            let y_start = (this._has_header_columns && i == 0) ? this._y : this._y + this._header_line_height + (i - 1) * this._line_height;
            let y_end = (this._has_header_columns && i == 0) ? y_start + this._header_line_height : y_start + this._line_height;

            for (let j = 0; j < this._nb_columns; j++) {

                let x_start = (this._has_header_rows && j == 0) ? this._x : this._x + this._header_column_width + (j - 1) * this._column_width;
                let x_end = (this._has_header_rows && j == 0) ? x_start + this._header_column_width : x_start + this._column_width;
                let index_value = [i, j];
                let cell = [x_start, y_start, x_end, y_end];
                this._coord_cells.set(index_value, cell);
                this._index_tab.push(index_value);
            }
        }
    }

    setPaddingValues () {
        switch (this._padding.length) {
            case 1:
                this._padding_top = this._padding[0];
                this._padding_right = this._padding[0];
                this._padding_bottom = this._padding[0];
                this._padding_left = this._padding[0];
                break;
            case 4:
                this._padding_top = this._padding[0];
                this._padding_right = this._padding[1];
                this._padding_bottom = this._padding[2];
                this._padding_left = this._padding[3];
                break;
        }
    }

    set x (value) {
        this._x = value;
        this.fillCoordCells();
    }

    set y (value) {
        this._y = value;
        this.fillCoordCells();
    }

    get values () {
        return this._values;
    }
    set values (value) {
        this.fillValueTab();
        this.fillCoordCells();
        this._values = value;
    }

    get color () {
        return this._color;
    }

    set color (value) {
        this._color = value;
    }

    get line_height () {
        return this._line_height;
    }

    set line_height (value) {
        this._line_height = value;
        this.fillCoordCells();
    }

    get column_width () {
        return this._column_width;
    }

    set column_width (value) {
        this._column_width = value;
        this.fillCoordCells();
    }

    get font () {
        return this._font;
    }

    set font (value) {
        this._font = value;
    }

    get padding () {
        return this._padding;
    }

    set padding (value) {
        this._padding = value;
        this.setPaddingValues();
    }

    get halignment () {
        return this._halignment;
    }

    set halignment (value) {
        this._halignment = value;
    }

    get valignment () {
        return this._valignment;
    }

    set valignment (value) {
        this._valignment = value;
    }

    get valignment () {
        return this._valignment;
    }

    set valignment (value) {
        this._valignment = value;
    }

    get has_header_columns () {
        return this._has_header_columns;
    }

    set has_header_columns (value) {
        this._has_header_columns = value;
    }

    get has_header_rows () {
        return this._has_header_rows;
    }

    set has_header_rows (value) {
        this._has_header_rows = value;
    }

    get header_background_color () {
        return this._header_background_color;
    }

    set header_background_color (value) {
        this._header_background_color = value;
    }

    get header_color () {
        return this._header_color;
    }

    set header_color (value) {
        this._header_color = value;
    }

    get header_font () {
        return this._header_font;
    }
    set header_font (value) {
        this._header_font = value;
    }

    get _header_column_width () {
        return this._header_column_width;
    }
    set _header_column_width (value) {
        this._header_column_width = value;
    }

    get header_line_height () {
        return this._header_line_height;
    }
    set header_line_height (value) {
        this._header_line_height = value;
    }
}