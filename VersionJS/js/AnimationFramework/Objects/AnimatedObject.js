/**
 * 
 */

// File-shared object's states
export let DEFAULT_STATE = "normal";
export let WAITING_CLICK_STATE = "waiting_click";
export let SLEEPING_STATE = "sleeping";
export let MOVING_STATE = "moving";

export class AnimatedObject {
   
    constructor(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle) {
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

    getId() {
        return this.id;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getBackground_color() {
        return this.background_color;
    }

    getBackground_transparent() {
        return this.background_transparent;
    }

    getBorder_color() {
        return this.border_color;
    }

    getBorder_transparency() {
        return this.border_transparency;
    }

    getBorder_size() {
        return this.border_size;
    }

    getState() {
        return this.state;
    }

    getLayer() {
        return this.layer;
    }

    getVisible() {
        return this.visible;
    }

    getOpacity() {
        return this.opacity;
    }

    getAngle() {
        return this.angle;
    }

    setId(id) {
        this.id = id;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setBackground_color(background_color) {
        this.background_color = background_color;
    }
    
    setBackground_transparent(background_transparent) {
        this.background_transparent = background_transparent;
    }

    setBorder_color(border_color) {
        this.border_color = border_color;
    }

    setBorder_transparency(border_transparency) {
        this.border_transparency = border_transparency;
    }

    setBorder_size(border_size) {
        this.border_size = border_size;
    }

    setState(state) {
        this.state = state;
    }

    setLayer(layer) {
        this.layer = layer;
    }

    setVisible(visible) {
        this.visible = visible;
    }

    setOpacity(opacity) {
        this.opacity = opacity;
    }

    setAngle(angle) {
        this.angle = angle;
    }

    draw(drawing) {
        // Fill
        if (this.background_transparent) drawing.fill(0, 0);
        else drawing.fill(this.background_color[0], this.background_color[1], this.background_color[2], this.opacity * 255); // fill([r, g, b], opacity) doesn't work :)
        // Border
        if (this.border_transparency) drawing.noStroke();
        else drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
        drawing.strokeWeight(this.border_size);
    }

}
