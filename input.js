let settings = {
    radius : 1, // (km)
    mass : 10**15, // (kg)
    colour : "#71aff8", // (hex)
    pos : {x:0, y:0}, // (m), from origin
    vel : {x:0, y:0}, // (m)
    G : 0.0000000000667428, // Gravitational constant, used in calculation of force
    t : 1, // Time interval between consecutive calculations
    velCap : 5*(10**15),
    softening : 1000, // Value to set distance if distance is less than
    trail : 4,
    canvasOpacity : 1/4,
    _pause : false
};

// const ids = ["radius", "mass","x-vel","y-vel","t","vel-cap","trail","interval"];

// for (const id of ids) {
//     document.getElementById(`${id}-slider`).addEventListener("input", function() {
//         document.getElementById(`${id}-num`).value = this.value;
//         syncSettings();
//     })
// }

syncNum();
// Set each input field to match the slider
function syncNum() {
    document.getElementById("radius-num").value = document.getElementById("radius-slider").value;
    document.getElementById("mass-num").value = document.getElementById("mass-slider").value;
    document.getElementById("x-vel-num").value = document.getElementById("x-vel-slider").value;
    document.getElementById("y-vel-num").value = document.getElementById("y-vel-slider").value;
    document.getElementById("t-num").value = document.getElementById("t-slider").value;
    document.getElementById("softening-num").value = document.getElementById("softening-slider").value;
    document.getElementById("vel-cap-num").value = document.getElementById("vel-cap-slider").value;
    document.getElementById("trail-num").value = document.getElementById("trail-slider").value;

    syncSettings();
}

// Set each slider to match the input field
function syncSlider() {
    document.getElementById("radius-slider").value = document.getElementById("radius-num").value;
    document.getElementById("mass-slider").value = document.getElementById("mass-num").value;
    document.getElementById("x-vel-slider").value = document.getElementById("x-vel-num").value;
    document.getElementById("y-vel-slider").value = document.getElementById("y-vel-num").value;
    document.getElementById("t-slider").value = document.getElementById("t-num").value;
    document.getElementById("vel-cap-slider").value = document.getElementById("vel-cap-num").value;
    document.getElementById("softening-slider").value = document.getElementById("softening-num").value;
    document.getElementById("trail-slider").value = document.getElementById("trail-num").value;

    syncSettings();
}

// Sync values of the settings record to be the same to the input panel's and convert units
function syncSettings() {
    settings.radius = parseFloat(document.getElementById("radius-num").value) * 1000;
    settings.mass = parseFloat(document.getElementById("mass-num").value) * (10 ** 18);
    settings.colour = document.getElementById("colour-hex").value;
    settings.pos.x = parseFloat(document.getElementById("x-pos-num").value) * 1000;
    settings.pos.y = parseFloat(document.getElementById("y-pos-num").value) * 1000;
    settings.vel.x = parseFloat(document.getElementById("x-vel-num").value) * 1000;
    settings.vel.y = parseFloat(document.getElementById("y-vel-num").value) * 1000;
    settings.G = parseFloat(document.getElementById("G").value);
    settings.t = parseFloat(document.getElementById("t-num").value);
    settings.softening = parseFloat(document.getElementById("softening-num").value) * 1000;
    settings.velCap = parseFloat(document.getElementById("vel-cap-num").value) * 1000;
    // TODO: Make changing velocity cap affect avaliable values for velocity inputs
    settings.trail = parseFloat(document.getElementById("trail-num").value);
    if (settings.trail > 1) {
        settings.canvasOpacity = 1 / settings.trail;
    }
    else {
        settings.canvasOpacity = 1;
    }
}

// Create bodies when the add body button is clicked
function createBodyButton() {
    new Body(settings.radius, settings.mass, settings.colour, {x:settings.pos.x, y:settings.pos.y}, {x:settings.vel.x, y:settings.vel.y});
}


// TODO: Add drag functionality
// Creating bodies on mouse click


window.addEventListener("mousedown", startDrag);
window.addEventListener("mousemove", drag);
window.addEventListener("mouseup", createBodyMouse);

let _drag;
let initialPos;
let finalPos;

function startDrag(event) {
    _drag = true;
    initialPos = {x : event.clientX, y : event.clientY}
}

function drag(event) {
    if (_drag) {
        console.log("dragging");
        finalPos = {x : event.clientX, y : event.clientY}

        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

        overlayCtx.strokeStyle = "white";
        overlayCtx.lineWidth = 1;
        overlayCtx.beginPath();
        overlayCtx.moveTo(initialPos.x, initialPos.y);
        overlayCtx.lineTo(finalPos.x, finalPos.y);
        overlayCtx.stroke();
        overlayCtx.closePath();
        
    }
}

function createBodyMouse(event) {
    _drag = false;
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    new Body(settings.radius, settings.mass, settings.colour, {x : (event.clientX - canvas.width/2 - translateLevel.x) / zoomLevel, y : -(event.clientY - canvas.height/2 - translateLevel.y) / zoomLevel}, {x : settings.vel.x, y : settings.vel.y});
}


// Pause functionality
pauseButton = document.getElementById("pause")
function pause() {
    if (settings._pause) {
        settings._pause = false;
        pauseButton.innerText = "Pause";
        requestAnimationFrame(update);
    }
    else {
        settings._pause = true;
        pauseButton.innerText = "Resume";
    }
}
