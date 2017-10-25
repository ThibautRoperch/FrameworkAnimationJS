/**
 * 
 */

class Circle extends Ellipse {
       
    constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, radius) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, radius, radius);
        this.radius = radius;
    }

   getRadius() {
       return this.radius;
   }

   setRadius(radius) {
       this.radius = radius;
   }

   draw() {
        super.draw();
        ellipse(this.x, this.y, this.radius, this.radius);
   }

   isClicked(x, y) {
       x = this.x - x;
       y = this.y - y;
       distance = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
       return distance <= this.width/2;
   }

}
