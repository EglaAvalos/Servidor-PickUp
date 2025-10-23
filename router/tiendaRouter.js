const express = require('express');
const router = express.Router();
const studentController = require('../controllers/tiendaController');


router.get('/tienda', tiendaController.getAllTiendas);
router.get('/usuario/:id', tiendaController.getTiendaById);
router.post('/usuario/', tiendaController.addTienda);
router.put('/usuario/:id',tiendaController .updateTienda);
router.delete('/usuario/:id', tiendaController.deleteTienda);

module.exports = router;