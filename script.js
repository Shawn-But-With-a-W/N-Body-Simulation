// NOTE TO SELF: INVERT Y VALUE WHENEVER USING COORDINATES - CANVAS IS DUMB

let bodies = []; // Array of all bodies currently present in the canvas
const G =  0.00000000006673; // Gravitational constant, used in calculation of force

// Setting up canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // Change canvas to cartesian standards
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(1, -1);

    // Redraw everything
    for (let body of bodies) {
        body.draw();
    }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Body {
    constructor (radius, mass, colour, x, y, vX, vY, aX, aY, fX, fY) { 
        this.radius = radius;
        this.mass = mass; 
        this.colour = colour; // Yes I am spelling it as 'colour'
        this.x  = this.newX = x;
        this.y = this.newY = y; // newX and newY are used for drawing the body, x and y are used for calculations
        this.vX = vX;
        this.vY = vY;
        this.aX = aX;
        this.aY = aY;
        this.fX = fX;
        this.fY = fY;
        
        this.draw();
    }

    draw() {
        ctx.beginPath();
            ctx.fillStyle = this.colour;
            ctx.arc(this.newX, this.newY, this.radius, 0, 2*Math.PI);
            ctx.fill();
        ctx.closePath();
    }

    updateForce() {
        for (let body of bodies) {
            // Gravitational force only applied by bodies other than the current body itself
            if (body != this) {
                // Finding the magnitude and angle
                let f = G * this.mass * body.mass / (Math.pow(this.x - body.x, 2) + Math.pow(this.y - body.y, 2));
                let theta = Math.atan(Math.abs((this.y - body.y) / (this.x - body.x)));

                // Decomposing into x and y components
                this.fX = f * Math.cos(theta);
                this.fY = f * Math.sin(theta);
                if (body.x < this.x) {
                    this.fX *= -1;
                }
                if (body.y < this.y) {
                    this.fY *= -1;
                }
            }
        }
        console.log(`Force: ${this.fX}, ${this.fY}`)
    }

    updateAcceleration() {
        this.aX = this.fX / this.mass;
        this.aY = this.fY / this.mass;
        console.log(`Acceleration: ${this.aX}, ${this.aY}`)

    }

    updateVelcoity() {
        this.vX += this.aX;
        this.vY += this.aY;
        console.log(`Velocity: ${this.vX}, ${this.vY}`)

    }

    updatePosition() {
        this.newX += this.vX;
        this.newY += this.vY;
        console.log(`Position: ${this.newX}, ${this.newY}`)
    }
}

body1 = new Body(50, Math.pow(10, 15), "red", 0, 0, 7, 0, 0, 0, 0, 0);
bodies.push(body1);

body2 = new Body (50, Math.pow(10, 15), "blue", 400, -400, -7, 0, 0, 0, 0, 0);
bodies.push(body2);

let interval = setInterval(update, 10);

function update() {
    // Draw a rectangle over the entire canvas
    ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    
    // Show animation on canvas
    for (let body of bodies) {
        body.updateForce();
        body.updateAcceleration();
        body.updateVelcoity();
        body.updatePosition();
        body.draw()
    }

    // Change the previous and current position values to be identical, separately to not intefere with calculating force (which is based on distance)
    for (let body of bodies) {
        body.x = body.newX;
        body.y = body.newY;
    }
}