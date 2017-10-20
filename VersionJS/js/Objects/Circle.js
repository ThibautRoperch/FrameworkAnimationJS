class Circle extends Ellipse {
    constructor(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, width, height, radius) {
        super(id, x, y, fgcolor, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, width, height);
        this.radius = radius;
    }

   getRadius() {
       return this.radius;
   }

   setRadius(radius) {
       this.radius = radius;
   }

   draw() {
		fill(this.bgcolor);
		ellipse(this.x, this.y, this.radius, this.radius);
   }

}
