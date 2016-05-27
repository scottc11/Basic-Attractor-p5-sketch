
var gravConst = 1;
var attractorRange = 50;
var obj1;
var obj2;
var attractor;

function setup() {
  var canvas = createCanvas(400, 400);
  background(0);

  obj1 = new MoverObject(235, 300, 40, "Big");
  obj2 = new MoverObject(100, 100, 30, "Small");
  attractor = new Attractor(250, 125, 60);

}



function draw() {
  background(0);
  attractor.location.x = mouseX;
  attractor.location.y = mouseY;
  attractor.draw();
  obj1.draw();
  obj2.draw();


  var force1 = attractor.attract(obj1);
  var force2 = attractor.attract(obj2);


  obj1.applyForce(force1);
  obj1.update();
  obj2.applyForce(force2);
  obj2.update();
}





// *********************************************
//MOVER CLASS

function MoverObject(_locX, _locY, _size, _name) {
  this.name = _name;
  this.location = new p5.Vector(_locX, _locY);
  this.origin = new p5.Vector(_locX, _locY);
  this.velocity = new p5.Vector(0.0, 0.0);
  this.size = _size;

  this.draw = function() {
    fill(255);
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  this.applyForce = function(force) {
    this.velocity = force;
    // console.log(this.name + " velocity: " + this.velocity);
  }

  this.returnToOrigin = function() {
    var forceDirection = p5.Vector.sub(this.origin, this.location);
    var distance = forceDirection.mag();

  }

  this.update = function() {
    this.location.add(this.velocity);
  }

}







// *********************************************
// ATTRACTOR CLASS

function Attractor(_locX, _locY, _size) {
  this.location = new p5.Vector(_locX, _locY);
  this.size = _size;
  this.range = 100;

  this.draw = function() {
    fill(77);
    stroke(255);
    ellipse(this.location.x, this.location.y, this.range*2, this.range*2);
    stroke(255);
    fill(44);
    smooth();
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  // Returns a Vector to be applied to the MoverObject location/veleocity
  this.attract = function(obj) {

    // calculations for objects distance
    var forceDirection = p5.Vector.sub(this.location, obj.location);
    var distance = forceDirection.mag();


    //attract object if it is in given range (attractor.range)
    if (distance < this.range) {
      // the constrain() method will prevent unwanted effects when the object gets to close to the center of the attractor.
      distance = constrain(distance, 40, 300);

      // unsure what the pupurpose of normalize is, but it turns a vector into a number between 0.0 and 1.0 - kinda like map()
      forceDirection.normalize();

      // below is the equation for calculating the gravitational force of an object
      var magnitude = (gravConst * this.size * obj.size) / (distance * distance);
      var force = forceDirection.mult(magnitude);
      return force;  // p5.Vector
    }

    if (distance > this.range) {

      obj.location.x = obj.origin.x;
      obj.location.y = obj.origin.y;
    }

  }

}
