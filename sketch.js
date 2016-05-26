var gravConst = 1;
var obj1;
var obj2;
var attractor;

function setup() {
  var canvas = createCanvas(400, 400);
  background(0);

  obj1 = new MoverObject(235, 300, 40);
  obj2 = new MoverObject(100, 100, 30);
  attractor = new Attractor(250, 125, 60);

  // getting the direction from obj1 to obj2
  var force = p5.Vector.sub(obj1.location, obj2.location);
  // console.log(force);
  // getting the distance between two objects (one number)
  var distance = force.mag();
  // console.log("Distance: " + distance);
  var magnitude = (gravConst * obj1.size * obj2.size) / (distance * distance);
  // console.log("Magnitude: " + magnitude);
  force.normalize();
  // console.log("normailized force: " + force);
  force.mult(magnitude);
  // console.log("END GAME: " + force);
  // console.log("class: " + attractor.attract(obj2));

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

//MOVER CLASS
function MoverObject(_locX, _locY, _size) {
  this.location = new p5.Vector(_locX, _locY);
  this.velocity = new p5.Vector(0.0, 0.0);
  this.size = _size;

  this.draw = function() {
    fill(255);
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  this.applyForce = function(force) {
    this.velocity = force;
  }

  this.update = function() {
    this.location.add(this.velocity);
  }

}

// ATTRACTOR CLASS
function Attractor(_locX, _locY, _size) {
  this.location = new p5.Vector(_locX, _locY);
  this.size = _size;

  this.draw = function() {
    stroke(255);
    fill(44);
    smooth();
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  // Returns a Vector to be applied to the MoverObject location/veleocity
  this.attract = function(obj) {
    var forceDirection = p5.Vector.sub(this.location, obj.location);
    var distance = forceDirection.mag();
    distance = constrain(distance, 40, 300);


    forceDirection.normalize();
    // below is the equation for calculating the gravitational force of an object
    var magnitude = (gravConst * this.size * obj.size) / (distance * distance);
    var force = forceDirection.mult(magnitude);
    return force;  // p5.Vector
  }

}
