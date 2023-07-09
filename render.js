let bodies = []; // Array of all bodies currently present in the canvas

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


let interval = setInterval(update, 10);

let body1 = new Body(50, Math.pow(10, 15), "red", -150, -150, 16, 0, 0, 0, 0, 0);
let body2 = new Body (50, Math.pow(10, 15), "blue", 150, 150, -16, 0, 0, 0, 0, 0);
let body3 = new Body (50, Math.pow(10, 15), "green", 150, -150, 0, 16, 0, 0, 0, 0);
let body4 = new Body (50, Math.pow(10, 15), "yellow", -150, 150, 0, -16, 0, 0, 0, 0);

bodies = [body4, body3, body2, body1];

function update() {
    // Draw a rectangle over the entire canvas
    ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    
    // Show animation on canvas
    for (let body of bodies) {
        body.updateForce();
        body.updateAcceleration();
        body.updateVelcoity();
        body.updatePosition();
        body.draw();
    }

    // Change the previous and current position values to be identical, separately to not intefere with calculating force (which is based on distance)
    for (let body of bodies) {
        body.updateCalcPosition();

        if (body == body1) {
            document.getElementById("body1").innerText = `
                force: ${body1.fX}, ${body1.fY}
                acceleration: ${body1.aX}, ${body1.aY}
                velocity: ${body1.vX}, ${body1.vY}
                new position: ${body1.newX}, ${body1.newY}
                position: ${body1.x}, ${body1.y}
            `;
        }

        else if (body == body2) {
            document.getElementById("body2").innerText = `
                force: ${body2.fX}, ${body2.fY}
                acceleration: ${body2.aX}, ${body2.aY}
                velocity: ${body2.vX}, ${body2.vY}
                new position: ${body2.newX}, ${body2.newY}
                position: ${body2.x}, ${body2.y}
            `;
        }

        else if (body == body3) {
            document.getElementById("body3").innerText = `
                force: ${body3.fX}, ${body3.fY}
                acceleration: ${body3.aX}, ${body3.aY}
                velocity: ${body3.vX}, ${body3.vY}
                new position: ${body3.newX}, ${body3.newY}
                position: ${body3.x}, ${body3.y}
            `;
        }

        else if (body == body4) {
            document.getElementById("body4").innerText = `
                force: ${body4.fX}, ${body4.fY}
                acceleration: ${body4.aX}, ${body4.aY}
                velocity: ${body4.vX}, ${body4.vY}
                new position: ${body4.newX}, ${body4.newY}
                position: ${body4.x}, ${body4.y}
            `;
        }
    }
}