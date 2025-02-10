const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const port = 3000;

const app = express();
require("./routes/usuarios.routes.js")(app);

app.use(bodyParser.json());

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})