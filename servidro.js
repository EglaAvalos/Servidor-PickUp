const express = require("express");
const app= express();
const port = 3000;

app.use(express.json());

app.get("/saludo", (req, res) =>{
    res.send("hola mundo");
});
app.post('/enviarmensaje', (req, res) => {
  const { texto } = req.body;
  if (!texto) {
    return res.status(400).json({ error: 'Falta el campo texto en el cuerpo de la petición' });
  }
  res.json({ textoRecibido: texto });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Servidor iniciado correctamente desde: http://localhost:${port}`);
});