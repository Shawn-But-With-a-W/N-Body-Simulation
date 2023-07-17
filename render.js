// Setting up canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let bodies = []; // Array of all bodies currently present in the canvas

let zoomLevel = 1; // Zoom level to be used for canvas

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // Change canvas to cartesian standards
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(zoomLevel, -zoomLevel);
    // Draw a rectangle over the entire canvas
    ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    // Redraw everything
    for (let body of bodies) {
        body.draw();
    }
}

document.addEventListener("wheel", zoom);

function zoom(event) {
    zoomLevel += event.deltaY * -0.002;
    zoomLevel = Math.min(Math.max(0.01, zoomLevel), 10);
    console.log(zoomLevel);
    resizeCanvas(); // Just being lazy
}


let interval = setInterval(update, 1);

let body1 = new Body(50, Math.pow(10, 15), "red", -150, -150, 5, -5);
let body2 = new Body(50, Math.pow(10, 15), "blue", 150, 150, -5, 5);

bodies = [body1, body2];

function update() {
    // Draw a rectangle over the entire canvas
    ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    
    // Update values and redraw the bodies
    for (let body of bodies) {
        body.updateForce();
        body.updateAcceleration();
        body.updateVelocity();
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
    }
}