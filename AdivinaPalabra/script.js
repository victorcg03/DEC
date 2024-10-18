const abecedarioEspañol = ['a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'í', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'ó', 'p', 'q', 'r', 's', 't', 'u', 'ú', 'ü', 'v', 'w', 'x', 'y', 'z', 'Space'];
let teclasPulsadas = [];
let palabraRandom = 'Hola Mundo';
let oportunidadLetras = 5;
window.addEventListener('load', ()=>{
    abecedarioEspañol.forEach(letra => {
        teclado.innerHTML += `<div class="tecla" id="${letra}">${letra}</div>`
    });
    boton.addEventListener('click', function () {
        tarjeta.style.display = 'none';
        document.querySelector('main').classList.remove('opacidad');
        habilitarEventos();
    });
    
    for (let i = 0; i < palabraRandom.length; i++) {
        palabraAdivinar.innerText += '_';
    }
});

function teclaHover(event) {
    event.target.classList.toggle('hover');
}

function teclaPulsada(event){
    if (abecedarioEspañol.includes(event.key) || abecedarioEspañol.includes(event.target.innerText) || event.key == ' ') {
        let tecla = document.getElementById(event.key);
        if (tecla == null) {
            tecla = event.target;
        }
        if (event.key == ' ') {
            tecla = document.getElementById('Space');
        }
        if (!teclasPulsadas.includes(tecla.innerText)) {
            tecla.classList.add('pulsada');
            tecla.removeEventListener('mouseover', teclaHover);
            tecla.removeEventListener('mouseleave', teclaHover);
            tecla.removeEventListener('mousedown', teclaPulsada);
            tecla.classList.remove('hover');
            tecla.style.boxShadow = 'none';
            tecla.style.opacity = '40%';
            teclasPulsadas.push(tecla.innerText)
            comprobarLetra(tecla.innerText);
        }
    }
}

function teclaLevantada(event){
    let tecla = document.getElementById(event.key);
    if (tecla == null && abecedarioEspañol.includes(event.target.innerText)) {
        tecla = event.target;
    }
    if (tecla != null) {
        tecla.classList.remove('pulsada');
    } else{
        abecedarioEspañol.forEach(letra =>{
            document.getElementById(letra).classList.remove('pulsada');
        });
    }
}

function comprobarLetra(letra) {
    if (letra == 'Space') {
        letra = ' ';
    }

    if (palabraRandom.toLowerCase().includes(letra)) {
        deshabilitarEventos();
        let textoActual = palabraAdivinar.innerText.split('');
        for (let i = 0; i < palabraRandom.length; i++) {
            if (palabraRandom.toLowerCase().charAt(i) == letra) {
                setTimeout(() => {
                    textoActual[i] = palabraRandom.charAt(i);
                    palabraAdivinar.innerText = textoActual.join('');
                }, i * 100);
            }
        }
    } else {
        oportunidadLetras--;
        oportunidadesLetras.innerText = oportunidadLetras + ' letras restantes';
    }
    if (palabraAdivinar.innerText.toLowerCase() == palabraRandom.toLowerCase()) {
        partidaGanada.style.display = 'flex';
    }
    setTimeout(() => {
        habilitarEventos();
    }, palabraRandom.length * 100);
}

function habilitarEventos(){
    document.querySelectorAll('.tecla').forEach(tecla => {
        tecla.addEventListener('mouseover', teclaHover);
        tecla.addEventListener('mouseleave', teclaHover);
        tecla.addEventListener('mousedown', teclaPulsada);
        tecla.addEventListener('mouseup', teclaLevantada);
    });
    document.addEventListener('keydown', teclaPulsada);
    document.addEventListener('keyup', teclaLevantada);
}
function deshabilitarEventos(){
    document.querySelectorAll('.tecla').forEach(tecla => {
        tecla.removeEventListener('mouseover', teclaHover);
        tecla.removeEventListener('mouseleave', teclaHover);
        tecla.removeEventListener('mousedown', teclaPulsada);
        tecla.removeEventListener('mouseup', teclaLevantada);
    });
    document.removeEventListener('keydown', teclaPulsada);
    document.removeEventListener('keyup', teclaLevantada);
}