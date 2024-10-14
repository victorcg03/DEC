const linea =
`<div class="linea">
        <div class="columna">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" disabled>
        </div>
        <div class="columna">
            <label for="apellidos">Apellidos</label>
            <input type="text" id="apellidos" disabled>
        </div>
        <div class="columna">
            <label for="dni">DNI</label>
            <input type="text" id="dni" disabled>
        </div>
        <div class="botones">
            <button id="editar" class="editar editarHabilitado">Editar</button>
            <button id="eliminar" class="eliminar">X</button>
        </div>
    </div>`;

window.addEventListener('load', function () {
    eventoEditar();
    botonAdd.addEventListener('click', function () {
        contenedor_principal.innerHTML += linea;
        eventoEditar();
    });
});

function funcionEditar(boton){
    boton.classList.remove("editarHabilitado");
    console.log("hola");
    eventoEditar();
}
function eventoEditar(){
    let botonesEditar = document.querySelectorAll('.editarHabilitado');
    botonesEditar.forEach(boton =>{
        boton.addEventListener('click', function() {
            funcionEditar(this);
        })
    });
}