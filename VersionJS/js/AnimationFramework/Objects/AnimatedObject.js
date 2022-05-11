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
    id;

    /** X coordinate 
     * @type number */
    x;

    /** Y coordinate
     * @type number */
    y;

    /** background_color
     * @type string*/
    background_color;

    /** background_transparent
     * @type bool */
    background_transparent;

    /** border_color
     * @type string */
    border_color;

    /** border_transparency
     * @type bool */
    border_transparency;

    /** border_size
     * @type number */
    border_size;

    /** state
     * @type string */
    state;

    /** layer which will be draw
     * @type number
     */
    layer;

    /** Is it visible or not
     * @type bool
     */
    visible;

    /**
     * opacity
     * @type number
     */
    opacity;

    /**
     * angle
     * @type [number]
     */
    angle;

    constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.background_color = background_color; // r, g, b
        this.background_transparent = background_transparent;
        this.border_color = border_color; // r, g, b
        this.border_transparency = border_transparency;
        this.border_size = border_size;
        this.state = state;
        this.layer = layer;
        this.visible = visible;
        this.opacity = opacity;
        this.angle = angle; // degrees
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

    get id () {
        return this.id;
    }

    set id (value) {
        this.id = value;
    }

    get x () {
        return this.x;
    }

    set x (value) {
        this.x = value;
    }

    get y () {
        return this.y;
    }

    set y (value) {
        this.y = value;
    }

    get background_color () {
        return this.background_color;
    }

    set background_color (value) {
        this.background_color = value;
    }

    get background_transparent () {
        return this.background_transparent;
    }

    set background_transparent (value) {
        this.background_transparent = value;
    }

    get border_color () {
        return this.border_color;
    }

    set border_color (value) {
        this.border_color = value;
    }

    get border_transparency () {
        return this.border_transparency;
    }

    set border_transparency (value) {
        this.border_transparency = value;
    }

    get border_size () {
        return this.border_size;
    }

    set border_size (value) {
        this.border_size = value;
    }

    get state () {
        return this.state;
    }

    set state (value) {
        this.state = value;
    }

    get layer () {
        return this.layer;
    }

    set layer (value) {
        this.layer = value;
    }

    get visible () {
        return this.visible;
    }

    set visible (value) {
        this.visible = value;
    }

    get opacity () {
        return this.opacity;
    }

    set opacity (value) {
        this.opacity = value;
    }

    get angle () {
        return this.angle;
    }

    set angle (value) {
        this.angle = value;
    }
}
