const express = require("express");
const app = express();
const port = 3000;

// Routers
// const rutasProducto = require("./router/productoRouter"); // (comentado por Dani)
// const rutasUsuario = require("./router/usuariosRouter"); // rutas de Usuario por Icel 
const rutasTienda = require("./router/tiendaRouter"); 

// Middleware para parsear JSON
app.use(express.json());

// Rutas base
// app.use('/api', rutasProducto); // (comentado por Dani)
// app.use('/api', rutasUsuario); // Rutas de Usuario montadas en /api
app.use('/api', rutasTienda); 

// Servidor
app.listen(port, () => {
  console.log(`Servidor iniciado correctamente desde: http://localhost:${port}`);
});