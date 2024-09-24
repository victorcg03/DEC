let ejercicio;

do {
    ejercicio = parseInt(prompt("Introduce 1, 2, 3, 4 o 5 para ver los ejercicios del bloque anterior o 0 para salir"));
    switch (ejercicio) {
        case 1:
            ejer1();
            break;
        case 2:
            ejer2();
            break;
        case 3:
            ejer3();
            break;
        case 4:
            ejer4();
            break;
        case 5:
            ejer5();
            break;
        case 0:
            alert("Saliendo del programa...");
            break;
        default:
            alert("Opcion no valida");
            break;
    }
} while (ejercicio != 0);


function ejer1() {
    let fecha = new Date(prompt("Introduce una fecha en formato '12/01/1978':"));
    let opciones = {year: 'numeric', month: 'long', day: 'numeric'};
    alert(fecha.toLocaleDateString('es-ES', opciones));
}
function ejer2(){
    let acertado = false;
    let numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
    while (!acertado) {
        let numeroIntroducido = prompt("Introduce el número que creas que es:");
        if (numeroIntroducido == numeroAleatorio) {
            acertado = true;
            alert("Enhorabuena! Has acertado! El numero era el " + numeroAleatorio);
        } else if(numeroAleatorio < numeroIntroducido){
            alert("Has fallado! El numero a adivinar es menor al que has introducido!");
        } else {
            alert("Has fallado! El numero a adivinar es mayor al que has introducido!");
        }
    }
}
function ejer3(){
    let salir = false;
    let vocales = ["a","e","i","o","u"];
    while (!salir) {
        let caracterIntroducido = prompt("Introduce un caracter y te dire si es vocal o no (introduce espacio para salir)");
        if (caracterIntroducido == " ") {
            salir = true;
        } else if (vocales.includes(caracterIntroducido.toLowerCase())){
            alert("VOCAL");
        } else {
            alert("NO VOCAL");
        }
    }
}
function ejer4(){
    let num1;
    let num2;
    do{
        num1 = parseInt(prompt("Introduce limite inferior:"));
        num2 = parseInt(prompt("Introduce limite superior:"));
        if (num1 > num2) {
            alert("El limite inferior no puede ser un numero mayor al limite superior, vuelve a introducirlos");
        }
    }while (num1 > num2)
    let sumaIntervalo = 0;
    let numerosFueraIntervalo = [];
    let introducidoIgualLimites = false;
    let numeroIntroducido;
    numeroIntroducido = parseInt(prompt("Introduce un numero (0 para salir)"));
    while(numeroIntroducido != 0){
        if (numeroIntroducido > num1 && numeroIntroducido < num2) {
            sumaIntervalo += numeroIntroducido;
        } else if (numeroIntroducido < num1 || numeroIntroducido > num2) {
            numerosFueraIntervalo.push(numeroIntroducido);
        } else {
            introducidoIgualLimites = true;
        }
        numeroIntroducido = parseInt(prompt("Introduce un numero (0 para salir)"));
    };
    alert(`La suma de los números que estaban DENTRO del intervalo es: ${sumaIntervalo}, ${numerosFuera()}, ${introducidoIgualLimites ? "y se ha introducido algún numero igual a los limites" : "y no se ha introducido algún numero igual a los limites"}`);
    function numerosFuera() {
        if (numerosFueraIntervalo.length > 0) {
            return "los numeros introducidos que estaban FUERA del intervalo son " + numerosFueraIntervalo.join(',');
        }else{
            return "no se han introducido numeros FUERA del intervalo";
        }
    }
}
function ejer5(){
    let colorIntroducido = prompt("Introduce un color en formato 'R,G,B' (ej: 177,68,92)");
    let coloresSeparados = colorIntroducido.split(',');
    let coloresHex = "#";
    for (let i = 0; i < coloresSeparados.length; i++) {
        colorSeguroDecimal = Math.round(parseInt(coloresSeparados[i]) / 51) * 51;
        colorSeguroHex = colorSeguroDecimal.toString(16).toUpperCase();
        colorSeguroHex = colorSeguroHex.length === 1 ? "0" + colorSeguroHex : colorSeguroHex;
        coloresHex+=colorSeguroHex;
    }
    alert("El color seguro en hex sería " + coloresHex);
}