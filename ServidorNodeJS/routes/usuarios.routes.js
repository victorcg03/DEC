module.exports = app => {

  // Importamos el módulo donde se encuentran las Queries que nos devolverán los datos de la BBDD
  const usuarios = require("../models/usuarios.model.js");

  // Creamos las diferentes rutas y métodos para poder realizar las diferentes acciones.
  /*************************** GET *******************************/

  //Devuelve todos los usuarios
  app.get("/usuarios", usuarios.buscarTodos);
  
  //Devuelve un usuario por ID
  app.get("/usuarios/:usuarioId", usuarios.buscarPorID);
  
  /*************************** POST *******************************/

  app.get("/crearUsuario", usuarios.crear);
  
  /*************************** PUT *******************************/
  
  /*************************** DELETE *******************************/
};