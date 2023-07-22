const G =  0.0000000000667428; // Gravitational constant, used in calculation of force
let t = 0.5;
let softening = 100; // Used to prevent the denominator in GMm/r^2 from going to 0 and producing infinite force
let bodies = []; // Array of all bodies present

class Body {
    constructor (radius, mass, colour, pos, vel) {
        this.radius = radius; // (m)
        this.mass = mass; // (kg)
        this.colour = colour; // Yes I am spelling it as 'colour'
        // newPos is used for drawing the body, pos is used for calculations
        this.pos = pos; // (m)
        this.newPos = pos;
        this.vel = vel; // (m/s)
        this.acc = {x:0, y:0}; // (m/s^2)
        this.force = {x:0, y:0}

        this.draw();
        bodies.push(this);
    }

    draw() {
        ctx.beginPath();
            ctx.fillStyle = this.colour;
            ctx.arc(this.newPos.x, this.newPos.y, this.radius, 0, 2*Math.PI);
            ctx.fill();
        ctx.closePath();
    }

    updateForce() {
        this.force.x = 0;
        this.force.y = 0;

        for (let body of bodies) {
            // Gravitational force only applied by bodies other than the current body itself
            if (body != this) {
                // Finding the magnitude and angle from horizontal
                let force = (G * this.mass * body.mass) / ((this.pos.x - body.pos.x) ** 2 + (this.pos.y - body.pos.y) ** 2) + softening;
                let theta = Math.atan(Math.abs((this.pos.y - body.pos.y) / (this.pos.x - body.pos.x)));

                // Decomposing into x and y components and adding to the final force vector
                if (body.pos.x > this.pos.x) {
                    this.force.x += force * Math.cos(theta);
                }
                else {
                    this.force.x -= force * Math.cos(theta);
                }
                if (body.pos.y > this.pos.y) {
                    this.force.y += force * Math.sin(theta);
                }
                else {
                    this.force.y -= force * Math.sin(theta);
                }
            }
        }
    }

    updateAcc() {
        this.acc.x = this.force.x / this.mass;
        this.acc.y = this.force.y / this.mass;
    }

    updateVel() {
        this.vel.x += this.acc.x * t;
        this.vel.y += this.acc.y * t;
    }

    updatePos() {
        this.newPos.x += this.vel.x * t;
        this.newPos.y += this.vel.y * t;
    }

    updateCalcPos() {
        this.pos.x = this.newPos.x;
        this.pos.y = this.newPos.y;
    }
}