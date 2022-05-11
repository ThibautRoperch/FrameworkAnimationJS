import { DEFAULT_STATE, AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class StartButton extends AnimatedObject {

    /**
     * The text that will be show
     * @type string
     */
    text;

    /**
     * Is the button present
     * @type bool
     */
    present;

    /**
     * The text font size
     * @type number
     */
    font_size;

    /**
     * Button's width
     * @type number
     */
    width;

    /**
     * Button's height
     * @type number
     */
    height;

    constructor (x, y, text, present) {
        super(null, x, y, [255, 255, 255], false, [0, 0, 0], false, 1, DEFAULT_STATE, null, true, 1, 0);
        this.text = text;
        this.present = present;

        this.font_size = 12;
        this.width = this.text.length * (parseInt(this.font_size) / 2 + 1) + 2;
        this.height = (this.font_size + 13) * ((this.text.match(/@/g) || []).length + 1);
    }

    draw (drawing) {
        super.draw(drawing);
        // Background
        drawing.rect(this.x - this.width / 2 + 2, this.y - this.height / 2 + 2, this.width, this.height);
        // Text's color, size and style
        drawing.noStroke();
        drawing.fill(0, 0, 255, this.opacity * 255);
        drawing.textSize(this.font_size);
        drawing.textStyle(drawing.NORMAL);
        // Text alignment
        drawing.textAlign(drawing.CENTER, drawing.CENTER);
        // Display
        drawing.text(this.text.replaceAll("@", "\n"), this.x + 2, this.y + 4);
    }

    isClicked (x, y) {
        return (x >= this.x - this.width / 2 + 2) && (x <= this.x + this.width / 2 + 2) && (y >= this.y - this.height / 2 + 2) && (y <= this.y + this.height / 2 + 2);
    }

    get text () {
        return this.text;
    }

    set text (value) {
        this.text = value;
    }

    get present () {
        return this.present;
    }

    set present (value) {
        this.present = value;
    }

    get font_size () {
        return this.font_size;
    }

    set font_size (value) {
        this.font_size = value;
    }

    get width () {
        return this.width;
    }

    set width (value) {
        this.width = value;
    }

    get height () {
        return this.height;
    }

    set height (value) {
        this.height = value;
    }
}
