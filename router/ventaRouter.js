const express = require('express');
const router = express.Router();
const studentController = require('../controllers/ventaController');


router.get('/venta ', ventaController.getAllVentas);
router.get('/venta/:id', ventaController.getVentaById);
router.post('/venta/', ventaController.addVenta);
router.put('/venta/:id',ventaController.updateVenta);
router.delete('/venta/:id', ventaController.deleteVenta);

module.exports = router;