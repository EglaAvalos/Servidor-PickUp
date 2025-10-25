// controller/tiendaController.js
const fs = require('fs');
const path = require('path');
const Tienda = require('../module/Tienda');

// Usamos path.join para apuntar correctamente al archivo data/tiendaData.json
const dataPath = path.join(__dirname, '..', 'data', 'tiendaData.json');

// Helper: lee el JSON (devuelve array)
function readData() {
  try {
    if (!fs.existsSync(dataPath)) return [];
    const raw = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error leyendo tiendaData:', err);
    throw err;
  }
}

// Helper: escribe el JSON
function writeData(arr) {
  fs.writeFileSync(dataPath, JSON.stringify(arr, null, 2), 'utf8');
}

// Obtener todas las tiendas (GET /api/tienda)
exports.getAllTiendas = (req, res) => {
  try {
    const tiendas = readData();
    return res.status(200).json(tiendas);
  } catch (err) {
    return res.status(500).json({ error: 'Error al leer tiendas.' });
  }
};

// Obtener tienda por id (GET /api/tienda/:id)
exports.getTiendaById = (req, res) => {
  try {
    const id = req.params.id;
    const tiendas = readData();
    const tienda = tiendas.find(t => String(t.id) === String(id));
    if (!tienda) return res.status(404).json({ error: 'Tienda no encontrada.' });
    return res.status(200).json(tienda);
  } catch (err) {
    return res.status(500).json({ error: 'Error al buscar la tienda.' });
  }
};

// Crear tienda (POST /api/tienda)
exports.addTienda = (req, res) => {
  try {
    const { nombre, direccion, telefono, horario, propietario } = req.body;
    const tiendas = readData();

    // Generar id simple (max existing id + 1) — adaptación simple para datos dummy
    const maxId = tiendas.reduce((m, t) => {
      const n = Number(t.id);
      return isNaN(n) ? m : Math.max(m, n);
    }, 0);
    const newId = maxId + 1;

    const nuevaTienda = new Tienda(newId, nombre, direccion, telefono, horario, propietario);
    tiendas.push(nuevaTienda);
    writeData(tiendas);

    return res.status(201).json(nuevaTienda);
  } catch (err) {
    return res.status(500).json({ error: 'Error al crear la tienda.' });
  }
};

// Actualizar tienda (PUT /api/tienda/:id)
exports.updateTienda = (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, direccion, telefono, horario, propietario } = req.body;
    const tiendas = readData();
    const index = tiendas.findIndex(t => String(t.id) === String(id));
    if (index === -1) return res.status(404).json({ error: 'Tienda no encontrada.' });

    // actualizar campos (si vienen)
    const t = tiendas[index];
    tiendas[index] = {
      ...t,
      nombre: nombre !== undefined ? nombre : t.nombre,
      direccion: direccion !== undefined ? direccion : t.direccion,
      telefono: telefono !== undefined ? telefono : t.telefono,
      horario: horario !== undefined ? horario : t.horario,
      propietario: propietario !== undefined ? propietario : t.propietario
    };

    writeData(tiendas);
    return res.status(200).json(tiendas[index]);
  } catch (err) {
    return res.status(500).json({ error: 'Error al actualizar la tienda.' });
  }
};

// Eliminar tienda (DELETE /api/tienda/:id)
exports.deleteTienda = (req, res) => {
  try {
    const id = req.params.id;
    const tiendas = readData();
    const index = tiendas.findIndex(t => String(t.id) === String(id));
    if (index === -1) return res.status(404).json({ error: 'Tienda no encontrada.' });

    tiendas.splice(index, 1);
    writeData(tiendas);

    // Respuesta simulada de éxito: 204 No Content (sin cuerpo)
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: 'Error al eliminar la tienda.' });
  }
};
