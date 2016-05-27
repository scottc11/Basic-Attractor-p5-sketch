
var gravConst = 1;
var numberOfParticles = 10;
var attractorRange = 50;

var particleArray = [];
var attractor;

function setup() {
  var canvas = createCanvas(400, 400);
  background(0);

  // instantiate attractor object
  attractor = new Attractor(250, 125, 60);

  // build array of particle objects
  for (var i = 0; i < numberOfParticles; i++) {
    var locX = random(0, 400);
    var locY = random(0, 400);
    var size = random(10, 40);
    particleArray.push(new Particle(locX, locY, size));
  }

}



function draw() {
  background(0);
  attractor.location.x = mouseX;
  attractor.location.y = mouseY;
  attractor.draw();

  // updating the particles
  for (var i = 0; i < particleArray.length; i++) {
    var particle = particleArray[i];

    // attract object if it is in given range of attractor
    if (particle.getDistanceFromAttractor(attractor) < attractor.range) {
      var force = attractor.attract(particle);
      particle.applyForce(force);
      particle.update();
      particle.draw();
    }

    if (particle.getDistanceFromAttractor(attractor) > attractor.range) {
      particle.returnToOrigin();
      particle.update();
      particle.draw();
    }
  }
}





// *********************************************
//PARTICLE CLASS

function Particle(_locX, _locY, _size, _name) {
  this.name = _name;
  this.location = new p5.Vector(_locX, _locY);
  this.origin = new p5.Vector(_locX, _locY);
  this.velocity = new p5.Vector(0.0, 0.0);
  this.acceleration = new p5.Vector(0.0, 0.0);
  this.size = _size;
  this.topSpeed = 10;

  this.draw = function() {
    fill(255);
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  // Apply the given force returned from Attractor to the particles velocity
  this.applyForce = function(force) {
    this.velocity = force;
  }

  this.getDistanceFromAttractor = function(attractor) {
    var forceDirection = p5.Vector.sub(attractor.location, this.location);
    var distance = forceDirection.mag();
    return distance;
  }

  this.getDistanceFromOrigin = function() {
    var direction = p5.Vector.sub(this.origin, this.location);
    var distanceFromOrigin = direction.mag();
    return distanceFromOrigin;
  }

  this.returnToOrigin = function() {
    this.location.set(this.origin);
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
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

  // Returns a Vector to be applied to the Particle location/veleocity
  this.attract = function(obj) {

    // calculations for objects distance
    var forceDirection = p5.Vector.sub(this.location, obj.location);
    var distance = forceDirection.mag();


    // the constrain() method will prevent unwanted effects when the object gets to close to the center of the attractor.
    distance = constrain(distance, 40, 300);

    // unsure what the pupurpose of normalize is, but it turns a vector into a number between 0.0 and 1.0 - kinda like map()
    forceDirection.normalize();

    // below is the equation for calculating the gravitational force of an object
    var magnitude = (gravConst * this.size * obj.size) / (distance * distance);
    var force = forceDirection.mult(magnitude);

    return force;  // p5.Vector
  }

}
