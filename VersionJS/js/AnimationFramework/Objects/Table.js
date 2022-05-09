import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Table extends AnimatedObject {
    
    constructor(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, values, line_height, column_width, font, color, padding, halignment, valignment, has_header_columns, has_header_lines, header_font, header_color, header_background_color) {
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
        this.has_header_lines = has_header_lines;
        this.header_font = header_font;
        this.header_color = header_color;
        this.header_background_color = header_background_color;

        this.value_tab = [];
        this.index_tab = [];
        this.coord_cells = new Map();
        this.nb_columns = 0;
        this.nb_lines = 0;
        this.fillValueTab();
        this.fillCoordCells();
    }

    setX(x) {
        super.setX(x);
        this.fillCoordCells();
    }

    setY(y) {
        super.setY(y);
        this.fillCoordCells();
    }

	getColor () {
		return this.color;
	}

    getColumn_width() {
        return this.column_width;
    }

    getFont() {
		return this.font;
	}

	getHalignment() {
		return this.halignment;
	}

    getHasHeaderColumns() {
        return this.has_header_columns;
    }

    getHasHeaderLines() {
        return this.has_header_lines;
    }

    getHeaderBackgroundColor() {
        return this.header_background_color;
    }

    getHeaderColor() {
        return this.header_color;
    }

    getHeaderFont() {
        return this.header_font;
    }

    getLine_height() {
        return this.line_height;
    }

    getPadding() {
		return this.padding;
	}

	getValignment() {
		return this.valignment;
	}

    getValues() {
        return this.values;
    }
    
    setColor(color) {
        this.color = color;
    }

    setColumn_width(column_width) {
        this.column_width = column_width;
        this.fillCoordCells();
    }

    setFont(font) {
        this.font = font;
    }
    
    setHalignment(halignment) {
        this.halignment = halignment;
    }

    setHasHeaderColumns(has_header_columns) {
        this.has_header_columns = has_header_columns;
    }

    setHasHeaderColumns(has_header_lines) {
        this.has_header_lines = has_header_lines;
    }

    setHeaderBackgroundColor(header_background_color) {
        this.header_background_color = header_background_color;
    }

    setHeaderColor(header_color) {
        this.header_color = header_color;
    }

    setHeaderFont(header_font) {
        this.header_font = header_font;
    }

    setLine_height(line_height) {
        this.line_height = line_height;
        this.fillCoordCells();
    }

	setPadding(padding) {
		this.padding = padding;
	}

	setValignment(valignment) {
		this.valignment = valignment;
	}

    setValues(values) {
        this.values = values;
        this.fillValueTab();
        this.fillCoordCells();
    }

    fillValueTab() {
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
        this.nb_lines = this.value_tab.length;
    }

    fillCoordCells() {
        this.index_tab = [];
        for (let i = 0; i < this.nb_lines; i++) {

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

    draw(drawing) {
        super.draw(drawing);
        drawing.rect(this.x, this.y, this.column_width * this.nb_columns, this.line_height * this.nb_lines);


        if (this.has_header_columns) {
            drawing.push();
            drawing.fill(this.header_background_color[0], this.header_background_color[1], this.header_background_color[2], this.opacity * 255);
            drawing.rect(this.x, this.y, this.column_width * this.nb_columns, this.line_height);
            drawing.pop();
        }

        if (this.has_header_lines) {
            drawing.push();
            drawing.fill(this.header_background_color[0], this.header_background_color[1], this.header_background_color[2], this.opacity * 255);
            drawing.rect(this.x, this.y, this.column_width, this.line_height * this.nb_lines);
            drawing.pop();
        }

        for (let i = 1; i < this.nb_lines; ++i) {
            drawing.line(this.x, this.y + i * this.line_height, this.x + this.column_width * this.nb_columns, this.y + i * this.line_height);
        }
        for (let i = 1; i < this.nb_columns; ++i) {
            drawing.line(this.x + i * this.column_width, this.y, this.x + i * this.column_width, this.y + this.line_height * this.nb_lines);
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
            let index_value = this.index_tab[i];
            let coords = this.coord_cells.get(index_value);
            let value = this.value_tab[index_value[0]][index_value[1]]

            if (value != null) {
                if ((this.has_header_columns && index_value[0] == 0) || (this.has_header_lines && index_value[1] == 0)) {
                    drawing.push();
                    if (this.header_color != null) {
                        drawing.fill(this.header_color[0], this.header_color[1], this.header_color[2], this.opacity * 255);
                    }
                    if (this.header_font != null) {
                        drawing.textFont(this.header_font[0]);
                        drawing.textSize(parseInt(this.header_font[1]));
                        drawing.textStyle(this.header_font[2] == "bold" ? drawing.BOLD : this.header_font[2] == "italic" ? drawing.ITALIC : drawing.NORMAL);
                    }
                    drawing.text(value, coords[0] + this.padding, coords[1] + this.padding / 2, this.column_width, this.line_height);
                    drawing.pop();
                } else {
                    drawing.text(value, coords[0] + this.padding, coords[1] + this.padding / 2, this.column_width, this.line_height);
                }
            }
        }
    }

    isClicked(x, y) {
        return (x >= this.x) && (x <= this.nb_columns * this.column_width) && (y >= this.y) && (y <= this.nb_lines * this.line_height);
    }

    toXml() {
        let table = document.createElement("object_table");
        table.innerHTML = this.id;
        table.setAttribute("x", this.x);
        table.setAttribute("y",this.y);
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
		table.setAttribute("halignment",this.halignment); 
		table.setAttribute("valignment", this.valignment);
        table.setAttribute("line_height", this.line_height);
        table.setAttribute("column_width", this.column_width);
        table.setAttribute("has_header_columns", this.has_header_columns);
        table.setAttribute("has_header_lines", this.has_header_lines);
        table.setAttribute("header_background_color", this.header_background_color);
        table.setAttribute("header_color", this.header_color);
        table.setAttribute("header_font", this.header_font);
        return table;
    }

    clone() {
        return new Table(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.border_size, this.state, this.layer, this.visible, this.opacity, this.angle, this.values, this.line_height, this.column_width, this.font, this.color, this.padding, this.halignment, this.valignment, this.has_header_columns, this.has_header_lines, this.header_font, this.header_color, this.header_background_color);
    }

}
