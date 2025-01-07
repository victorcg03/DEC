let pokemons = [];
let cartasJugador;
let cartasMaquina;
let turnoJugador;
let cartasElegidas = [null, null];
let puntosJugador;
let puntosMaquina;
window.addEventListener('load', async () => {
  await cargarPokemons();
  empezarPartida();
})
async function cargarPokemons() {
  let pokemonsURL = "https://pokeapi.co/api/v2/pokemon";
  document.getElementById("reportero").innerHTML = `Cargando pokemons... <i class="fa-solid fa-spinner"></i>`
  while (pokemonsURL) {
    const res = await fetch(pokemonsURL);
    const dataPokemons = await res.json();
    pokemonsURL = dataPokemons.next;
    dataPokemons.results.map(async ({ url }) => {
      const res = await fetch(url);
      const data = await res.json();
      const pokemon = { "nombre": data.name, "exp": data.base_experience, "img": data.sprites.front_default };
      if (pokemon.nombre && pokemon.exp && pokemon.img) {
        pokemons.push(pokemon)
      }
    })
  }
  document.getElementById("reportero").innerHTML = ``
}
async function empezarPartida() {
  document.getElementById("ganador").classList.add("display-none");
  document.getElementById("tableroPlayer").innerHTML = "";
  document.getElementById("tableroMachine").innerHTML = "";
  document.getElementById("totalMachine").innerText = 0;
  document.getElementById("totalPlayer").innerText = 0;
  document.getElementById("jugadaPlayer").innerHTML = ``;
  document.getElementById("jugadaMachine").innerHTML = ``;
  document.querySelectorAll("#cartasPlayer .carta").forEach(carta => carta.remove());
  document.querySelectorAll("#cartasMachine .carta").forEach(carta => carta.remove());
  cartasJugador = [];
  cartasMaquina = []
  repartirCartas();
  mostrarCartas();
  turnoJugador = Math.random() < 0.5;
  puntosJugador = 0;
  puntosMaquina = 0;
  jugar();
}
function jugar() {
  document.querySelectorAll("#tableroPlayer .carta").forEach(carta => carta.removeEventListener("click", handleClick));
  if (cartasElegidas[0] == null || cartasElegidas[1] == null) {
    if (turnoJugador) {
      document.getElementById("reportero").innerText = "¡Tu turno!";
      document.querySelectorAll("#tableroPlayer .carta").forEach(carta => carta.addEventListener("click", handleClick));
    } else {
      document.getElementById("reportero").innerText = "Turno de la máquina";
      juegaMaquina();
    }
    turnoJugador = !turnoJugador;
  } else {
    document.getElementById("reportero").innerText = "Deliverando...";
    deliverar();
  }
}
function verGanador() {
  let ganadorDiv = document.getElementById("ganador");
  if (puntosJugador > puntosMaquina) {
    ganadorDiv.querySelector("span").innerText = "Tu ganas";
  } else if (puntosMaquina > puntosJugador){
    ganadorDiv.querySelector("span").innerText = "Gana la máquina";
  } else {
    ganadorDiv.querySelector("span").innerText = "Empate";
  }
  ganadorDiv.classList.remove("display-none");
}
function deliverar() {
  setTimeout(() => {
    if (cartasElegidas[0].exp > cartasElegidas[1].exp) {
      puntosMaquina += cartasElegidas[0].exp + cartasElegidas[1].exp;
      cartasElegidas.map(carta => {
        document.getElementById("cartasMachine").innerHTML += cartaTemplate(carta.nombre, carta.exp, carta.img);
      })
    } else if (cartasElegidas[1].exp > cartasElegidas[0].exp) {
      puntosJugador += cartasElegidas[0].exp + cartasElegidas[1].exp;
      cartasElegidas.map(carta => {
        document.getElementById("cartasPlayer").innerHTML += cartaTemplate(carta.nombre, carta.exp, carta.img);
      })
    } else {
      puntosJugador += cartasElegidas[1].exp;
      puntosMaquina += cartasElegidas[0].exp;
      document.getElementById("cartasPlayer").innerHTML += cartaTemplate(cartasElegidas[1].nombre, cartasElegidas[1].exp, cartasElegidas[1].img);
      document.getElementById("cartasMachine").innerHTML += cartaTemplate(cartasElegidas[0].nombre, cartasElegidas[0].exp, cartasElegidas[0].img);
    }
    document.getElementById("totalMachine").innerText = puntosMaquina;
    document.getElementById("totalPlayer").innerText = puntosJugador;
    document.getElementById("jugadaPlayer").innerHTML = ``;
    document.getElementById("jugadaMachine").innerHTML = ``;
    cartasElegidas = [null, null];
    if (puntosJugador >= 1000 || puntosMaquina >= 1000 || (cartasJugador.length == 0 && cartasMaquina.length == 0)) {
      verGanador();
    } else {
      jugar();
    }
  }, 2000);
}
function handleClick() {
  const cartaSeleccionada = this.dataset.nombre;
  const index = cartasJugador.findIndex(carta => carta.nombre === cartaSeleccionada);
  cartasElegidas[1] = cartasJugador.splice(index, 1)[0];
  document.getElementById("jugadaPlayer").innerHTML = cartaTemplate(cartasElegidas[1].nombre, cartasElegidas[1].exp, cartasElegidas[1].img);
  this.classList.add("invisible");
  jugar();
}
function juegaMaquina() {
  setTimeout(() => {
    let cartaElegida;
    if (cartasElegidas[1] == null) {
      cartaElegida = cartasMaquina[Math.floor(Math.random() * cartasMaquina.length)];
    } else {
      let cartasQueSuperan = cartasMaquina.filter(cartaMaquina => cartaMaquina.exp > cartasElegidas[1].exp);
      if (cartasQueSuperan.length != 0) {
        let cartasOrdenadas = cartasQueSuperan.sort((a, b) => a.exp - b.exp);
        cartaElegida = cartasOrdenadas[0];
      } else {
        let cartasOrdenadas = cartasMaquina.sort((a, b) => a.exp - b.exp);
        cartaElegida = cartasOrdenadas[0];
      }
    }
    const index = cartasMaquina.findIndex(carta => carta.nombre === cartaElegida.nombre);
    cartasElegidas[0] = cartasMaquina.splice(index, 1)[0];
    document.getElementById("jugadaMachine").innerHTML = cartaTemplate(cartasElegidas[0].nombre, cartasElegidas[0].exp, cartasElegidas[0].img);
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
    document.getElementById("tableroPlayer").innerHTML += cartaTemplate(carta.nombre, carta.exp, carta.img)
  });
  cartasMaquina.forEach((carta) => {
    document.getElementById("tableroMachine").innerHTML += `<img id="${carta.nombre}" class="carta"src="dorso.jpg"/>`
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