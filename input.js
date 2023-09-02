let settings = { // TODO: Make this look nice and have the default values stored here the same as html
    radius : 10 * (10 ** 3), // (m)
    mass : 1000 * (10 ** 18), // (kg)
    colour : "#71aff8", // (hex)
    pos : {x:0, y:0}, // (m), from origin
    vel : {x:0, y:0}, // (m)
    G : 0.0000000000667428, // Gravitational constant, used in calculation of force
    t : 1, // Time interval between consecutive calculations
    velCap : 20 * (10 ** 3), // (m/s)
    softening : 250, // Value to set distance if distance is less than
    trail : 15,
    canvasOpacity : 1/15,
    scrollMultiplier : 5 * (10 ** -7),
    dragMultiplier : 25,
    dragWidth : 2,
    dragColour : "#7a71f8",

    _pause : false,
    _invertY : false,
    _sliders : true,
};

// const ids = ["radius", "mass","x-vel","y-vel","t","vel-cap","trail","interval"];

// for (const id of ids) {
//     document.getElementById(`${id}-slider`).addEventListener("input", function() {
//         document.getElementById(`${id}-num`).value = this.value;
//         syncSettings();
//     })
// }

// Obtaining the value of inputs

syncNum();
// Set each input field to match the slider
function syncNum() {
    if (settings._sliders) {
        document.getElementById("radius-num").value = document.getElementById("radius-slider").value;
        document.getElementById("mass-num").value = document.getElementById("mass-slider").value;
        document.getElementById("x-vel-num").value = document.getElementById("x-vel-slider").value;
        document.getElementById("y-vel-num").value = document.getElementById("y-vel-slider").value;
        document.getElementById("trail-num").value = document.getElementById("trail-slider").value;
        document.getElementById("t-num").value = document.getElementById("t-slider").value;
        document.getElementById("softening-num").value = document.getElementById("softening-slider").value;
        document.getElementById("vel-cap-num").value = document.getElementById("vel-cap-slider").value;
        document.getElementById("scroll-mult-num").value = document.getElementById("scroll-mult-slider").value;
        document.getElementById("drag-mult-num").value = document.getElementById("drag-mult-slider").value;
        document.getElementById("drag-width-num").value = document.getElementById("drag-width-slider").value;
    }

    syncSettings();
}

// Set each slider to match the input field
function syncSlider() {
    if (settings._sliders) {
        document.getElementById("radius-slider").value = document.getElementById("radius-num").value;
        document.getElementById("mass-slider").value = document.getElementById("mass-num").value;
        document.getElementById("x-vel-slider").value = document.getElementById("x-vel-num").value;
        document.getElementById("y-vel-slider").value = document.getElementById("y-vel-num").value;
        document.getElementById("trail-slider").value = document.getElementById("trail-num").value;
        document.getElementById("t-slider").value = document.getElementById("t-num").value;
        document.getElementById("softening-slider").value = document.getElementById("softening-num").value;
        document.getElementById("vel-cap-slider").value = document.getElementById("vel-cap-num").value;
        document.getElementById("scroll-mult-slider").value = document.getElementById("scroll-mult-num").value;
        document.getElementById("drag-mult-slider").value = document.getElementById("drag-mult-num").value;
        document.getElementById("drag-width-slider").value = document.getElementById("drag-width-num").value;
    }

    syncSettings();
}

// Sync values of the settings record to be the same to the input panel's and convert units
function syncSettings() {
    settings.radius = parseFloat(document.getElementById("radius-num").value) * 1000;
    settings.mass = parseFloat(document.getElementById("mass-num").value) * (10 ** 18);
    settings.colour = document.getElementById("colour").value;
    settings.pos.x = parseFloat(document.getElementById("x-pos-num").value) * 1000;
    settings.pos.y = parseFloat(document.getElementById("y-pos-num").value) * 1000;
    settings.vel.x = parseFloat(document.getElementById("x-vel-num").value) * 1000;
    settings.vel.y = parseFloat(document.getElementById("y-vel-num").value) * 1000;
    settings.G = parseFloat(document.getElementById("G").value);
    settings.t = parseFloat(document.getElementById("t-num").value);
    settings.softening = parseFloat(document.getElementById("softening-num").value) * 1000;
    if (settings._sliders) {
        if (document.getElementById("vel-cap-num").value != settings.velCap) {
            settings.velCap = parseFloat(document.getElementById("vel-cap-num").value) * 1000;
            // The minimum and maximum values for velocity slider and inputs are affected by changing the velocity cap
            document.getElementById("x-vel-slider").min = -settings.velCap/1000;
            document.getElementById("x-vel-slider").max = settings.velCap/1000;
            document.getElementById("y-vel-slider").min = -settings.velCap/1000;
            document.getElementById("y-vel-slider").max = settings.velCap/1000;
    
            // Update velocity values
            document.getElementById("x-vel-num").value = document.getElementById("x-vel-slider").value;
            document.getElementById("y-vel-num").value = document.getElementById("y-vel-slider").value;
        }
    }

    settings.trail = parseFloat(document.getElementById("trail-num").value);
    if (settings.trail > 1) {
        settings.canvasOpacity = 1 / settings.trail;
    }
    else {
        settings.canvasOpacity = 1;
    }

    settings.scrollMultiplier = parseFloat(document.getElementById("scroll-mult-num").value) * (10 ** -7);
    settings.dragMultiplier = parseFloat(document.getElementById("drag-mult-num").value);
    settings.dragWidth = parseInt(document.getElementById("drag-width-num").value);
    settings.dragColour = document.getElementById("drag-colour").value;

}

// Dropdowns

visibility = {
    body : true,
    general : true,
    advanced : false
};

document.getElementById("body-dropdown").addEventListener("click", collapseBody);
document.getElementById("general-dropdown").addEventListener("click", collapseGeneral);
document.getElementById("advanced-dropdown").addEventListener("click", collapseAdvanced);


function collapseBody() {
    if (visibility.body) {
        visibility.body = false;
        document.getElementById("body-settings").style.display = "none";
        document.getElementById("body-icon").innerText = "expand_more";
    }
    else {
        visibility.body = true;
        document.getElementById("body-settings").style.display = "block";
        document.getElementById("body-icon").innerText = "expand_less";
    }
}

function collapseGeneral() {
    if (visibility.general) {
        visibility.general = false;
        document.getElementById("general-settings").style.display = "none";
        document.getElementById("general-icon").innerText = "expand_more";
    }
    else {
        visibility.general = true;
        document.getElementById("general-settings").style.display = "block";
        document.getElementById("general-icon").innerText = "expand_less";
    }
}

function collapseAdvanced() {
    if (visibility.advanced) {
        visibility.advanced = false;
        document.getElementById("advanced-settings").style.display = "none";
        document.getElementById("advanced-icon").innerText = "expand_more";
    }
    else {
        visibility.advanced = true;
        document.getElementById("advanced-settings").style.display = "block";
        document.getElementById("advanced-icon").innerText = "expand_less";
    }
}


// Create bodies when the add body button is clicked
function createBodyButton() {
    new Body(
        settings.radius, 
        settings.mass, 
        settings.colour, 
        {
            x:settings.pos.x, 
            y:settings.pos.y
        }, 
        {
            x:settings.vel.x, 
            y:settings.vel.y
        }
    );
}


// Creating bodies on mouse click
overlayCanvas.addEventListener("mousedown", startDrag);
overlayCanvas.addEventListener("mousemove", drag);
overlayCanvas.addEventListener("mouseup", createBodyMouse);

let _drag = false;
let initialPos = {};
let finalPos = {};
let dragVel = {};

function startDrag(event) {
    _drag = true;
    initialPos = {x : event.clientX, y : event.clientY};
    finalPos = {x : initialPos.x, y : initialPos.y};
    dragVel = {x : 0, y : 0};

}

function drag(event) {
    if (_drag) {
        finalPos = {x : event.clientX, y : event.clientY}

        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        overlayCtx.strokeStyle = settings.dragColour;
        overlayCtx.lineWidth = settings.dragWidth;

        overlayCtx.beginPath();
        overlayCtx.moveTo(initialPos.x, initialPos.y);
        overlayCtx.lineTo(finalPos.x, finalPos.y);
        overlayCtx.stroke();
        overlayCtx.closePath();
        
    }
}

function createBodyMouse() {
    _drag = false;
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    dragVel.x = (finalPos.x - initialPos.x) * settings.dragMultiplier;
    dragVel.y = -(finalPos.y - initialPos.y) * settings.dragMultiplier; // Negative since the default canvas has its y-axis inverted

    new Body(
        settings.radius, 
        settings.mass, 
        settings.colour, 
        {
            x : (initialPos.x - canvas.width/2 - translateLevel.x) / zoomLevel, 
            y : -(initialPos.y - canvas.height/2 - translateLevel.y) / zoomLevel
        }, 
        {
            x : dragVel.x, 
            y : dragVel.y
        }
    );
}


// Pause functionality
const pauseButton = document.getElementById("pause");
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


// Removing all bodies
function remove() {
    bodies = [];
}


// TODO: Restoring to default values
function resetBody() {
    settings.radius = 10 * (10 ** 3);
    document.getElementById("radius-slider").value = document.getElementById("radius-num").value = 10;
    settings.mass = 1000 * (10 ** 18);
    document.getElementById("mass-slider").value = document.getElementById("mass-num").value = 1000;
    settings.colour = document.getElementById("colour").value = "#71aff8";
    settings.pos = {x:0, y:0};
    document.getElementById("x-pos-num").value = document.getElementById("y-pos-num").value = 0;
    settings.vel = {x:0, y:0};
    document.getElementById("x-vel-slider").value = document.getElementById("x-vel-num").value = document.getElementById("y-vel-slider").value = document.getElementById("y-vel-num").value = 0;
}


function resetGeneral() {
    settings.trail = document.getElementById("trail-slider").value = document.getElementById("trail-num").value = 15;
    settings.canvasOpacity = 1/15;
    settings.t = document.getElementById("t-slider").value = document.getElementById("t-num").value = 1; 
}


function resetAdvanced() {
    settings.G = 0.0000000000667428;
    document.getElementById("G").value = "0.0000000000667428";
    settings.softening = document.getElementById("softening-slider").value = document.getElementById("softening-num").value = 250;
    settings.velCap = 20 * (10 ** 3);
    document.getElementById("vel-cap-slider").value = document.getElementById("vel-cap-num").value = 20;
    settings.dragMultiplier = document.getElementById("drag-mult-slider").value = document.getElementById("drag-mult-num").value = 25;
    settings.dragWidth = document.getElementById("drag-width-slider").value = document.getElementById("drag-width-num").value = 2;
    settings.dragColour = document.getElementById("drag-colour").value = "#7a71f8";
}


function resetAll() {
    resetBody();
    resetGeneral();
    resetAdvanced();
}


function resetZoom() {
    zoomLevel = 0.001;
    resizeCanvas();
}


function resetPan() {
    translateLevel = {x:0, y:0};
    resizeCanvas();
}


const sliderButton = document.getElementById("disable-sliders");
function disableSliders() {
    if (settings._sliders) {
        settings._sliders = false;
        sliderButton.innerText = "Sliders: DISABLED";
    }
    else {
        settings._sliders = true;
        sliderButton.innerText = "Sliders: ENABLED";
    }
}

const invertButton = document.getElementById("invert-y");
function invertY() {
    if (settings._invertY) {
        settings._invertY = false;
        invertButton.innerText = "Invert Y: OFF";
    }
    else {
        settings._invertY = true;
        invertButton.innerText = "Invert Y: ON";
    }
}