const express = require("express");
const app= express();
const port = 3000;
const rutasProducto = require("./router/productoRouter")

app.use(express.json());

app.use('/api', rutasProducto)


app.listen(port, () => {
  console.log(`Servidor iniciado correctamente desde: http://localhost:${port}`);
});