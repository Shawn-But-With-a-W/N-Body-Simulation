let settings = {
    radius : 50,
    mass : 10**15,
    colour : "#71aff8",
    pos : {x:0, y:0},
    vel : {x:0, y:0},
    G : 0.0000000000667428, // Gravitational constant, used in calculation of force
    t : 1, // Time interval between consecutive calculations
    softening : 500, // Used to prevent the denominator in GMm/r^2 from going to 0 and producing infinite force
    trailLength : 4
}

// window.addEventListener("resize", resizePanel);

// function resizePanel() {
//     document.getElementById("input-panel").style.height = `${window.innerHeight * 0.6}px`;
//     document.getElementById("input-panel").style.width = `${window.innerWidth * 0.2}px`;
//     document.getElementById("input-panel").style.top = `${window.innerHeight*0.2}px`;
// }

