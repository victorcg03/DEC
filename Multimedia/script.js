let videos = ["video1.mp4", "video2.mp4", "video3.webm", "video4.mp4"];
let tiempoPubli;
window.addEventListener('load', () => {
    setInterval(actualizarTiempo, 500);
    iniciarPagina();
    habilitarReproductor();
});
function iniciarPagina() {
    tiempoPubli = 10;
    capaProtectora.style.display = "block";
    publicidad.style.display = "block";
    tiempoRestante.innerText = tiempoPubli;
    let intervalo = setInterval(() => {
        tiempoRestante.innerText = tiempoPubli;
        tiempoPubli--;
        if (tiempoPubli == -1) {
            clearInterval(intervalo);
            let cruz = document.querySelector("#x span");
            cruz.classList.add("clicable");
            cruz.addEventListener('click', quitarPubli);
        }
    }, 1000);

    cargarVideos();
}
function cargarVideos(){
    listaVideos.innerHTML = "";
    let video = document.querySelector(".reproductor video");    
    videos.forEach(url=>{
        if (video.src.split("/").pop() != url){
            listaVideos.innerHTML += `<video src="${url}"></video>`;
        }
    });
    document.querySelectorAll("#listaVideos video").forEach(el => el.addEventListener("click", ()=>{
        document.querySelector(".reproductor video").src = el.src;
        play.classList.add("fa-play");
        play.classList.remove("fa-pause");
        iniciarPagina();
    }));
    document.querySelectorAll("#listaVideos video").forEach(el => el.addEventListener("mouseenter", ()=>{
        el.play();        
        el.muted = true;
    }));
    document.querySelectorAll("#listaVideos video").forEach(el => el.addEventListener("mouseleave", ()=>{
        el.pause();
        el.currentTime = 0;
    }));
}

function quitarPubli(){
    capaProtectora.style.display = "none";
    publicidad.style.display = "none";
    let cruz = document.querySelector("#x span");
    cruz.removeEventListener("click", quitarPubli);
    cruz.classList.remove("clicable");
    tiempoPubli = 10;
}
function moverBarra(e) {
    let barraProgreso = document.querySelector("#menu form");
    let tamanoBarra = barraProgreso.clientWidth;  
    video.currentTime = video.duration * (e.offsetX * 100 / tamanoBarra / 100);
    actualizarTiempo();
    barraProgreso.addEventListener("mousemove", moverBarra);
}

function habilitarReproductor(){    
    contenedor.addEventListener('mouseenter',()=>{       
        menu.classList.add("verMenu");
    });
    contenedorPrincipal.addEventListener('mouseenter', ()=>{
        menu.classList.remove("verMenu");
    });

    let barraProgreso = document.querySelector("#menu form");
    barraProgreso.addEventListener("mousedown", moverBarra);
    barraProgreso.addEventListener("mouseup", ()=>{
        barraProgreso.removeEventListener("mousemove", moverBarra);
    });
    barraProgreso.addEventListener("mouseleave", ()=>{
        barraProgreso.removeEventListener("mousemove", moverBarra);
    });

    document.querySelectorAll(".controlPantalla").forEach(control=>{
        control.addEventListener("dblclick", ()=>{
            if (control.id == "atras") {
                video.currentTime -= 10;
                actualizarTiempo();
            } else if (control.id == "delante") {
                video.currentTime += 10;
                actualizarTiempo();
            }            
        });
        control.addEventListener("click", ()=>{
            if (video.paused) {
                video.play();
                play.classList.remove("fa-play");
                play.classList.add("fa-pause");
            } else {
                video.pause();
                play.classList.add("fa-play");
                play.classList.remove("fa-pause");
            }
        });
    });
    document.querySelectorAll(".controles i").forEach((boton) => {
        boton.addEventListener('mousedown', () => {
            let video = document.querySelector('.reproductor video');
            boton.parentElement.classList.add("pulsado");
            if (boton.id == "play") {    
                if (video.paused) {
                    video.play();
                    boton.classList.remove("fa-play");
                    boton.classList.add("fa-pause");
                } else {
                    video.pause();
                    boton.classList.add("fa-play");
                    boton.classList.remove("fa-pause");
                }
            } else if (boton.id == "silenciar") {
                if (video.muted) {
                    video.muted = false;
                    boton.classList.remove("fa-volume-off");
                    boton.classList.add("fa-volume-xmark");
                } else {
                    video.muted = true;
                    boton.classList.add("fa-volume-off");
                    boton.classList.remove("fa-volume-xmark");
                }
            } else if (boton.id == "retroceder") {
                video.currentTime -= 10;
                actualizarTiempo();
            } else if (boton.id == "avanzar") {
                video.currentTime += 10;
                actualizarTiempo();

            } else if (boton.id == "reiniciar"){
                video.currentTime = 0;
                actualizarTiempo();
                boton.classList.add("animacion");
                setTimeout(() => {
                    boton.classList.remove("animacion");
                }, 1200);
            } else if (boton.id == "bajarVolumen"){
                if (video.volume > 0) {
                    video.volume = Math.round(video.volume * 10) / 10 - 0.1;
                }
            }else if (boton.id == "subirVolumen"){
                if (video.volume < 1) {
                    video.volume = Math.round(video.volume * 10) / 10 + 0.1;
                }
            }
        });
        boton.addEventListener('mouseup', () => {
            boton.parentElement.classList.remove("pulsado");
        });
    });
}
function actualizarTiempo() {
    let video = document.querySelector('video');
    let barraProgreso = document.querySelector('progress');
    barraProgreso.max = video.duration;
    barraProgreso.value = video.currentTime;
    tiempo.innerText = Math.trunc(video.duration / 60).toString().padStart(2, '0') + ":" + Math.trunc(video.duration % 60).toString().padStart(2, '0') + "/" + Math.trunc(video.currentTime / 60).toString().padStart(2, '0') + ":" + Math.trunc(video.currentTime % 60).toString().padStart(2, '0');
    if(video.ended){
        play.classList.add("fa-play");
        play.classList.remove("fa-pause");
    }
}