let settings = {
    radius : 50, // (m)
    mass : 10**15, // (kg)
    colour : "#71aff8", // (hex)
    pos : {x:0, y:0}, // (m), from origin
    vel : {x:0, y:0}, // (m)
    G : 0.0000000000667428, // Gravitational constant, used in calculation of force
    t : 1, // Time interval between consecutive calculations
    velCap : 10*25,
    trail : 4,
    canvasOpacity : 1/4,
    intervalDelay : 10,
    _pause : false
};


syncNum();
// Set each input field to match the slider
function syncNum() {
    document.getElementById("radius-num").value = document.getElementById("radius-slider").value;
    document.getElementById("mass-num").value = document.getElementById("mass-slider").value;
    document.getElementById("x-vel-num").value = document.getElementById("x-vel-slider").value;
    document.getElementById("y-vel-num").value = document.getElementById("y-vel-slider").value;
    document.getElementById("t-num").value = document.getElementById("t-slider").value;
    document.getElementById("vel-cap-num").value = document.getElementById("vel-cap-slider").value;
    document.getElementById("trail-num").value = document.getElementById("trail-slider").value;
    document.getElementById("interval-num").value = document.getElementById("interval-slider").value;

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
    document.getElementById("trail-slider").value = document.getElementById("trail-num").value;
    document.getElementById("interval-slider").value = document.getElementById("interval-num").value;

    syncSettings();
}

// Sync values of the settings record to be the same to the input panel's and convert units
function syncSettings() {
    settings.radius = parseFloat(document.getElementById("radius-num").value) * 1000;
    settings.mass = parseFloat(document.getElementById("mass-num").value) * (10 ** 15);
    settings.colour = "#" + document.getElementById("colour-hex").value;
    settings.pos.x = parseFloat(document.getElementById("x-pos-num").value) * 1000;
    settings.pos.y = parseFloat(document.getElementById("y-pos-num").value) * 1000;
    settings.vel.x = parseFloat(document.getElementById("x-vel-num").value) * 1000;
    settings.vel.y = parseFloat(document.getElementById("y-vel-num").value) * 1000;
    settings.G = parseFloat(document.getElementById("G").value);
    settings.t = parseFloat(document.getElementById("t-num").value);
    settings.velCap = parseFloat(document.getElementById("vel-cap-num").value) * 1000 * (10 ** 15);
    settings.trail = parseFloat(document.getElementById("trail-num").value);
    if (settings.trail > 1) {
        settings.canvasOpacity = 1 / settings.trail;
    }
    else {
        settings.canvasOpacity = 1;
    }
    settings.intervalDelay = parseFloat(document.getElementById("interval-num").value);
}


// TODO: Add drag functionality
// Creating bodies on mouse click
canvas.addEventListener("mousedown", createBodyMouse);

function createBodyMouse(event) {
    new Body(settings.radius, settings.mass, settings.colour, {x : (event.clientX - canvas.width/2 - translateLevel.x) / zoomLevel, y : -(event.clientY - canvas.height/2 - translateLevel.y) / zoomLevel}, {x : settings.vel.x, y : settings.vel.y});
}


// Pause functionality
pauseButton = document.getElementById("pause")
function pause() {
    if (settings._pause) {
        interval = setInterval(update, settings.intervalDelay);
        settings._pause = false;
        pauseButton.innerText = "Pause";
    }
    else {
        clearInterval(interval);
        settings._pause = true;
        pauseButton.innerText = "Resume";
    }
}
