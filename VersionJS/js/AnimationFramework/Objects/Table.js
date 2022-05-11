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
    values;

    /**
     * The line's height
     * @type number
     */
    line_height;

    /**
     * The column's width
     * @type number
     */
    column_width;

    /**
     * The font caracteristic
     * FontName, FontSize, FontWeight
     * @type string
     */
    font;

    /**
     * The normal text color
     * r, g, b
     * @type string
     */
    color;

    /**
     * The padding in the xml
     * top, right, bottom, left or 1 value for all
     * @type string
     */
    padding;

    /**
     * The text horizontal alignement
     * @type string
     */
    halignment;

    /**
     * The text vertical alignement
     * @type string
     */
    valignment;

    /**
     * Presence of header on the column
     * @type bool
     */
    has_header_columns;

    /**
     * Presence of header on the rows
     * @type bool
     */
    has_header_rows;

    /**
     * The font caracteristic of the text in header
     * FontName, FontSize, FontWeight
     * @type string
     */
    header_font;

    /**
     * The color of the text in header
     * r, g, b
     * @type string
     */
    header_color;

    /**
     * The background color of the text in header
     * r, g, b
     * @type string
     */
    header_background_color;

    /**
     * 2D array of the cells value
     * @type [[number]]
     */
    value_tab;

    /**
     * Array of the cells index in value_tab
     * @type [[number, number]]
     */
    index_tab;

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
    nb_columns;

    /**
     * Number of rows
     * @type number
     */
    nb_row;

    /**
     * padding_top
     * @type number
     */
    padding_top;

    /**
     * padding_right
     * @type number
     */
    padding_right;

    /**
     * padding_bottom
     * @type number
     */
    padding_bottom;

    /**
     * padding_left
     * @type number
     */
    padding_left;

    constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, values, line_height, column_width, font, color, padding, halignment, valignment, has_header_columns, has_header_rows, header_font, header_color, header_background_color) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this.values = values; // row1col1 | row1col2 | row1col3 $ row2col1 | row2col1
        this.line_height = line_height;
        this.column_width = column_width;
        this.font = font; // FontName, FontSize, FontWeight
        this.color = color; // r, g, b
        this.padding = padding;
        this.halignment = halignment;
        this.valignment = valignment;
        this.has_header_columns = has_header_columns;
        this.has_header_rows = has_header_rows;
        this.header_font = header_font; // FontName, FontSize, FontWeight
        this.header_color = header_color; // r, g, b
        this.header_background_color = header_background_color; // r, g, b

        this.value_tab = [];
        this.index_tab = [];
        this.coord_cells = new Map();
        this.nb_columns = 0;
        this.nb_row = 0;
        this.padding_top = 0;
        this.padding_right = 0;
        this.padding_bottom = 0;
        this.padding_left = 0;
        this.fillValueTab();
        this.fillCoordCells();
        this.setPaddingValues();
    }

    draw (drawing) {
        super.draw(drawing);
        drawing.rect(this.x, this.y, this.column_width * this.nb_columns, this.line_height * this.nb_row);


        if (this.has_header_columns) {
            drawing.push();
            drawing.fill(this.header_background_color[0], this.header_background_color[1], this.header_background_color[2], this.opacity * 255);
            drawing.rect(this.x, this.y, this.column_width * this.nb_columns, this.line_height);
            drawing.pop();
        }

        if (this.has_header_rows) {
            drawing.push();
            drawing.fill(this.header_background_color[0], this.header_background_color[1], this.header_background_color[2], this.opacity * 255);
            drawing.rect(this.x, this.y, this.column_width, this.line_height * this.nb_row);
            drawing.pop();
        }

        for (let i = 1; i < this.nb_row; ++i) {
            drawing.line(this.x, this.y + i * this.line_height, this.x + this.column_width * this.nb_columns, this.y + i * this.line_height);
        }
        for (let i = 1; i < this.nb_columns; ++i) {
            drawing.line(this.x + i * this.column_width, this.y, this.x + i * this.column_width, this.y + this.line_height * this.nb_row);
        }

        drawing.fill(this.color[0], this.color[1], this.color[2], this.opacity * 255);
        drawing.textFont(this.font[0]);
        drawing.textSize(parseInt(this.font[1]));
        drawing.textStyle(this.font[2] == "bold" ? drawing.BOLD : this.font[2] == "italic" ? drawing.ITALIC : drawing.NORMAL);
        // Text alignment
        drawing.textAlign(this.halignment == "right" ? drawing.RIGHT : this.halignment == "center" ? drawing.CENTER : drawing.LEFT,
            this.valignment == "center" ? drawing.CENTER : this.valignment == "bottom" ? drawing.BOTTOM : this.valignment == "baseline" ? drawing.BASELINE : drawing.TOP);
        drawing.noStroke();

        for (let i = 0; i < this.index_tab.length; i++) {
            let index_value = this.index_tab[i]; // index_value[0] -> n° column ; index_value[1] -> n° row
            let coords = this.coord_cells.get(index_value); // coords[0] -> x ; coords[1] -> y
            let value = this.value_tab[index_value[0]][index_value[1]];

            if (value != null) {
                if ((this.has_header_columns && index_value[0] == 0) || (this.has_header_rows && index_value[1] == 0)) {
                    drawing.push();
                    if (this.header_color != null) {
                        drawing.fill(this.header_color[0], this.header_color[1], this.header_color[2], this.opacity * 255);
                    }
                    if (this.header_font != null) {
                        drawing.textFont(this.header_font[0]);
                        drawing.textSize(parseInt(this.header_font[1]));
                        drawing.textStyle(this.header_font[2] == "bold" ? drawing.BOLD : this.header_font[2] == "italic" ? drawing.ITALIC : drawing.NORMAL);
                    }
                    this.drawText(drawing, value, coords[0], coords[1]);
                    drawing.pop();
                } else {
                    this.drawText(drawing, value, coords[0], coords[1]);
                }
            }
        }
    }

    drawText (drawing, text, x, y) {
        switch (this.halignment) {
            case "left":
                x += this.padding_left;
                break;
            case "right":
                x -= this.padding_right;
                break;
        }

        switch (this.valignment) {
            case "top":
                y += this.padding_top;
                break;
            case "bottom":
                y -= this.padding_bottom;
        }
        drawing.text(text, x, y, this.column_width, this.line_height);
    }

    isClicked (x, y) {
        return (x >= this.x) && (x <= this.nb_columns * this.column_width) && (y >= this.y) && (y <= this.nb_row * this.line_height);
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
        return table;
    }

    clone () {
        return new Table(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.border_size, this.state, this.layer, this.visible, this.opacity, this.angle, this.values, this.line_height, this.column_width, this.font, this.color, this.padding, this.halignment, this.valignment, this.has_header_columns, this.has_header_rows, this.header_font, this.header_color, this.header_background_color);
    }

    fillValueTab () {
        let rows = this.values.split("$");
        let columns;
        this.value_tab = [];
        for (let row of rows) {
            columns = row.split("|");
            let rowTab = [];
            for (let column of columns) {
                rowTab.push(column.trim().replaceAll("@", "\n"));
            }
            this.value_tab.push(rowTab);

            if (columns.length > this.nb_columns) {
                this.nb_columns = columns.length;
            }
        }
        this.nb_row = this.value_tab.length;
    }

    fillCoordCells () {
        this.index_tab = [];
        for (let i = 0; i < this.nb_row; i++) {

            let y_start = this.y + i * this.line_height;
            let y_end = y_start + this.line_height;

            for (let j = 0; j < this.nb_columns; j++) {

                let x_start = this.x + j * this.column_width;
                let x_end = x_start + this.column_width;
                let index_value = [i, j];
                let cell = [x_start, y_start, x_end, y_end];
                this.coord_cells.set(index_value, cell);
                this.index_tab.push(index_value);
            }
        }
    }

    setPaddingValues () {
        switch (this.padding.length) {
            case 1:
                this.padding_top = this.padding[0];
                this.padding_right = this.padding[0];
                this.padding_bottom = this.padding[0];
                this.padding_left = this.padding[0];
                break;
            case 4:
                this.padding_top = this.padding[0];
                this.padding_right = this.padding[1];
                this.padding_bottom = this.padding[2];
                this.padding_left = this.padding[3];
                break;
        }
    }

    set x (value) {
        this.x = value;
        this.fillCoordCells();
    }

    set y (value) {
        this.y = y;
        this.fillCoordCells();
    }

    get values () {
        return this.values;
    }

    set values (value) {
        this.values = value;
        this.fillValueTab();
        this.fillCoordCells();
    }

    get color () {
        return this.color;
    }

    set color (value) {
        this.color = value;
    }

    get line_height () {
        return this.line_height;
    }

    set line_height (value) {
        this.line_height = value;
        this.fillCoordCells();
    }

    get column_width () {
        return this.column_width;
    }

    set column_width (value) {
        this.column_width = value;
        this.fillCoordCells();
    }

    get font () {
        return this.font;
    }

    set font (value) {
        this.font = value;
    }

    get padding () {
        return this.padding;
    }

    set padding (value) {
        this.padding = value;
        this.setPaddingValues();
    }

    get halignment () {
        return this.halignment;
    }

    set halignment (value) {
        this.halignment = value;
    }

    get valignment () {
        return this.valignment;
    }

    set valignment (value) {
        this.valignment = value;
    }

    get valignment () {
        return this.valignment;
    }

    set valignment (value) {
        this.valignment = value;
    }

    get has_header_columns () {
        return this.has_header_columns;
    }

    set has_header_columns (value) {
        this.has_header_columns = value;
    }

    get has_header_rows () {
        return this.has_header_rows;
    }

    set has_header_rows (value) {
        this.has_header_rows = value;
    }

    get header_background_color () {
        return this.header_background_color;
    }

    set header_background_color (value) {
        this.header_background_color = value;
    }

    get header_color () {
        return this.header_color;
    }

    set header_color (value) {
        this.header_color = value;
    }

    get header_font () {
        return this.header_font;
    }
    set header_font (value) {
        this.header_font = value;
    }
}
