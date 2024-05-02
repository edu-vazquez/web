document.getElementById("00").addEventListener("click", ejecutar);
document.getElementById("01").addEventListener("click", ejecutar);
document.getElementById("02").addEventListener("click", ejecutar);
document.getElementById("10").addEventListener("click", ejecutar);
document.getElementById("11").addEventListener("click", ejecutar);
document.getElementById("12").addEventListener("click", ejecutar);
document.getElementById("20").addEventListener("click", ejecutar);
document.getElementById("21").addEventListener("click", ejecutar);
document.getElementById("22").addEventListener("click", ejecutar);

document.getElementById("anuncioBox").addEventListener("click", clean);

let jugador = "X";
let jugadasX = [];
let jugadasO = [];
document.getElementById("jugador").innerHTML = jugador;

function ejecutar(e){
    let contenido = document.getElementById(e.target.id).textContent;
    if (jugador == "X" && contenido == ""){
        document.getElementById(e.target.id).innerHTML = "X";
        jugadasX.push(e.target.id);
        jugador = "O";
        document.getElementById("jugador").innerHTML = "O";
        if (check(jugadasX)){
            setTimeout(function() {
                anuncio("X");
            }, 200);

        }
    }else if (jugador == "O" && contenido == ""){
        document.getElementById(e.target.id).innerHTML = "O";
        jugador = "X";
        document.getElementById("jugador").innerHTML = "X";
        jugadasO.push(e.target.id);
        if (check(jugadasO)){
            setTimeout(function() {
                anuncio("O");
            }, 200);
        }
    }
}
function check(array){

    let counter0 = 0;
    let counter1 = 0;
    let counter2 = 0;
    let counterdig1 = 0;
    let counterdig2 = 0;

    for (let j = 0; j <= 1 ; j++){
        for (let array_i = 0; array_i < array.length; array_i++){
            switch (array[array_i][j]){
                case "0":
                    counter0++;
                    break;
                case "1":
                    counter1++;
                    break;
                case "2":
                    counter2++;
            }
            switch (array[array_i]){
                case "00":
                    counterdig1++;
                    break;
                case "11":
                    counterdig1++;
                    counterdig2++;
                    break;
                case "22":
                    counterdig1++;
                    break;
            }
            switch (array[array_i]){
                case "20":
                    counterdig2++;
                    break;
                case "02":
                    counterdig2++;
                    break;
            }
        }
        if (counter0 == 3 || counter1 == 3 || counter2 == 3 || counterdig1 == 3 || counterdig2 == 3){
            return (1);
        }else{
            counter0 = 0;
            counter1 = 0;
            counter2 = 0;
            counterdig1 = 0;
        }
    }
    return(0);
}
function clean(){
    for (let i = 0; i <= 2; i++ ){
        for (let j = 0; j <= 2; j++){
            let location = i.toString() + j.toString();
            document.getElementById(location).innerHTML = "";
        }
    }
    jugadasX = [];
    jugadasO = [];
    document.getElementById("anuncioBox").style.display = "none";
}
function anuncio(winner){
    document.getElementById("anuncio").innerHTML = `${winner}`;
    document.getElementById("anuncioBox").style.display = "flex";
}