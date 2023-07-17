const G =  0.00000000006673; // Gravitational constant, used in calculation of force
let t = 0.2

class Body {
    constructor (radius, mass, colour, x, y, vX, vY) {
        this.radius = radius;
        this.mass = mass; 
        this.colour = colour; // Yes I am spelling it as 'colour'
        this.x  = this.newX = x;
        this.y = this.newY = y; // newX and newY are used for drawing the body, x and y are used for calculations
        this.vX = vX;
        this.vY = vY;
        this.aX = this.aY = this.fX = this.fY = 0;
        
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
        this.fX = 0;
        this.fY = 0;
        for (let body of bodies) {
            // Gravitational force only applied by bodies other than the current body itself
            if (body != this) {
                // Finding the magnitude and angle
                let f = G * this.mass * body.mass / (Math.pow(this.x - body.x, 2) + Math.pow(this.y - body.y, 2));
                let theta = Math.atan(Math.abs((this.y - body.y) / (this.x - body.x)));

                // Decomposing into x and y components
                if (body.x > this.x) {
                    this.fX += f * Math.cos(theta);
                }
                else {
                    this.fX -= f * Math.cos(theta);
                }
                if (body.y > this.y) {
                    this.fY += f * Math.sin(theta);
                }
                else {
                    this.fY -= f * Math.sin(theta);
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
        this.vX += this.aX * t;
        this.vY += this.aY * t;
        console.log(`Velocity: ${this.vX}, ${this.vY}`)

    }

    updatePosition() {
        this.newX += this.vX * t;
        this.newY += this.vY * t;
        console.log(`Position: ${this.newX}, ${this.newY}`)
    }

    updateCalcPosition() {
        this.x = this.newX;
        this.y = this.newY;
    }
}