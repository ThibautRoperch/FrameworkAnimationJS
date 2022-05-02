/**
 * 
 */

// File-shared object's states
export let DEFAULT_STATE = "normal";
export let WAITING_CLICK_STATE = "waiting_click";
export let SLEEPING_STATE = "sleeping";
export let MOVING_STATE = "moving";

export class AnimatedObject {
   
    constructor(id, x, y, bgcolor, bgtransparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.bgcolor = bgcolor; // r, g, b
        this.bgtransparent = bgtransparent;
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

    getBgcolor() {
        return this.bgcolor;
    }

    getBgtransparent() {
        return this.bgtransparent;
    }

    getborder_color() {
        return this.border_color;
    }

    getborder_transparency() {
        return this.border_transparency;
    }

    getborder_size() {
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

    setBgcolor(bgcolor) {
        this.bgcolor = bgcolor;
    }
    
    setBgtransparent(bgtransparent) {
        this.bgtransparent = bgtransparent;
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
        if (this.bgtransparent) drawing.fill(0, 0);
        else drawing.fill(this.bgcolor[0], this.bgcolor[1], this.bgcolor[2], this.opacity * 255); // fill([r, g, b], opacity) doesn't work :)
        // Border
        if (this.border_transparency) drawing.noStroke();
        else drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
        drawing.strokeWeight(this.border_size);
    }

}
