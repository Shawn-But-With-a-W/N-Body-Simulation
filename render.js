// TO DO: FIX CLEAR RECT NOT WORKING ON EDGE OF CANVAS

// Setting up canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let zoomLevel = 1; // Zoom level to be used for canvas
let translate = {x:0, y:0};

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // Change canvas to cartesian standards
    ctx.translate(canvas.width/2 + translate.x, canvas.height/2 + translate.y);
    ctx.scale(zoomLevel, -zoomLevel);

    // Draw a rectangle over the entire canvas
    ctx.clearRect((-canvas.width/2 - translate.x) / zoomLevel, (-canvas.height/2 + translate.y) / zoomLevel, canvas.width/zoomLevel, canvas.height/zoomLevel);
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

document.addEventListener("mousemove", pan);

function pan(event) {
    if (event.ctrlKey) {
        translate.x += event.movementX;
        translate.y += event.movementY;
        console.log(translate);
        resizeCanvas(); // Being lazy again, probably should make a proper function for this stuff
    }
}


let interval = setInterval(update, 1);

let body2 = new Body(50, Math.pow(10, 15), "blue", {x:150, y:150}, {x:7, y:-7});
let body1 = new Body(50, Math.pow(10, 15), "red", {x:-150, y:-150}, {x:-7, y:7});

function update() {
    // Draw a rectangle over the entire canvas
    ctx.clearRect((-canvas.width/2 - translate.x) / zoomLevel, (-canvas.height/2 + translate.y) / zoomLevel, canvas.width/zoomLevel, canvas.height/zoomLevel);
    
    // Update values and redraw the bodies
    for (let body of bodies) {
        body.updateForce();
        body.updateAcc();
        body.updateVel();
        body.updatePos();
        body.draw();
    }

    // Change the previous and current position values to be identical, separately to not intefere with calculating force (which is based on distance)
    for (let body of bodies) {
        body.updateCalcPos();

        if (body == body1) {
            document.getElementById("body1").innerText = `
                force: ${body1.force.x}, ${body1.force.y}
                acceleration: ${body1.acc.x}, ${body1.acc.y}
                velocity: ${body1.vel.x}, ${body1.vel.y}
                new position: ${body1.newPos.x}, ${body1.newPos.y}
                position: ${body1.pos.x}, ${body1.pos.y}
            `;
        }

        else if (body == body2) {
            document.getElementById("body2").innerText = `
                force: ${body2.force.x}, ${body2.force.y}
                acceleration: ${body2.acc.x}, ${body2.acc.y}
                velocity: ${body2.vel.x}, ${body2.vel.y}
                new position: ${body2.newPos.x}, ${body2.newPos.y}
                position: ${body2.pos.x}, ${body2.pos.y}
            `;
        }
    }
}