/**
 * 
 */

class Rectangle extends AnimatedObject {
    
	constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, width, height, round) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity);
        this.width = width;
        this.height = height;
        this.round = round; // tl, tr, bl, br
    }
    
    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getRound() {
        return this.round;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    setRound(bocolor) {
        this.bocolor = round;
    }

    draw() {
        rect(this.x, this.y, this.width, this.height, this.round[0], this.round[1], this.round[2], this.round[3]);
    }

	minXposition() {
		return this.x;
	}

	minYposition() {
		return this.y - 11;
	}

	maxXposition() {
		return this.x + this.text.length * 7;
	}

	maxYposition() {
		return this.y;
    }
    
}
