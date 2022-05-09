import { AnimatedObject } from "./AnimatedObject.js";
/**
 * 
 */

export class Landmark extends AnimatedObject {

	constructor(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle, height, width, scale_x, scale_y, unit_x, unit_y) {
		super(id, x, y, background_color, background_transparent, border_color, border_transparency, border_size, state, layer, visible, opacity, angle);
		this.height = height;
		this.width = width;
		this.scale_x = scale_x;
		this.scale_y = scale_y;
		this.unit_x = unit_x;
		this.unit_y = unit_y;
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}

	getScaleX() {
		return this.scale_x;
	}

	getScaleY() {
		return this.scale_y;
	}

	getUnitX() {
		return this.unit_x;
	}

	getUnitY() {
		return this.unit_y;
	}

	setWidth(width) {
		this.width = width;
	}

	setHeight(height) {
		this.height = height;
	}

	setScaleX(scale_x) {
		this.scale_x = scale_x;
	}

	setScaleY(scale_y) {
		this.scale_y = scale_y;
	}

	setUnitX(unit_x) {
		this.unit_x = unit_x;
	}

	setUnitY(unit_y) {
		this.unit_y = unit_y;
	}

	draw(drawing) {
		super.draw(drawing);

		drawing.textFont("courrier");
		drawing.textSize(12);
		drawing.textStyle(drawing.NORMAL);
		drawing.angleMode(drawing.DEGREES);

		let number_scale_X = Math.abs(this.width) / this.scale_x;
		let number_scale_Y = Math.abs(this.height) / this.scale_y;

		if (this.height > 0 && this.width > 0) {
			// X axis
			drawing.line(this.x, this.y, this.x, this.y - this.height);
			// Y axis
			drawing.line(this.x, this.y, this.x + this.width, this.y);

			// Drawing scale of X axis
			for(let i = 1; i < number_scale_X; ++i){
				let px = this.x + (i * this.scale_x);
				drawing.line(px, this.y, px, this.y - 5);
			}

			drawing.push();
			if (!this.background_transparent)
				drawing.fill(this.background_color[0], this.background_color[1], this.background_color[2], this.opacity * 255);
			else
				drawing.noFill();
			// Drawing arrow of end of axes
			// Y axis
			drawing.triangle(this.x - 3, this.y - this.height, this.x + 3, this.y - this.height, this.x, this.y - this.height - 3);
			// X axis
			drawing.triangle(this.x + this.width, this.y + 3, this.x + this.width, this.y - 3, this.x + this.width + 3, this.y);
			drawing.pop();

			//texte x
			drawing.text(this.unit_x, this.x + this.width / 2, this.y + 10);

			//texte y
			drawing.push();  // sert à pas faire la rotation et la translation sur tous les objets (s'arrête après pop)
			drawing.translate(this.x - 10, this.y - this.height / 2);
			drawing.rotate(-90);
			drawing.text(this.unit_y, 0, 0);
			drawing.pop();
		}
		else if (this.height < 0 && this.width > 0) {
			// X axis
			drawing.line(this.x, this.y, this.x, this.y - this.height);
			// Y axis
			drawing.line(this.x, this.y, this.x + this.width, this.y);

			drawing.push();
			if (!this.background_transparent)
				drawing.fill(this.background_color[0], this.background_color[1], this.background_color[2], this.opacity * 255);
			else
				drawing.noFill();
			// Drawing arrow of end of axes
			// Y axis
			drawing.triangle(this.x - 3, this.y - this.height, this.x + 3, this.y - this.height, this.x, this.y - this.height + 3);
			// X axis
			drawing.triangle(this.x + this.width, this.y + 3, this.x + this.width, this.y - 3, this.x + this.width + 3, this.y);
			drawing.pop();

			// Unit of X axis
			drawing.text(this.unit_x, this.x + this.width / 2, this.y - 10);

			// Unit of Y axis
			drawing.push();  // sert à pas faire la rotation et la translation sur tous les objets (s'arrête après pop)
			drawing.translate(this.x - 10, this.y - this.height / 2);
			drawing.rotate(-90);
			drawing.text(this.unit_y, 0, 0);
			drawing.pop();
		}
		else if (this.height > 0 && this.width < 0) {
			drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
			// Y axis
			drawing.line(this.x, this.y, this.x, this.y - this.height);
			// X axis
			drawing.line(this.x, this.y, this.x + this.width, this.y);

			drawing.push();
			// Drawing arrow of end of axes
			if (!this.border_transparency)
				drawing.fill(this.background_color[0], this.background_color[1], this.background_color[2], this.opacity * 255);
			else
				drawing.noFill();
			// Drawing arrow of end of axes
			// Y axis
			drawing.triangle(this.x - 3, this.y - this.height, this.x + 3, this.y - this.height, this.x, this.y - this.height - 3);
			// X axis
			drawing.triangle(this.x + this.width, this.y + 3, this.x + this.width, this.y - 3, this.x + this.width - 3, this.y);
			drawing.pop();

			// Unit of X axis
			drawing.text(this.unit_x, this.x + this.width / 2, this.y + 10);

			// Unit of Y axis
			drawing.push();  // sert à pas faire la rotation et la translation sur tous les objets (s'arrête après pop)
			drawing.translate(this.x + 10, this.y - this.height / 2);
			drawing.rotate(90);
			drawing.text(this.unit_y, 0, 0);
			drawing.pop();
		}
		else if (this.height < 0 && this.width < 0) {
			drawing.stroke(this.border_color[0], this.border_color[1], this.border_color[2], this.opacity * 255);
			// Y axis
			drawing.line(this.x, this.y, this.x, this.y - this.height);
			// X axis
			drawing.line(this.x, this.y, this.x + this.width, this.y);

			drawing.push();
			if (!this.background_transparent)
				drawing.fill(this.background_color[0], this.background_color[1], this.background_color[2], this.opacity * 255);
			else
				drawing.noFill();
			// Drawing arrow of end of axes
			// Y axis
			drawing.triangle(this.x - 3, this.y - this.height, this.x + 3, this.y - this.height, this.x, this.y - this.height + 3);
			// X axis
			drawing.triangle(this.x + this.width, this.y + 3, this.x + this.width, this.y - 3, this.x + this.width - 3, this.y);
			drawing.pop();

			// Unit of X axis
			drawing.text(this.unit_x, this.x + this.width / 2, this.y - 10);

			// Unit of Y axis
			drawing.push();  // sert à pas faire la rotation et la translation sur tous les objets (s'arrête après pop)
			drawing.translate(this.x + 10, this.y - this.height / 2);
			drawing.rotate(90);
			drawing.text(this.unit_y, 0, 0);
			drawing.pop();
		}
	}

	isClicked(x, y) {
		return (x >= this.x) && (x <= this.x + this.width) && (y >= this.y) && (y <= this.y + this.height);
	}

	toXml() {
		let landmark = document.createElement("object_landmark");
		landmark.innerHTML = this.id;
		landmark.setAttribute("x", this.x);
		landmark.setAttribute("y", this.y);
		landmark.setAttribute("background_color", this.background_color); // r, g, b
		landmark.setAttribute("background_transparent", this.background_transparent);
		landmark.setAttribute("border_color", this.border_color); // r, g, b
		landmark.setAttribute("border_transparency", this.border_transparency);
		landmark.setAttribute("border_size", this.border_size);
		landmark.setAttribute("layer", this.layer);
		landmark.setAttribute("visible", this.visible);
		landmark.setAttribute("opacity", this.opacity);
		// landmark.setAttribute("angle", this.angle); // degrees
		landmark.setAttribute("width", this.width);
		landmark.setAttribute("height", this.height);
		landmark.setAttribute("scale_x", this.scale_x);
		landmark.setAttribute("scale_y", this.scale_y);
		landmark.setAttribute("unit_x", this.unit_x);
		landmark.setAttribute("unit_y", this.unit_y);
		return landmark;
	}

	clone() {
		return new Landmark(this.id, this.x, this.y, this.background_color, this.background_transparent, this.border_color, this.border_transparency, this.state, this.layer, this.visible, this.opacity, this.angle, this.width, this.height, this.scale_x, this.scale_y, this.unit_x, this.unit_y);
	}

}
