import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Table extends AnimatedObject {
    
    constructor(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, values, line_height, column_width, font, color, padding, halignment, valignment) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this.values = values; // row1col1 | row1col2 | row1col3 $ row2col1 | row2col1
        this.line_height = line_height;
        this.column_width = column_width;
        this.font = font; // FontName, FontSize, FontWeight
		this.color = color; // r, g, b
		this.padding = padding;
		this.halignment = halignment;
		this.valignment = valignment;

        this.value_tab = [];
        this.index_tab = [];
        this.coord_cells = new Map();
        this.nb_columns = 0;
        this.nb_lines = 0;
        this.fillValueTab();
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
    }

    setFont(font) {
        this.font = font;
    }
    
    setHalignment(halignment) {
        this.halignment = halignment;
    }

    setLine_height(line_height) {
        this.line_height = line_height;
    }

	setPadding(padding) {
		this.padding = padding;
	}

	setValignment(valignment) {
		this.valignment = valignment;
	}

    setValues(values) {
        this.values = values;
    }

    fillValueTab() {
        let rows = this.values.split("$");
        let columns;
        for (let row of rows) {
            columns = row.split("|");
            let rowTab = [];
            for (let column of columns) {
                rowTab.push(column.trim());
            }
            this.value_tab.push(rowTab);

            if (columns.length > this.nb_columns) {
                this.nb_columns = columns.length;
            }
        }
        this.nb_lines = this.value_tab.length;
        console.log("nb columns = ", this.nb_columns);
        console.log("column width", this.column_width);
        console.log("nb lignes = ", this.nb_lines);
        console.log("line height = ", this.line_height);
        console.table(this.value_tab);
    }

    fillCoordCells() {
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
        drawing.textAlign(drawing.CENTER, drawing.CENTER);

        for (let i = 0; i < this.index_tab.length; i++) {
            let index_value = this.index_tab[i];
            let coords = this.coord_cells.get(index_value);
            let value = this.value_tab[index_value[0]][index_value[1]]
            drawing.text(value, coords[0], coords[1], this.column_width, this.line_height);
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
        return table;
    }

    clone() {
        return new Table(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.border_size, this.state, this.layer, this.visible, this.opacity, this.angle, this.values, this.line_height, this.column_width, this.font, this.color, this.padding, this.halignment, this.valignment);
    }

}
