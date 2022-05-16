import { ANIMATION_PATH } from "../animation_controller.js";
import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class ImageFile extends AnimatedObject {

    /**
     * The image's width
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
     * The images's height
     * @type number
     */
    _height;
    get height () {
        return this._height;
    }
    set height (value) {
        this._height = value;
    }

    /**
     * The image's path
     * @type string
     */
    _image_path;
    get image_path () {
        return this._image_path;
    }
    set image_path (value) {
        this._image_path = value;
    }

    /**
     * The image loaded by p5
     * @type P5.Image
     */
    _loaded_image;
    get loaded_image () {
        return this._loaded_image;
    }
    set loaded_image (value) {
        this._loaded_image = value;
    }

    constructor (id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, width, height, image_path) {
        super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
        this._width = width;
        this._height = height;
        this._image_path = image_path;
        this._loaded_image;
        this._first = true;
    }

    loadImage (drawing) {
        this._loaded_image = drawing.loadImage(this._image_path);
    }

    draw (drawing) {
        drawing.push();
        super.draw(drawing);
        if(this._first){
            this.loadImage(drawing);
            this._first = false;
        }
        if (this._width == undefined || this._height == undefined) {
            drawing.image(this._loaded_image, this._x, this._y);
        } else {
            drawing.image(this._loaded_image, this._x, this._y, this._width, this._height);
        }
        drawing.pop();
    }

    isClicked (x, y, drawing) {
        return (x >= this._x) && (x <= this._x + this._width) && (y >= this._y) && (y <= this._y + this._height);
    }

    toXml () {
        let image = document.createElement("object_image");
        image.innerHTML = this._id;
        image.setAttribute("x", this._x);
        image.setAttribute("y", this._y);
        image.setAttribute("background_color", this._background_color); // r, g, b
        image.setAttribute("background_transparent", this._background_transparent);
        image.setAttribute("border_color", this._border_color); // r, g, b
        image.setAttribute("border_transparency", this._border_transparency);
        image.setAttribute("border_size", this._border_size);
        image.setAttribute("layer", this._layer);
        image.setAttribute("visible", this._visible);
        image.setAttribute("opacity", this._opacity);
        // image.setAttribute("angle", this.angle); // degrees
        image.setAttribute("width", this._width);
        image.setAttribute("height", this._height);
        image.setAttribute("image", this._image_path);
        return image;
    }

    clone () {
        return new ImageFile(this._id, this._x, this._y, this._background_color, this._background_transparent, this._border_color, this._border_transparency, this._state, this._layer, this._visible, this._opacity, this._angle, this._width, this._height, this._image_path);
    }
}
