function hacerCirculo(elemento) {
    elemento.classList.add("circulo");
}
function quitarCirculo(elemento) {
    elemento.classList.remove("circulo");
}
function alternarSombra(elemento) {
    elemento.classList.toggle('sinSombra');
}
function modificar(elemento) {
    elemento.classList.add('sombraInteriorCirculo');
}
function eliminar(elemento) {
    elemento.parentNode.remove();
}
function quijote() {
    let totalIntentos = 0;
    let i = 0
    while (i != 10000) {
        let correcto = false;
        let intento = 0;
        while (!correcto) {
            let parrafo = "hol";
            let output = "";
            for (let index = 0; index < parrafo.length; index++) {
                if (parrafo.charAt(index) == ' ') {
                    output += ' ';
                } else {
                    let caracter = generarAleatorios(1);
                    if (caracter == parrafo.charAt(index)) {
                        output += caracter;
                    } else {
                        break;
                    }
                }

                if (output == parrafo) {
                    correcto = true;
                    console.log("Iteración " + i + ". Intento " + intento + ":" + output);
                    totalIntentos += intento;
                }
            }
            intento++;
        }
        i++;
    }
    console.log("Media de intentos:" + (totalIntentos / i) + " en " + i + " iteraciones ");
}
function barajar(array) {
    let posicionActual = array.length;

    while (0 !== posicionActual) {
        const posicionAleatoria = Math.floor(Math.random() * posicionActual);
        posicionActual--;
        //"truco" para intercambiar los valores sin necesidad de una variable auxiliar
        [array[posicionActual], array[posicionAleatoria]] = [
            array[posicionAleatoria], array[posicionActual]];
    }
    return array;
}

function generarAleatorios(cantidad) {
    const caracteres = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz".split("");
    barajar(caracteres);
    return caracteres.slice(0, cantidad).join("")
}