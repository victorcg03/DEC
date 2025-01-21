const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));
const usuarios = [];
// Configurar el evento de conexión de Socket.io
io.on('connection', (socket) => {
  socket.on('nuevoUsuario', (nombre) => {
    socket.broadcast.emit('mostrarNuevoUsuario',{"nombre": nombre, "id": socket.id});
    socket.emit('mostrarUsuarios', usuarios);
    usuarios.push({"nombre": nombre, "id": socket.id});
  });
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
    const index = usuarios.findIndex(usuario => usuario.id === socket.id);
    if (index !== -1) {
      const usuarioEliminado = usuarios.splice(index, 1)[0]; // Elimina el usuario del array
      console.log(`Usuario desconectado: ${usuarioEliminado.nombre}`);
      socket.broadcast.emit('usuarioDesconectado', { "nombre": usuarioEliminado.nombre, "id": usuarioEliminado.id });
    }
  });
  socket.on('mensaje', (data) => {
    socket.to(data.id).emit('mensaje',  {mensaje: data.mensaje, id: socket.id});
  });
});

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});