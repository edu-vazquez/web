document.getElementById("0").addEventListener("click", write);
document.getElementById("1").addEventListener("click", write);
document.getElementById("2").addEventListener("click", write);
document.getElementById("3").addEventListener("click", write);
document.getElementById("4").addEventListener("click", write);
document.getElementById("5").addEventListener("click", write);
document.getElementById("6").addEventListener("click", write);
document.getElementById("7").addEventListener("click", write);
document.getElementById("8").addEventListener("click", write);
document.getElementById("9").addEventListener("click", write);
document.getElementById(".").addEventListener("click", write);


document.getElementById("c").addEventListener("click", write);
document.getElementById("+/-").addEventListener("click", sign);
document.getElementById("%").addEventListener("click", percentage);

document.getElementById("+").addEventListener("click", operation);
document.getElementById("-").addEventListener("click", operation);
document.getElementById("/").addEventListener("click", operation);
document.getElementById("x").addEventListener("click", operation);
document.getElementById("equals").addEventListener("click", operation);


let counter = 0;
let operationAr = "";
let value1 = 0;
let value2 = 0;

function sign(){
    if (Number(document.getElementById("screen").textContent) > 0){
        document.getElementById("screen").innerHTML = `-${document.getElementById("screen").textContent}`;
    }
}
function percentage(){
    document.getElementById("screen").innerHTML = `${document.getElementById("screen").textContent/100}`;
}

function write(e){
    if (operationAr == "equals"){
        document.getElementById("screen").innerHTML = "";
        operationAr = "";
    }
    if (e.target.id == "c") {
        document.getElementById("screen").innerHTML = "";
        counter = 0;
        value1 = 0;
        operationAr = "";
    }
    else if (counter < 10){
        document.getElementById("screen").innerHTML += e.target.id;
        counter++;
    }
}
function operation(e){
    if (operationAr == "+"){
        value1 += Number(document.getElementById("screen").textContent);
        document.getElementById("screen").innerHTML = "";
        counter = 0;
    }
    else if (operationAr == "-"){
        value1 -= Number(document.getElementById("screen").textContent);
        document.getElementById("screen").innerHTML = "";
        counter = 0;
    }
    else if (operationAr == "x"){
        value1 *= Number(document.getElementById("screen").textContent);
        document.getElementById("screen").innerHTML = "";
        counter = 0;
    }
    else if (operationAr == "/"){
        value1 /= Number(document.getElementById("screen").textContent);
        document.getElementById("screen").innerHTML = "";
        counter = 0;
    }
    else {
        value1 = Number(document.getElementById("screen").textContent);
        document.getElementById("screen").innerHTML = "";
        counter = 0;
    }
    operationAr = e.target.id;
    if (operationAr =="equals"){
        document.getElementById("screen").innerHTML = value1 ;
    counter = 0;
    value1 = 0;
    operationAr = "equals";
    }
}