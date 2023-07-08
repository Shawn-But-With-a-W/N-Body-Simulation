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


let interval = setInterval(update, 10);

body1 = new Body(50, Math.pow(10, 15), "red", -200, -200, 7, 0, 0, 0, 0, 0);
bodies.push(body1);

body2 = new Body (50, Math.pow(10, 15), "blue", 200, 200, -7, 0, 0, 0, 0, 0);
bodies.push(body2);

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