/**
 * 
 */

// File-shared object's states
export let DEFAULT_STATE = "normal";
export let WAITING_CLICK_STATE = "waiting_click";
export let SLEEPING_STATE = "sleeping";
export let MOVING_STATE = "moving";

export class AnimatedObject {

    /** Id of the object in the xml  
     * @type string */
    _id;
    get id () {
        return this._id;
    }
    set id (value) {
        this._id = value;
    }

    /** X coordinate 
     * @type number */
    _x;
    get x () {
        return this._x;
    }
    set x (value) {
        this._x = value;
    }

    /** Y coordinate
     * @type number */
    _y;
    get y () {
        return this._y;
    }
    set y (value) {
        this._y = value;
    }

    /** background_color
     * @type string*/
    _background_color;
    get background_color () {
        return this._background_color;
    }
    set background_color (value) {
        this._background_color = value;
    }

    /** background_transparent
     * @type bool */
    _background_transparent;
    get background_transparent () {
        return this._background_transparent;
    }
    set background_transparent (value) {
        this._background_transparent = value;
    }

    /** border_color
     * @type string */
    _border_color;
    get border_color () {
        return this._border_color;
    }
    set border_color (value) {
        this._border_color = value;
    }

    /** border_transparency
     * @type bool */
    _border_transparency;
    get border_transparency () {
        return this._border_transparency;
    }
    set border_transparency (value) {
        this._border_transparency = value;
    }

    /** border_size
     * @type number */
    _border_size;
    get border_size () {
        return this._border_size;
    }
    set border_size (value) {
        this._border_size = value;
    }

    /** state
     * @type string */
    _state;
    get state () {
        return this._state;
    }
    set state (value) {
        this._state = value;
    }

    /** layer which will be draw
     * @type number
     */
    _layer;
    get layer () {
        return this._layer;
    }
    set layer (value) {
        this._layer = value;
    }

    /** Is it visible or not
     * @type bool
     */
    _visible;
    get visible () {
        return this._visible;
    }
    set visible (value) {
        this._visible = value;
    }

    /**
     * opacity
     * @type number
     */
    _opacity;
    get opacity () {
        return this._opacity;
    }
    set opacity (value) {
        this._opacity = value;
    }

    /**
     * angle
     * @type [number]
     */
    _angle;


    constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle) {
        this._id = id;
        this._x = x;
        this._y = y;
        this._background_color = background_color; // r, g, b
        this._background_transparent = background_transparent;
        this._border_color = border_color; // r, g, b
        this._border_transparency = border_transparency;
        this._border_size = border_size;
        this._state = state;
        this._layer = layer;
        this._visible = visible;
        this._opacity = opacity;
        this._angle = angle; // degrees
    }

    draw (drawing) {
        // Fill
        if (this.background_transparent) drawing.fill(0, 0);
        else drawing.fill(this.background_color[0], this.background_color[1], this.background_color[2], this.opacity * 255); // fill([r, g, b], opacity) doesn't work :)
        // Border
        if (this.border_transparency) drawing.noStroke();
        else drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
        drawing.strokeWeight(this.border_size);
    }

    get angle () {
        return this._angle;
    }
    set angle (value) {
        this._angle = value;
    }
}
