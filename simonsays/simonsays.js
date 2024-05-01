
let elementRed = document.getElementById("red");
let elementBlue = document.getElementById("blue");
let elementYellow = document.getElementById("yellow");
let elementGreen = document.getElementById("green");

let simonInputRed = "red";
let simonInputBlue = "blue";
let simonInputYellow = "yellow";
let simonInputGreen = "green";

let playerArray = [];
let simonArray = [];

elementRed.addEventListener("click", playerInput);
elementBlue.addEventListener("click", playerInput);
elementYellow.addEventListener("click", playerInput);
elementGreen.addEventListener("click", playerInput);
document.getElementById("simon").addEventListener("click", glowCircle);
window.onload = glowCircle;
function playerInput(e){
    playerArray.push(e.target.id);
    alert(areEquals());
}
function simonInput(){
    simonArray.push(simonChoose());
    document.getElementById("simonArray").innerHTML = `Simon Array: ${simonArray}`;
}

function areEquals(){
    for (i = 0 ; i < simonArray.length ; i++ ){
        if (simonArray[i] != playerArray[i]){
            return("no son iguales");
        }
    }
    return ("son iguales");
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