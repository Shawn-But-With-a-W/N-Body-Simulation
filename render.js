

let interval = setInterval(update, 1);

// Still doesn't quite work, order matters, can't figure out why
// const body1 = new Body(50, Math.pow(10, 15), "red", {x:-150, y:-150}, {x: 15, y:0});
// const body2 = new Body(50, Math.pow(10, 15), "blue", {x:150, y:150}, {x:-15, y:0});
// const body3 = new Body(50, Math.pow(10, 15), "green", {x:150, y:-150}, {x:0, y:15});
// const body4 = new Body(50, Math.pow(10, 15), "yellow", {x:-150, y:150}, {x:0, y:-15});

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

    // Change the previous and current position values to be identical after the force calculation (which is based on distance, and by extension position) to not intefere 
    for (let body of bodies) {
        body.updateCalcPos();

        // if (body == body1) {
        //     document.getElementById("body1").innerText = `
        //         force: ${body1.force.x}, ${body1.force.y}
        //         acceleration: ${body1.acc.x}, ${body1.acc.y}
        //         velocity: ${body1.vel.x}, ${body1.vel.y}
        //         new position: ${body1.newPos.x}, ${body1.newPos.y}
        //         position: ${body1.pos.x}, ${body1.pos.y}
        //     `;
        // }

        // else if (body == body2) {
        //     document.getElementById("body2").innerText = `
        //         force: ${body2.force.x}, ${body2.force.y}
        //         acceleration: ${body2.acc.x}, ${body2.acc.y}
        //         velocity: ${body2.vel.x}, ${body2.vel.y}
        //         new position: ${body2.newPos.x}, ${body2.newPos.y}
        //         position: ${body2.pos.x}, ${body2.pos.y}
        //     `;
        // }

        // else if (body == body3) {
        //     document.getElementById("body3").innerText = `
        //         force: ${body3.force.x}, ${body3.force.y}
        //         acceleration: ${body3.acc.x}, ${body3.acc.y}
        //         velocity: ${body3.vel.x}, ${body3.vel.y}
        //         new position: ${body3.newPos.x}, ${body3.newPos.y}
        //         position: ${body3.pos.x}, ${body3.pos.y}
        //     `;
        // }

        // else if (body == body4) {
        //     document.getElementById("body4").innerText = `
        //         force: ${body4.force.x}, ${body4.force.y}
        //         acceleration: ${body4.acc.x}, ${body4.acc.y}
        //         velocity: ${body4.vel.x}, ${body4.vel.y}
        //         new position: ${body4.newPos.x}, ${body4.newPos.y}
        //         position: ${body4.pos.x}, ${body4.pos.y}
        //     `;
        // }
    }
}