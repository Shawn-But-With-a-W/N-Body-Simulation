resizePanel();

window.addEventListener("resize", resizePanel);

function resizePanel() {
    document.getElementById("input-panel").style.height = `${window.innerHeight * 0.6}px`;
    document.getElementById("input-panel").style.width = `${window.innerWidth * 0.2}px`;
    document.getElementById("input-panel").style.top = `${window.innerHeight*0.2}px`;
}

