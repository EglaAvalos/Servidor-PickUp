const express = require("express");
const app= express();
const port = 3000;
//const rutasProducto = require("./router/productoRouter") - Dani
const rutasUsuario = require("./router/usuariosRouter");

app.use(express.json());

//app.use('/api', rutasProducto) - Dani
app.use('/api', rutasUsuario);


app.listen(port, () => {
  console.log(`Servidor iniciado correctamente desde: http://localhost:${port}`);
});