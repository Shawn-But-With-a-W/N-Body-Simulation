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

        // Update the body count in the HUD
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

        for (let body of bodies) {
            // Gravitational force only applied by bodies other than the current body itself
            if (body != this) {
                const dx = this.pos.x - body.pos.x;
                const dy = this.pos.y - body.pos.y;                

                // Finding the magnitude and angle from horizontal
                let d = Math.sqrt(dx ** 2 + dy ** 2);
                // Limiting the minum distance between objects
                if (d < settings.softening) {
                    d = settings.softening;
                }

                const force = (settings.G * this.mass * body.mass) / (d ** 2);
                let theta;

                let tanRatio = Math.abs(dy/dx);

                // In case when rounded, the ratio turns to be equivalent to dividing by 0
                if (isNaN(tanRatio)) {
                    theta = Math.PI/2;
                }
                else {
                    theta = Math.atan(tanRatio);
                }

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

    updateCalcPos() {
        this.pos.x = this.newPos.x;
        this.pos.y = this.newPos.y;
    }
}