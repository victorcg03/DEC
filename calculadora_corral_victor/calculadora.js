window.addEventListener('load', function(){
    let botones = document.querySelectorAll('.boton');
    let botonPuesto = false;
    botones.forEach(boton => {
        boton.addEventListener('mousedown', teclaPulsada);
        boton.addEventListener('mouseup', function(){
            boton.classList.remove('sombra');
        });
    });
    function desactivarTeclasCalculo(){
        let teclasCalculo = document.querySelectorAll('.calculo').forEach(tecla => {
            tecla.removeEventListener('mousedown', teclaPulsada);
        });
    }
    function activarTeclasCalculo(){
        let teclasCalculo = document.querySelectorAll('.calculo').forEach(tecla => {
            tecla.addEventListener('mousedown', teclaPulsada);
        });
    }
    function teclaPulsada(event){
        event.target.classList.add('sombra');
        let contenidoTeclaPulsada = event.target.innerText;
        if (contenidoTeclaPulsada == 'C') {
            punto.addEventListener('mousedown', teclaPulsada);
            pantalla.value = 0;
            botonPuesto = false;
        } else if(contenidoTeclaPulsada == '()'){
            if (!isNaN(pantalla.value.charAt(pantalla.value.length-1))) {
                pantalla.value = '(' + pantalla.value + ')';
                botonPuesto = true;
            }
        } else if(contenidoTeclaPulsada == '='){
            if (!isNaN(pantalla.value.charAt(pantalla.value.length-1))) {
                pantalla.value = eval(pantalla.value.replaceAll('x', '*').replaceAll('%', '*0.'));
            }
        } else if(contenidoTeclaPulsada == '«'){
            if (pantalla.value.substring(pantalla.value.length-1) == '.') {
                punto.addEventListener('mousedown', teclaPulsada); 
            }
            pantalla.value = pantalla.value.substring(0, pantalla.value.length-1)
            if (pantalla.value == '') {
                pantalla.value = 0;
            }
        } else if (contenidoTeclaPulsada == '.'){
            if (!botonPuesto) {
                pantalla.value += '.';
                punto.removeEventListener('mousedown', teclaPulsada);
                botonPuesto = true;
            }
        }else {
            if (pantalla.value == 0 && !pantalla.value.includes('.')) {
                pantalla.value = contenidoTeclaPulsada;
            } else {
                pantalla.value += contenidoTeclaPulsada;
            }
        }
        if (contenidoTeclaPulsada == '.' && botonPuesto) {
            desactivarTeclasCalculo();
        }else if(event.target.classList.contains('calculo') && contenidoTeclaPulsada != '.'){
            desactivarTeclasCalculo();
            botonPuesto = false;
        } else{
            activarTeclasCalculo();
        }
    }
});