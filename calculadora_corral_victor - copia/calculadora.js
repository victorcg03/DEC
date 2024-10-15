window.addEventListener('load', function(){
    let botones = document.querySelectorAll('.boton');
    botones.forEach(boton=>boton.addEventListener('mousedown', event=>{
        boton.classList.add('sombra');
        teclaPulsada(event.target.innerText);
    }))
    botones.forEach(boton=>boton.addEventListener('mouseup', ()=>boton.classList.remove('sombra')));
    document.addEventListener('keydown', (event)=>teclaPulsada(event.key));
    let operadores = ['+', '-', 'x', '/', '%'];
    let parentesis = ['()', '(', ')'];
    let puntoDisponible = true;
    function teclaPulsada(contenidoTecla){
        if (contenidoTecla.trim().length == 0) {
            return;
        }
        if (contenidoTecla == '*') {
            contenidoTecla = 'x';
        }
        let valorPantalla = pantalla.value;        
        let ultimoCaracterPantalla = valorPantalla.charAt(valorPantalla.length-1);
        if ((!isNaN(contenidoTecla) && ultimoCaracterPantalla != ')') || (operadores.includes(contenidoTecla) && (ultimoCaracterPantalla == ')' || !isNaN(ultimoCaracterPantalla)))) {
            actualizarPantalla(contenidoTecla);
            if (!puntoDisponible) {
                puntoDisponible = isNaN(contenidoTecla);
            }
        } else if(contenidoTecla == '«' || contenidoTecla == 'Backspace'){
            let nuevoValor;
            if (ultimoCaracterPantalla == ')') {
                nuevoValor = valorPantalla.substring(1, valorPantalla.length-1)
            } else {
                nuevoValor = valorPantalla.substring(0, valorPantalla.length-1);
            }
            pantalla.value = nuevoValor == '' ? 0 : nuevoValor;
            puntoDisponible = ultimoCaracterPantalla == '.';
        } else if(contenidoTecla == '=' || contenidoTecla == 'Enter'){
            if (!isNaN(pantalla.value.charAt(pantalla.value.length-1)) || pantalla.value.charAt(pantalla.value.length-1) == ')') {
                pantalla.value = eval(calcularPorcentaje(pantalla.value.replaceAll('x', '*')));
                puntoDisponible = !pantalla.value.includes('.');
            }
        } else if(contenidoTecla == 'C' || contenidoTecla == 'Escape'){
            pantalla.value = 0;
            puntoDisponible = true;
        } else if(contenidoTecla == '.' && puntoDisponible){
            if (!isNaN(ultimoCaracterPantalla)) {
                actualizarPantalla('.');
                puntoDisponible = false;
            }
        } else if(parentesis.includes(contenidoTecla) && !isNaN(ultimoCaracterPantalla)){
            pantalla.value = '(' + valorPantalla + ')';
        }
        pantalla.scrollLeft = pantalla.scrollWidth; 
    }
    function actualizarPantalla(valor){
        if (pantalla.value == '0' && valor != '.') {
            pantalla.value = valor;
        } else{
            pantalla.value += valor;
        }
    }
    function calcularPorcentaje(expresion) {
        return expresion.replace(/(\d+)%(\d+(\.\d+)?)/g, function(match, num1, num2){
            return `(${num1} * (${num2} / 100))`;
        });
    }
});