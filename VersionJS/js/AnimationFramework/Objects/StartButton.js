import { DEFAULT_STATE, AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class StartButton extends AnimatedObject {

    /**
     * The text that will be show
     * @type string
     */
    _text;
    get text () {
        return this._text;
    }
    set text (value) {
        this._text = value;
    }

    /**
     * Is the button present
     * @type bool
     */
    _present;
    get present () {
        return this._present;
    }
    set present (value) {
        this._present = value;
    }

    /**
     * The text font size
     * @type number
     */
    _font_size;
    get font_size () {
        return this._font_size;
    }
    set font_size (value) {
        this._font_size = value;
    }

    /**
     * Button's width
     * @type number
     */
    _width;
    get width () {
        return this._width;
    }
    set width (value) {
        this._width = value;
    }

    /**
     * Button's height
     * @type number
     */
    _height;
    get height () {
        return this._height;
    }
    set height (value) {
        this._height = value;
    }

    constructor (x, y, text, present) {
        super(null, x, y, [255, 255, 255], false, [0, 0, 0], false, 1, DEFAULT_STATE, null, true, 1, 0);
        this._text = text;
        this._present = present;

        this._font_size = 12;
        this._width = this._text.length * (parseInt(this._font_size) / 2 + 1) + 2;
        this._height = (this._font_size + 13) * ((this._text.match(/@/g) || []).length + 1);
    }

    draw (drawing) {
      drawing.push();
        super.draw(drawing);
        // Background
        drawing.rect(this._x - this._width / 2 + 2, this._y - this._height / 2 + 2, this._width, this._height);
        // Text's color, size and style
        drawing.noStroke();
        drawing.fill(0, 0, 255, this._opacity * 255);
        drawing.textSize(this._font_size);
        drawing.textStyle(drawing.NORMAL);
        // Text alignment
        drawing.textAlign(drawing.CENTER, drawing.CENTER);
        // Display
        drawing.text(this._text.replaceAll("@", "\n"), this._x + 2, this._y + 4);
    }

    isClicked (x, y,drawing) {
        return (x >= this._x - this._width / 2 + 2) && (x <= this._x + this._width / 2 + 2) && (y >= this._y - this._height / 2 + 2) && (y <= this._y + this._height / 2 + 2);
    }
}
