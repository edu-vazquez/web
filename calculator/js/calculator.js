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
document.getElementById(",").addEventListener("click", write);


document.getElementById("c").addEventListener("click", write);

function write(e){

    if (e.target.id == "c"){
        document.getElementById("screen").innerHTML = "";
    }
    else{
        document.getElementById("screen").innerHTML += e.target.id;
    }


}