let reportero;
let pokemons = [];
let cartasJugador;
let cartasMaquina;
let tableroMachine;
let tableroPlayer;
let jugadaPlayer;
let jugadaMachine;
let ganador;
let turnoJugador;
let cartasElegidas = [];
let puntosJugador;
let puntosMaquina;
let totalJugador;
let totalPlayer;
window.addEventListener('load', async () => {
  reportero = document.querySelector("#reportero");
  tableroMachine = document.querySelector("#tableroMachine");
  tableroPlayer = document.querySelector("#tableroPlayer");
  jugadaPlayer = document.querySelector("#jugadaPlayer");
  jugadaMachine = document.querySelector("#jugadaMachine");
  totalPlayer = document.querySelector("#totalPlayer");
  totalMachine = document.querySelector("#totalMachine");
  await cargarPokemons();
  empezarPartida();
})
async function cargarPokemons() {
  let pokemonsURL = "https://pokeapi.co/api/v2/pokemon";
  reportero.innerHTML = `Cargando pokemons... <i class="fa-solid fa-spinner"></i>`
  while (pokemonsURL) {
    const res = await fetch(pokemonsURL);
    const dataPokemons = await res.json();
    pokemonsURL = dataPokemons.next;
    dataPokemons.results.map(async ({ url }) => {
      const res = await fetch(url);
      const data = await res.json();
      pokemons.push({ "nombre": data.name, "exp": data.base_experience, "img": data.sprites.front_default })
    })
  }
  reportero.innerHTML = ``
}
async function empezarPartida() {
  cartasJugador = [];
  cartasMaquina = []
  repartirCartas();
  mostrarCartas();
  turnoJugador = Math.random(0, 1) > 0.5;
  puntosJugador = 0;
  puntosMaquina = 0;
  jugar();
}
function jugar() {
  turnoJugador = !turnoJugador;
  if (cartasElegidas.length != 2) {
    if (turnoJugador) {
      reportero.innerText = "¡Tu turno!";
      document.querySelectorAll("#tableroPlayer .carta").forEach(carta => carta.addEventListener("click", handleClick));
    } else {
      reportero.innerText = "Turno de la máquina";
      document.querySelectorAll("#tableroPlayer .carta").forEach(carta => carta.removeEventListener("click", handleClick));
      juegaMaquina();
    }
  } else {
    deliverar();
  }
}
function deliverar() {
  reportero.innerText = "Deliverando...";
  setTimeout(() => {
    if (cartasElegidas[0].exp > cartasElegidas[1].exp) {
      puntosMaquina += cartasElegidas[0].exp + cartasElegidas[1].exp;
      totalMachine.innerText = puntosMaquina;
    } else if (cartasElegidas[1].exp > cartasElegidas[0].exp){
      puntosJugador += cartasElegidas[0].exp + cartasElegidas[1].exp;
      totalPlayer.innerText = puntosJugador;
    }
    jugadaPlayer.innerHTML = ``;
    jugadaMachine.innerHTML = ``;
    cartasElegidas = [];
    jugar();
  }, 2000);
}
function handleClick(){
  const cartaSeleccionada = this.dataset.nombre;
  const index = cartasJugador.findIndex(carta => carta.nombre === cartaSeleccionada);
  cartasElegidas[1] = cartasJugador.splice(index, 1)[0];
  jugadaPlayer.innerHTML = cartaTemplate(cartasElegidas[1].nombre, cartasElegidas[1].exp, cartasElegidas[1].img);
  this.classList.add("invisible");
  jugar();
}
async function juegaMaquina() {
    setTimeout(() => {
      let cartaElegida;
      if (cartasElegidas.length == 0) {
        cartaElegida = cartasMaquina[Math.floor(Math.random() * cartasMaquina.length)];
      } else {
        let cartasQueSuperan = cartasMaquina.filter(cartaMaquina => cartaMaquina.exp > cartasElegidas[1].exp);
        if (cartasQueSuperan.length != 0) {
          let cartasOrdenadas = cartasQueSuperan.sort((a,b) => a.exp - b.exp);
          cartaElegida = cartasOrdenadas[0];
        } else {
          let cartasOrdenadas = cartasMaquina.sort((a,b) => a.exp - b.exp);
          cartaElegida = cartasOrdenadas[0];
        }
      }
      const index = cartasMaquina.findIndex(carta => carta.nombre === cartaElegida.nombre);
      cartasElegidas[0] = cartasMaquina.splice(index, 1)[0];
      jugadaMachine.innerHTML = cartaTemplate(cartasElegidas[0].nombre, cartasElegidas[0].exp, cartasElegidas[0].img);
      tableroMachine.querySelector(`#${cartaElegida.nombre}`).classList.add("invisible");
      jugar();
    }, 2000);
}
function repartirCartas() {
  for (let i = 0; i < 5; i++) {
    let pokemonElegidoJugador;
    do {
      pokemonElegidoJugador = pokemons[Math.floor(Math.random() * pokemons.length)]
    } while (cartasJugador.includes(pokemonElegidoJugador));
    cartasJugador.push(pokemonElegidoJugador);
    let pokemonElegidoMaquina;
    do {
      pokemonElegidoMaquina = pokemons[Math.floor(Math.random() * pokemons.length)]
    } while (cartasMaquina.includes(pokemonElegidoMaquina));
    cartasMaquina.push(pokemonElegidoMaquina);
  }
}
function mostrarCartas() {
  cartasJugador.map(carta => {
    tableroPlayer.innerHTML += cartaTemplate(carta.nombre, carta.exp, carta.img)
  });
  cartasMaquina.forEach((carta) => {
    tableroMachine.innerHTML += `<img id="${carta.nombre}" class="carta"src="dorso.jpg"/>`
  });
}
const cartaTemplate = (nombre, exp, img) => {
  return `
        <div class="carta" data-nombre=${nombre}>
          <div class="exp">${exp}</div>
          <img src="${img}"/>
          <div class="nombre">${nombre}</div>
        </div>
`
}