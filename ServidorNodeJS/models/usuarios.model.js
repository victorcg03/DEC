const sql = require("./db.js");

// Construimos una función llamada Usuario (a modo de objeto)
function Usuario(usuario) {
  this.email = usuario.email;
  this.name = usuario.name;
  this.password = usuario.password;
};

// Definimios las funciones que forman parte de Usuario, a las que accederemos desde la ruta correspondiente en función de la acción que queramos realizar: INSERT, SELECT, UPDATE o DELETE.
/*************************** GET *******************************/
Usuario.buscarTodos = (request, result) => {
  sql.query("SELECT * FROM usuarios", (err, res) => {
    console.log("Usuarios: ", res); // Información que mostramos en la consola donde estamos ejecutando NodeJS (Servidor)
    result.json(res); // Información que enviamos al cliente.
  });
};

// Donde en la función anterior teníamos una petición (request) sin datos de entrada, ahora tenemos un usuarioID definido en la ruta.
Usuario.buscarPorID = (request, result) => {
  sql.query(`SELECT * FROM usuarios WHERE ID = ${request.params.usuarioId}`, (err, res) => {
    // Si la respuesta de la query devuelve una longitud de 1 o más valores, mostramos el usuario encontrado.
    console.log(res);
    if (res.length) {
      console.log("Usuario encontrado: ", res[0]); // Información que mostramos en la consola donde estamos ejecutando NodeJS (Servidor)
      result.json(res[0]); // Información que enviamos al cliente.
    } else result.json({ message: "Usuario no encontrado" }); // No existe un usuario con ese ID
  });
};

/*************************** POST *******************************/
Usuario.crear = (req, res) => {
  console.log("SOLICITUD POST RECIBIDA");
  console.log("Intento de insertar usuario con datos:", req.body);

  const query = "INSERT INTO usuarios (EMAIL, NAME, PASSWORD) VALUES (?, ?, ?)";
  const values = [req.body.email, req.body.name, req.body.password];

  sql.query(query, values, (err, result) => {
    if (err) {
      console.error("Error al insertar usuario:", err);
      res.status(500).json({ msg: "Error al insertar usuario" });
      return;
    }
    if (result.affectedRows === 0) {
      res.json({ msg: "No se ha insertado ningún usuario" });
      console.log("No se ha insertado ningún usuario");
    } else {
      res.json({ msg: `Usuario insertado correctamente con los siguientes datos: ${values.join(",")}` });
      console.log("Usuario insertado con éxito");
    }
  });
};

/*************************** PUT *******************************/
Usuario.actualizar = (req, res) => {
  console.log("SOLICITUD PUT RECIBIDA");
  console.log("Intento de actualizar usuario con datos:", req.body);

  const query = "UPDATE usuarios SET EMAIL = ?, NAME = ?, PASSWORD = ? WHERE ID = ?";
  const values = [req.body.email, req.body.name, req.body.password, req.body.id];
  sql.query(query, values, (err, result) => {
    if (err) {
      console.error("Error al actualizar usuario:", err);
      res.status(500).json({ msg: "Error al actualizar usuario" });
      return;
    }
    if (result.affectedRows === 0) {
      res.json({ msg: "Usuario no encontrado" });
      console.log("Usuario no encontrado");
    } else {
      res.json({ msg: `Usuario actualizado correctamente con los siguientes datos: ${values.join(",")}` });
      console.log("Usuario actualizado con éxito");
    }
  });
}

/*************************** DELETE *******************************/
Usuario.borrar = (req, res) => {
  console.log("SOLICITUD DELETE RECIBIDA");
  console.log("Intento de borrar usuario con id:", req.body.id);

  const query = "DELETE FROM usuarios WHERE ID = ?";
  sql.query(query, req.body.id, (err, result) => {
    if (err) {
      console.error("Error al borrar el usuario:", err);
      res.status(500).json({ msg: "Error al borrar el usuario" });
      return;
    }
    if (result.affectedRows === 0) {
      res.json({ msg: "Usuario no encontrado" });
      console.log("Usuario no encontrado");
    } else {
      res.json({ msg: `Usuario con id ${req.body.id} borrado correctamente` });
      console.log(`Usuario con id ${req.body.id} borrado con éxito`);
    }
  });
}

module.exports = Usuario;