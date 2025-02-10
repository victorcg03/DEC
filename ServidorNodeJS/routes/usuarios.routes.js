const cors = require("cors");
const bodyParser = require("body-parser");

module.exports = app => {
  app.use(cors());
  app.use(bodyParser.json());

  const usuarios = require("../models/usuarios.model.js");

  /*************************** GET *******************************/
  app.get("/usuarios", usuarios.buscarTodos);
  app.get("/usuarios/:usuarioId", usuarios.buscarPorID);

  /*************************** POST *******************************/
  app.post("/usuarios", usuarios.crear);
  
  /*************************** PUT *******************************/
  app.put("/usuarios", usuarios.actualizar);

  /*************************** DELETE *******************************/
  app.delete("/usuarios", usuarios.borrar);

};