let opcionElegida;
do {
    let num1 = parseFloat(prompt("Introduce num1:"));
    let num2 = parseFloat(prompt("Introduce num2:"));
    opcionElegida = parseInt(obtenerOpcion());
    let output = "El resultado de ";
    switch (opcionElegida) {
        case 1:
            output += "la suma de " + num1 + " mas " + num2 + " es " + suma(num1, num2);
            break;
        case 2:
            output += "la resta de " + num1 + " menos " + num2 + " es " + resta(num1, num2);
            break;
        case 3:
            let resultado = division(num1, num2);
            output += "la division de " + num1 + " entre " + num2 + " es " + resultado[0] + " y el resto es " + resultado[1];
            break;
        case 4:
            output += "la multiplicación de " + num1 + " por " + num2 + " es " + multiplica(num1, num2);
            break;
        case 0:
            output = "Entendido! Saliendo de la aplicación...";
            break;
        default:
            output = "La opción elegida no es valida!";
            break;
    }
    alert(output);
} while (opcionElegida != 0);

function obtenerOpcion(){
    let output = "¿Qué deseas hacer? \n";
    output += "(1). Suma \n";
    output += "(2). Resta \n";
    output += "(3). Division \n";
    output += "(4). Multiplicación \n";
    output += "(0). Salir \n";
    return prompt(output);
}
function suma(n1, n2){
    return n1+n2;
}
function resta(n1, n2){
    return n1-n2;
}
function multiplica(n1, n2){
    return n1*n2;
}
function division(n1, n2){
    return [parseInt(n1/n2), n1%n2];
}