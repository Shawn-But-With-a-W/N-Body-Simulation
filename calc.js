let bodies = []; // Array of all bodies present

class Body {
    constructor (radius, mass, colour, pos, vel) {
        this.radius = radius; // (m)
        this.mass = mass; // (kg)
        this.colour = colour;  // Yes I am spelling it as 'colour'
        // newPos is used for drawing the body, pos is used for calculations
        this.pos = pos; // (m)
        this.newPos = {x:pos.x, y:pos.y}; // Assign newPos with number values (primitive type) instead assigning an object, which would be pass by reference
        this.vel = vel; // (m/s)
        this.acc = {x:0, y:0}; // (m/s^2)
        this.force = {x:0, y:0} // (N)

        bodies.push(this);
        this.draw();

        // Update the body count
        if (bodies.length == 1) {
            bodyCount.innerText = "1 body";
        }
        else {
            bodyCount.innerText = `${bodies.length} bodies`;
        }
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

        for (const body of bodies) {
            // Gravitational force only applied by bodies, not including than the current body itself
            if (body != this) {
                // The distance and direction horizontally and vertically
                const dx = this.pos.x - body.pos.x;
                const dy = this.pos.y - body.pos.y;                

                let distance = Math.sqrt(dx ** 2 + dy ** 2);
                // Limiting the minum distance between objects
                if (distance < settings.softening) {
                    distance = settings.softening;
                }

                const force = (settings.G * this.mass * body.mass) / (distance ** 2); // Newtons law of universal gravitation

                // Finding angle/direction of force
                const theta = Math.atan(Math.abs(dy/dx));

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
        this.acc.x = this.force.x / this.mass; // F = ma
        this.acc.y = this.force.y / this.mass;
    }


    updateVel() {
        this.vel.x += this.acc.x * settings.t; // v = u + at
        this.vel.y += this.acc.y * settings.t;

        // Cap velocity
        if (this.vel.x > 0) {
            this.vel.x = Math.min(this.vel.x, settings.velCap);
        }
        else if (this.vel.x < 0) {
            this.vel.x = Math.max(this.vel.x, -settings.velCap);
        }
        if (this.vel.y > 0) {
            this.vel.y = Math.min(this.vel.y, settings.velCap);
        }
        else if (this.vel.y < 0) {
            this.vel.y = Math.max(this.vel.y, -settings.velCap);
        }
    }


    updatePos() {
        this.newPos.x += this.vel.x * settings.t;
        this.newPos.y += this.vel.y * settings.t;
    }


    // Update calculation positions seperately to avoid the change in position of earlier updated bodies affecting distance calculations for later updated bodies
    updateCalcPos() {
        this.pos.x = this.newPos.x;
        this.pos.y = this.newPos.y;
    }
}