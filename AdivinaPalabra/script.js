const abecedarioEspañol = ['a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'í', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'ó', 'p', 'q', 'r', 's', 't', 'u', 'ú', 'ü', 'v', 'w', 'x', 'y', 'z'];
let teclasPulsadas = [];
let palabraRandom;
let oportunidadLetras = 15;
window.addEventListener('load', ()=>{
    abecedarioEspañol.forEach(letra => {
        teclado.innerHTML += `<div class="tecla" id="${letra}">${letra}</div>`
    });
    boton.addEventListener('click', function () {
        tarjeta.style.display = 'none';
        document.querySelector('main').classList.remove('opacidad');
        palabraAdivinar.innerText = "";
        palabraRandom = peliculasFamosasEsp[getRandomIntInclusive(0, peliculasFamosasEsp.length-1)];
        console.log(palabraRandom);
        for (let i = 0; i < palabraRandom.length; i++) {
            let charActual = palabraRandom.toLowerCase().charAt(i);
            console.log(charActual);
            if (charActual == " ") {
                console.log("espacio");
                palabraAdivinar.innerText += " ";
            } else if (!abecedarioEspañol.includes(charActual)) {
                palabraAdivinar.innerText += charActual;
            } else {
                palabraAdivinar.innerText += '_';
            }
        }
        habilitarEventos();
    });
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
        setTimeout(() => {
            if (palabraAdivinar.innerText.toLowerCase() == palabraRandom.toLowerCase()) {
                partidaGanada.style.display = 'flex';
            }else{
                habilitarEventos();
            }
        }, palabraRandom.length * 100);
    } else {
        oportunidadLetras--;
        if (oportunidadLetras == 0) {
            deshabilitarEventos()
            partidaPerdida.style.display = 'flex';
        }
        oportunidadesLetras.innerText = oportunidadLetras + ' letras restantes';
    }

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
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // El máximo es inclusivo y el mínimo es inclusivo
}
const peliculasFamosasEsp = [
    "El Padrino",
    "Sueño de Fuga",
    "Tiempos Violentos",
    "El Caballero de la Noche",
    "Forrest Gump",
    "El Origen",
    "El Club de la Pelea",
    "Matrix",
    "El Señor de los Anillos: La Comunidad del Anillo",
    "Star Wars: Una Nueva Esperanza",
    "El Señor de los Anillos: El Retorno del Rey",
    "Interestelar",
    "Star Wars: El Imperio Contraataca",
    "El Silencio de los Inocentes",
    "La Lista de Schindler",
    "Milagros Inesperados",
    "Volver al Futuro",
    "Gladiador",
    "El Rey León",
    "Titanic",
    "Parque Jurásico",
    "Los Infiltrados",
    "Rescatando al Soldado Ryan",
    "El Gran Truco",
    "Corazón Valiente",
    "El Sexto Sentido",
    "Los Miserables",
    "La Vida es Bella",
    "El Pianista",
    "El Lobo de Wall Street",
    "Django Sin Cadenas",
    "Bastardos sin Gloria",
    "Los Juegos del Hambre",
    "Avatar",
    "Cisne Negro",
    "El Gran Hotel Budapest",
    "El Laberinto del Fauno",
    "La La Land",
    "Bohemian Rhapsody",
    "El Código Da Vinci",
    "El Perfume: Historia de un Asesino",
    "12 Años de Esclavitud",
    "Roma",
    "El Hijo de la Novia",
    "Relatos Salvajes",
    "La Mujer Maravilla",
    "El Señor de los Anillos: Las Dos Torres",
    "Rocky",
    "Rápidos y Furiosos",
    "Búsqueda Implacable",
    "Hombres de Negro",
    "Harry Potter y la Piedra Filosofal",
    "Harry Potter y las Reliquias de la Muerte",
    "Piratas del Caribe: La Maldición del Perla Negra",
    "El Diablo Viste a la Moda",
    "El Planeta de los Simios",
    "Jumanji",
    "Terminator 2: El Juicio Final",
    "Indiana Jones: En Busca del Arca Perdida",
    "Mujer Bonita",
    "El Diario de una Pasión",
    "Los Otros",
    "El Exorcista",
    "Psicosis",
    "Scarface: El Precio del Poder",
    "Lo que el Viento se Llevó",
    "Cantando Bajo la Lluvia",
    "Los Siete Samuráis",
    "Amélie",
    "El Niño con el Pijama de Rayas",
    "El Gran Escape",
    "Los Cazafantasmas",
    "La Dama y el Vagabundo",
    "Blanca Nieves y los Siete Enanos",
    "Cenicienta",
    "La Sirenita",
    "Aladdín",
    "El Libro de la Selva",
    "E.T., El Extraterrestre",
    "Buscando a Nemo",
    "Toy Story",
    "Toy Story 3",
    "Up: Una Aventura de Altura",
    "Coco",
    "Frozen: Una Aventura Congelada",
    "Maléfica",
    "Intensamente",
    "Zootopia",
    "Ratatouille",
    "El Viaje de Chihiro",
    "Akira",
    "La Tumba de las Luciérnagas",
    "Mi Vecino Totoro",
    "Ghost in the Shell",
    "Cómo Entrenar a tu Dragón",
    "Shrek",
    "Kung Fu Panda",
    "Los Increíbles",
    "El Fantasma de la Ópera",
    "El Señor de los Anillos: Las Dos Torres",
    "El Hobbit: Un Viaje Inesperado"
  ];
  