class Circle extends Ellipse {
    constructor(id, x, y, image, fgcolor, bgcolor, state, layer, opacity, width, height, bgtransparent, radius) {
        super(id, x, y, fgcolor, bgcolor, state, layer, opacity, width, height, bgtransparent);
        this.radius = radius;
    }

   getRadius() {
       return this.radius;
   }

   setRadius(radius) {
       this.radius = radius;
   }

   draw() {
       ellipse(this.x, this.y, this.radius, this.radius);
   }
}