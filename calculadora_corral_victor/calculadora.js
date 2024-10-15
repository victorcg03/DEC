window.addEventListener('load', function(){
    let botones = document.querySelectorAll('.boton');
    let botonPuesto = false;
    botones.forEach(boton => {
        boton.addEventListener('mousedown', event => {
            boton.classList.add('sombra');
            teclaPulsada(boton.innerText)
        })
        boton.addEventListener('mouseup', () => {
            boton.classList.remove('sombra');
        });
    });
    document.addEventListener('keydown', event => {
        if (!isNaN(event.key) || event.key == 'Backspace' || event.key == '/' || event.key == '-' || event.key == '+' || event.key == '.' || event.key == '%' || event.key == 'Enter' || event.key == '*' || event.key == 'x'  || event.key == '('  || event.key == ')') {
            teclaPulsada(event.key);
        }
    })
    function calcularPorcentaje(expresion) {
        return expresion.replace(/(\d+)%(\d+(\.\d+)?)/g, function(match, num1, num2){
            return `(${num1} * (${num2} / 100))`;
        });
    }
    function teclaPulsada(contenidoTeclaPulsada){
        if (contenidoTeclaPulsada == 'C') {
            pantalla.value = 0;
            botonPuesto = false;
        } else if(contenidoTeclaPulsada == '()' || contenidoTeclaPulsada == '(' || contenidoTeclaPulsada == ')'){
            if (!isNaN(pantalla.value.charAt(pantalla.value.length-1))) {
                pantalla.value = '(' + pantalla.value + ')';
                botonPuesto = true;
            }
        } else if(contenidoTeclaPulsada == '=' || contenidoTeclaPulsada == 'Enter'){
            if (!isNaN(pantalla.value.charAt(pantalla.value.length-1)) || pantalla.value.charAt(pantalla.value.length-1) == ')') {
                pantalla.value = eval(calcularPorcentaje(pantalla.value.replaceAll('x', '*')));
                botonPuesto = pantalla.value.includes('.');
            }
        } else if(contenidoTeclaPulsada == '«' || contenidoTeclaPulsada == 'Backspace'){
            botonPuesto = !pantalla.value.substring(pantalla.value.length-1) == '.';
            pantalla.value = pantalla.value.substring(0, pantalla.value.length-1)
            if (pantalla.value == '') {
                pantalla.value = 0;
            }
        } else if (contenidoTeclaPulsada == '.'){
            if (!botonPuesto && !isNaN(pantalla.value.charAt(pantalla.value.length-1))) {
                pantalla.value += '.';
                botonPuesto = true;
            }
        }else {
            if (contenidoTeclaPulsada == '*') {
                contenidoTeclaPulsada = 'x';
            }
            if (isNaN(contenidoTeclaPulsada) && botonPuesto && pantalla.value.charAt(pantalla.value.length-1) != '.') {
                botonPuesto = false;
            }
            
            if ((isNaN(contenidoTeclaPulsada) && (!isNaN(pantalla.value.charAt(pantalla.value.length-1)) || pantalla.value.charAt(pantalla.value.length-1) == ')')) || (!isNaN(contenidoTeclaPulsada) && pantalla.value.charAt(pantalla.value.length-1) != ')')) {
                if (pantalla.value == 0 && !pantalla.value.includes('.')) {
                    if (!isNaN(contenidoTeclaPulsada)) {
                        pantalla.value = contenidoTeclaPulsada;
                    }
                } else {
                    pantalla.value += contenidoTeclaPulsada;
                }
            }
        }
    }
});