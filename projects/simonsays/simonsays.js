
let elementRed = document.getElementById("red");
let elementBlue = document.getElementById("blue");
let elementYellow = document.getElementById("yellow");
let elementGreen = document.getElementById("green");
let elementLose = document.getElementById("lose");
let elementSimon = document.getElementById("simon");

let simonInputRed = "red";
let simonInputBlue = "blue";
let simonInputYellow = "yellow";
let simonInputGreen = "green";

let playerArray = [];
let simonArray = [];
let play = false;

elementRed.addEventListener("click", playerInput);
elementBlue.addEventListener("click", playerInput);
elementYellow.addEventListener("click", playerInput);
elementGreen.addEventListener("click", playerInput);
elementSimon.addEventListener("click", simonPlay);

window.onload = glowCircle;
elementLose.addEventListener("click", () => {
    elementLose.style.display = "none";
    elementSimon.addEventListener("click", simonPlay);
})

function simonPlay(){
    if (play == false){
        simonClick();
    }
    simonArray.push(simonChoose());
    for (let i = 0 ; i < simonArray.length ; i++){
        glow(simonArray[i], i * 500 + 1, i * 500 + 300);
    }
    playerArray = [];
    play = true;
    let nivel = simonArray.length;
    elementSimon.innerHTML = `<p>${nivel}</p>`;
    elementSimon.removeEventListener("click", simonPlay);
}

function playerInput(e){
    if (play == true){
        playerArray.push(e.target.id);
        areEquals();
        glow(e.target.id, 1, 300);
    }
}
function areEquals(){
    for (let i = 0 ; i < playerArray.length ; i++ ){
        if (simonArray[i] !== playerArray[i]){
            simonArray = [];
            playerArray = [];
            elementLose.style.display = "flex";
            elementSimon.innerHTML = `<p>SIMON</p>`;
            play = false;
            return (0);
        }
    }
    if (playerArray.length == simonArray.length){
        setTimeout(() => {
            simonPlay();
        }, 1000);
    }
}

function glow(elementId, time1, time2){
    setTimeout(() => {
        document.getElementById(elementId).classList.add("glow");
    }, time1); 
    setTimeout(() => {
        document.getElementById(elementId).classList.remove("glow");
    }, time2);
}

function simonClick(){
    setTimeout(() => {
        elementSimon.style.backgroundColor = "rgb(211, 211, 211)";
    }, 1); 
    setTimeout(() => {
        elementSimon.style.backgroundColor = "white";
    }, 200);
}

function glowCircle(){
setTimeout(() => {
    elementRed.classList.add("glow");
}, 1); 
setTimeout(() => {
  elementRed.classList.remove("glow");
}, 500); 

setTimeout(() => {
    elementBlue.classList.add("glow");
}, 500); 
setTimeout(() => {
  elementBlue.classList.remove("glow");
}, 1000);

setTimeout(() => {
    elementYellow.classList.add("glow");
}, 1000); 
setTimeout(() => {
  elementYellow.classList.remove("glow");
}, 1500);

setTimeout(() => {
    elementGreen.classList.add("glow");
}, 1500); 
setTimeout(() => {
  elementGreen.classList.remove("glow");
}, 2000);
}

function simonInput(){
    simonArray.push(simonChoose());
    document.getElementById("simonArray").innerHTML = `Simon Array: ${simonArray}`;
}

function simonChoose(){
    let eleccion = Math.floor(Math.random() * 4);
    switch (eleccion){
        case 0:
        return ("green");
        case 1:
        return ("red");
        case 2:
        return ("blue");
        case 3:
        return ("yellow");
    }
}
