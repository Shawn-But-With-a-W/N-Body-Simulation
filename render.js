// Setting up canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let zoomLevel = 1; // Zoom level to be used for canvas
let translate = {x:0, y:0}; // How much the canvas is shifted by


window.addEventListener("resize", refreshCanvas);

function refreshCanvas() {
    // Apparently these four lines only work in this function idk why
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // Change canvas to cartesian standards
    ctx.translate(canvas.width/2 + translate.x, canvas.height/2 - translate.y); // You just need to do translate first or it breaks for some reason, also y is inverted because of changing to cartesian standards
    ctx.scale(zoomLevel, -zoomLevel);

    // Draw a rectangle over the entire canvas
    ctx.clearRect(-(canvas.width/2 + translate.x) / zoomLevel, -(canvas.height/2 +  translate.y) / zoomLevel, canvas.width/zoomLevel, canvas.height/zoomLevel);
}

document.addEventListener("wheel", zoom);

function zoom(event) {
    zoomLevel += event.deltaY * -0.002;
    zoomLevel = Math.min(Math.max(0.01, zoomLevel), 10);
    console.log(zoomLevel);
}

document.addEventListener("mousemove", pan);

function pan(event) {
    if (event.ctrlKey) {
        translate.x += event.movementX;
        translate.y -= event.movementY; // y is defined as positive if mouse moves downwards, not upwards
        console.log(translate);
    }
}


let interval = setInterval(update, 1);

// Seems to be some sort of priority going on TODO investigate
let body1 = new Body(50, Math.pow(10, 15), "red", {x:-150, y:-150}, {x:25, y:0});
let body2 = new Body(50, Math.pow(10, 15), "blue", {x:150, y:150}, {x:-25, y:0});
let body3 = new Body(50, Math.pow(10, 15), "green", {x:0, y:0}, {x:0, y:0});


function update() {
    refreshCanvas();

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