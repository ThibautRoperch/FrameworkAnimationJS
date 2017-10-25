/**
 * 
 */

class Circle extends Ellipse {
       
    constructor(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, radius) {
        super(id, x, y, bgcolor, bgtransparent, bocolor, botransparent, state, layer, visible, opacity, angle, radius, radius);
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

   toXml() {
       var circle = document.createElement("object_circle");
       circle.setAttribute("id", this.id); 
       circle.setAttribute("x", this.x);
       circle.setAttribute("y",this.y);
       circle.setAttribute("bgcolor", this.bgcolor); // r, g, b
       circle.setAttribute("bgtransparent", this.bgtransparent);
       circle.setAttribute("bocolor", this.bocolor); // r, g, b
       circle.setAttribute("botransparent", this.botransparent);
       circle.setAttribute("state", this.state);
       circle.setAttribute("layer", this.layer);
       circle.setAttribute("visible", this.visible);
       circle.setAttribute("opacity", this.opacity);
       circle.setAttribute("angle", this.angle); // degrees
       circle.setAttribute("radius", this.radius);
       return circle;
   }

}
