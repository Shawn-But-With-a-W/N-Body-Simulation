let bodies = []; // Array of all bodies currently present in the canvas
const G =  0.00000000006673; // Gravitational constant, used in calculation of force

// Setting up canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    console.log(canvas.height, canvas.width);
    // Change canvas to use cartesian coordinate system
    ctx.translate(canvas.width/2, canvas.height/2);
    for (let body of bodies) {
        body.draw();
    }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Body {
    constructor (radius, mass, colour, x, y, vX, vY, aX, aY, forceX, forceY) { 
        this.radius = radius;
        this.mass = mass;
        this.colour = colour; // Yes I am spelling it as 'colour'
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.aX = aX;
        this.aY = aY;
        this.forceX = forceX;
        this.forceY = forceY;

        this.draw();
    }

    updatePosition() {
        this.x += this.vX;
        this.y += this.vY;
    }

    updateVelcoity() {
        this.vX += this.aX;
        this.vY += this.aY;
    }

    updateAcceleration() {
        this.aX = this.forceX / this.mass;
        this.aY = this.forceY / this.mass;
    }

    updateForce() {
        this.forceX = 0;
        this.forceY = 0;
        for (let body of bodies) {
            // Gravitational force only applies to bodies other than the current one
            if (body != this) {
                // Add positive value to forceX if other body is to the right; add negative value otherwise
                if (body.x > this.x) {
                    this.forceX += G * this.mass * body.mass / Math.pow((body.x - this.x), 2);
                }
                else {
                    this.forceX -= G * this.mass * body.mass / Math.pow((body.x - this.x), 2);
                }
                 // Add positive value to forceY if other body is to the right; add negative value otherwise
                if (body.y > this.y) {
                    this.forceY += G * this.mass * body.mass / Math.pow((body.y - this.y), 2);
                }
                else {
                    this.forceY -= G * this.mass * body.mass / Math.pow((body.y - this.y), 2);
                }
            }
        }
    }

    draw() {
        ctx.beginPath();
            ctx.fillStyle = this.colour;
            ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
            ctx.fill();
        ctx.closePath();
    }
}

body1 = new Body(50, 100, "red", 0, 0, 0, 0, 0, 0, 0, 0);
bodies.push(body1);

body2 = new Body (50, 100, "blue", 400, 400, 0, 0, 0, 0, 0, 0);
bodies.push(body2);