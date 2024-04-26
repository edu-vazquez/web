document.getElementById("00").addEventListener("click", ejecutar);
document.getElementById("01").addEventListener("click", ejecutar);
document.getElementById("02").addEventListener("click", ejecutar);
document.getElementById("10").addEventListener("click", ejecutar);
document.getElementById("11").addEventListener("click", ejecutar);
document.getElementById("12").addEventListener("click", ejecutar);
document.getElementById("20").addEventListener("click", ejecutar);
document.getElementById("21").addEventListener("click", ejecutar);
document.getElementById("22").addEventListener("click", ejecutar);

let jugador = "X";
let jugadasX = [];
let jugadasO = [];
document.getElementById("jugador").innerHTML = jugador;

function ejecutar(e){
    if (jugador == "X"){
        document.getElementById(e.target.id).innerHTML = "X";
        jugadasX.push(e.target.id);
        jugador = "O";
        document.getElementById("jugador").innerHTML = "O";
        if (check(jugadasX)){
            alert("ganador X");
            clean();
        }
    }else{
        document.getElementById(e.target.id).innerHTML = "O";
        jugador = "X";
        document.getElementById("jugador").innerHTML = "X";
        jugadasO.push(e.target.id);
        if (check(jugadasO)){
            alert("ganador O");
            clean();
        };
    }
}
function check(array){

    let counter0 = 0;
    let counter1 = 0;
    let counter2 = 0;

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
        }
        if (counter0 == 3 || counter1 == 3 || counter2 == 3){
            return (1);
        }else{
            counter0 = 0;
            counter1 = 0;
            counter2 = 0;
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
    console.log(jugadasX);
    console.log(jugadasX);
}