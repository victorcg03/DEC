window,addEventListener('load', ()=>{
    let cartas = [
        [0, 0], [-147.7, 0], [-295.4, 0], [-443.1, 0], [-590.8, 0], [-738.5, 0], [-886.2, 0], [-1033.8, 0], [-1181.5, 0], [-1329.2, 0], [-1476.9, 0], [-1624.6, 0], [-1772.3, 0],
        [0, 230], [-147.7, 230], [-295.4, 230], [-443.1, 230], [-590.8, 230], [-738.5, 230], [-886.2, 230], [-1033.8, 230], [-1181.5, 230], [-1329.2, 230], [-1476.9, 230], [-1624.6, 230], [-1772.3, 230],
        [0, 460], [-147.7, 460], [-295.4, 460], [-443.1, 460], [-590.8, 460], [-738.5, 460], [-886.2, 460], [-1033.8, 460], [-1181.5, 460], [-1329.2, 460], [-1476.9, 460], [-1624.6, 460], [-1772.3, 460],
        [0, 690], [-147.7, 690], [-295.4, 690], [-443.1, 690], [-590.8, 690], [-738.5, 690], [-886.2, 690], [-1033.8, 690], [-1181.5, 690], [-1329.2, 690], [-1476.9, 690], [-1624.6, 690], [-1772.3, 690]
      ];
    let numCartas = 20;      
    let body = document.querySelector('body');
    let cartasElegidas = [];
    let cartasMostrar = new Array(numCartas*2);
    while (cartasElegidas.length < numCartas) {
        let numRandom = getRandomIntInclusive(0, cartas.length-1);
        if(!cartasElegidas.includes(numRandom)){
            cartasElegidas.push(numRandom);
            let carta1 = getRandomIntInclusive(0, cartasMostrar.length);
            while(cartasMostrar[carta1] != null) {
                carta1 = getRandomIntInclusive(0, cartasMostrar.length);
            }
            cartasMostrar[carta1] = cartas[numRandom];
            let carta2 = getRandomIntInclusive(0, cartasMostrar.length);
            while(cartasMostrar[carta2] != null) {
                carta2 = getRandomIntInclusive(0, cartasMostrar.length);
            }
            cartasMostrar[carta2] = cartas[numRandom];
        }
    }
    cartasMostrar.forEach(carta => {
        body.innerHTML += `<div class="carta" style="background-position: ${carta[0]}px -${carta[1]}px ;"></div>`;
    });
});


function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}