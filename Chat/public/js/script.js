let socket;
window.addEventListener('load', ()=>{
  const form = document.querySelector('#registro');
  const usuarios = document.getElementById('usuarios');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (!form.nombre.value.length > 0) {
      error.style.display = "block";    
      return;
    }
    form.remove();
    
    socket = io();
    socket.emit('nuevoUsuario', form.nombre.value);
    document.getElementById("usuarioActual").innerText = `Usuario: ${form.nombre.value}`;
    document.getElementById("usuarioActual").style.display = "block";
    document.getElementById("chats").style.display = "block";    
    socket.on("mostrarUsuarios", (usuariosActuales)=>{
      usuariosActuales.forEach(data => {
        usuarios.innerHTML += usuario(data);
      });
    });
    socket.on('mostrarNuevoUsuario', (data)=>{
      usuarios.innerHTML += usuario(data);
    });
    socket.on('usuarioDesconectado', (data)=>{
      document.getElementById(data.id).remove();
    });
    socket.on('mensaje', (data)=>{
      document.getElementById(data.id).innerHTML += `<p class="mensaje otro">${data.mensaje}</p>`;  
    });
  });
});

const usuario = (data)=>{
  return `
        <details>
        <summary>${data.nombre}</summary>
        <div id="${data.id}" class="mensajes">
        </div>
        <form onsubmit="handleSubmit(event)">
          <div>
            <input type="text" name="mensaje" placeholder="Escribe un mensaje">
            <button>Enviar</button>
            <input type="hidden" name="id" value="${data.id}">
          </div>
        </form>
      </details> 
      `
}
function handleSubmit(e){
  e.preventDefault();
  const mensaje = e.target.mensaje.value;
  const id = e.target.id.value;
  socket.emit('mensaje', {mensaje, id});
  e.target.mensaje.value = "";
  document.getElementById(id).innerHTML += `<p class="mensaje usuario">${mensaje}</p>`;
}
{/* <details id="${data.id}">
        <summary>Victor</summary>
        <div id="mensajes">
          <p class="mensaje otro">
            hola
          </p>
          <p class="mensaje usuario">
            hola
          </p>
        </div>
        <form>
          <div>
            <input type="text" name="mensaje" placeholder="Escribe un mensaje">
            <button>Enviar</button>
            <input type="hidden" name="id" value="${data.id}">
          </div>
        </form>
      </details> */}