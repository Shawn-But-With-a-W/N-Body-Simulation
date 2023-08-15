// TODO: Change units for the calculations to fit input units (mainly the drawing on screen, pixel to km ratio)
let bodies = []; // Array of all bodies present

class Body {
    constructor (radius, mass, colour, pos, vel) {
        this.radius = radius; // (m)
        this.mass = mass; // (kg)
        this.colour = colour;  // Yes I am spelling it as 'colour'
        // newPos is used for drawing the body, pos is used for calculations
        this.pos = pos; // (m)
        // Assign newPos with number values (primitive type) instead assigning an object, which would be pass by reference
        this.newPos = {x:pos.x, y:pos.y}; 
        this.vel = vel; // (m/s)
        this.acc = {x:0, y:0}; // (m/s^2)
        this.force = {x:0, y:0}

        bodies.push(this);
        this.draw();
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
                let force = (settings.G * this.mass * body.mass) / ((this.pos.x - body.pos.x) ** 2 + (this.pos.y - body.pos.y) ** 2 + settings.softening);
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
        this.vel.x += this.acc.x * settings.t;
        this.vel.y += this.acc.y * settings.t;
    }

    updatePos() {
        this.newPos.x += this.vel.x * settings.t;
        this.newPos.y += this.vel.y * settings.t;
    }

    updateCalcPos() {
        this.pos.x = this.newPos.x;
        this.pos.y = this.newPos.y;
    }
}